# Solr Cloud Join

## Background 

I have been working with [Solr](http://lucene.apache.org/solr/) to integrate it with a Content Management System.

In a CMS, there is usually a meta-data layer that describes all documents in the system.  Furthermore this meta-data layer is dynamic and subject to changes.  The directory structure of a file system is a perfect example of this sort of meta-data:  every file is placed under a directory, and the directories could be moved/deleted/created at any time.  Other examples of such meta-data include a object type hierarchy, or document security information etc.

The full text search requirement usually includes some meta-data constraints along with the full text constraints on the document itself.  For example, find all files containing text "XYZ" under directory "/a/b/c", or find all objects containing text 'XYZ' of type derived from 'mammal', or find all documents containing text 'XYZ' and is searchable by user 'joe'.

The straight-forward way to satisfy the search requirement is to embed all relevant information in the document during indexing.  For directories, it means simply indexing the entire directory path '/a/b/c' in the document itself.   This strategy however is not scalable for a dynamic directory structure in a large scale system.  If a directory containing a lot of descendant files is moved, then every single file under it needs to be updated.  For Lucene index, an update is essentially delete+add the entire document, meaning it's going to be very __expensive!__


## Problem

The problem can then be defined as such:  in a scalable Solr Cloud deployment, where all documents share some common dynamic meta-data that describes these documents, we want to support updating the meta-data without updating the documents, while still allowing fast searches that can combine the meta-data constraints with the full text search constraints on the documents, .

## Solution

To segregate the update of meta-data and documents, the meta-data must then be stored separately from the documents at indexing time.  At search time, Solr's join query](https://wiki.apache.org/solr/Join) is used to join the meta-data constraints with the document full-text constraints.  

Let us talk about the solution in more details below.

### Meta-data collection

The meta-data collection is always one shard with N replicas, where N is the number of Solr nodes that host the document collection.  The idea is to have a complete replica of meta-data index in each of the Solr node that hosts the document collection.  Solr's "join" query also requires that the join-from-index exists locally in the same Solr node that hosts the join-to-index.  This approach is also scalable: as a collection is scaled to more Solr nodes in the future, just add more meta-data replicas to the new nodes.  

Note this approach does impose a document size limit of 2 billion on the meta-data collection since there is only one shard.  In most of cases this should not be a problem since meta-data is by definition shared by all documents, and thus limited in size.

### Solr join query

Solr's [join query](https://wiki.apache.org/solr/Join) is equivalent to SQL's inner-join on a single field.  The [join query](https://wiki.apache.org/solr/Join) should always be supplied as a filter query along side the main search query on the documents.  This is because it's highly cachable by definition (meta-data is shared by documents), and multiple join queries can be combined together with ease via filter queries.

It's worth noting the caching mechanism of the join+filter queries:  the cached results is the matching document id set in the document index, not the results returned by from-index (or meta-data index).  This cache is invalidated when either the document index changes or the from index (the metadata index) changes.  For system with multiple meta-data types, it may be desirable to store different types in different collections, so that change in one meta-data type will not invalidate the cache of other meta-data type. 

## Example

An [example](https://github.com/mhzed/join-filter-demo) is constructed to demonstrate the solution outlined in this document.   

"DescendantJoinTest.java" contains an example for directory structure filtering.

For creating the collection storing directory structure, for Solr >=7.5, the interface is [this](https://lucene.apache.org/solr/guide/7_6/colocating-collections.html).  Pre Solr 7.5, the equivalent java code is:

```java
public static CollectionAdminRequest.Create shadowCreate(
    CloudSolrClient client, String originalCollection,
    String shadowCollection, String config) throws IOException {
  Collection<String> nodeset = client.getClusterStateProvider()
    .getCollection(originalCollection).getSlices()
    .stream().flatMap((slice)-> slice.getReplicas().stream()).map((replica)->
      replica.getNodeName()).distinct().collect(Collectors.toList()); 						
  CollectionAdminRequest.Create req = CollectionAdminRequest.createCollection(
          shadowCollection, config, 1, nodeset.size());
  req.setCreateNodeSet(nodeset.stream().collect(Collectors.joining(",")));
  return req;
}	
```

Above code first collection a set of Solr nodes that host 'originalCollection', then constructs a CollectionAdminRequest.Create request for the 'shadowCollection' on the same set of Solr nodes.  The code however only deals with collection creation.  If the document collection scales to more nodes down the line, then remember to also do so for the "shadow" collection.

For search, two approaches are shown.  The first example uses graph query:  if the folder objects are linked together as an acyclic graph via a 'parent' field, then a graph query can be used to collect all descendants of a folder.

```java
SolrQuery graphJoinQuery(String mainQuery, String folderId) {
  return new SolrQuery(mainQuery).addFilterQuery(String.format(
    "{!join fromIndex=%s from=%s to=%s}{!graph from=%s to=%s}%s:%s", 
    FolderCollection, IdField, "folder_id_s",
    ParentField, IdField, IdField, 
    ClientUtils.escapeQueryChars(folderId))).setRows(10000);
}
```

The second example uses the "PathHierarchyTokenizerFactory": the directory path is directly stored and analyzed via PathHierarchyTokenizerFactory.

```java
SolrQuery pathJoinQuery(String mainQuery, String path) {
  return new SolrQuery(mainQuery).addFilterQuery(String.format(
    "{!join fromIndex=%s from=%s to=%s}%s:%s", 
    FolderCollection, IdField, "folder_id_s",
    PathField, ClientUtils.escapeQueryChars(path))).setRows(10000);
}
```

The benefit of using 'parent' field and graph query is that a directory move/rename is very cheap and easy to implement: simply update the 'parent' field of the moved directory object.  Whereas the "PathHierarchyTokenizerFactory" approach requires all descendant directory objects to be updated.  The drawback of graph query is that it's slower than a simple field match query, but filter-query-cache should minimize this slowness.  Either approach should work well in production environment.

## Disjunction join

Multiple join queries can be combined together with each as a filter query.  Result set is the conjunction of each member query due to the definition of filter query in Solr.  Though not as common, sometimes a disjunction of the result sets are required.  For this, please see my other project [solr-disjoin](https://github.com/mhzed/solr-disjoin).
