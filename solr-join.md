# Solr Cloud Join

## Background 

I have been working with [Solr](http://lucene.apache.org/solr/) to integrate it with a Content Management System.

In a CMS, there is usualy a meta-data layer that describes all documents in the system.  Furthermore this meta-data layer is dynamic and subject to changes in the future.  The directory structure of a file system is a perfect example of this sort of meta-data:  every file is placed under a directory, and the direcories could be moved/deleted/created at any time.  Other examples of such meta-data include a object type hierarchy, or document security information etc.

The full text search requirement usually includes some meta-data contraints along with the full text contraints on the document itself.  For example, find all files containing text "xyz" under directory "/a/b/c", or find all objects containing text 'xyz' of type derived from 'mammal', or find all documents containing text 'xyz' and is searchable by user 'joe'.

The straight-forward way to statisfy the search requirement is to embed all relevant information in the document during indexing.  For directories, it means simply indexing the entire directory path '/a/b/c' in the document itself.   This strategy however is not scalable for a dynamic directory structure in a cloud envrionment.  If a directory containing a lot of descendant files is moved, then every single file under it needs to be updated.  For lucene index, an update is essentially delete/add the entire document, meaning it's very 
__expensive!__


## Problem

The problem can then be defined as such:  in a scalable Solr Cloud deployment, where all documents share common dynamic meta-data layer(s) that describes these documents, we want to support dynamic update of the meta-data layer(s) without updating the documents, while still allowing fast searches that combine the meta-data constraints with full text search on the documents, .

## Solution

The solution proposed here consists of these steps:

1.  Store the meta-data information in a separate Solr Collection.
2.  At search time, using Solr "join" query to join the meta-data constaints with the document full-text constraints.

Storing meta-data information in a different collection solves the 'update' problem:  updates in meta-data is segragated from document collection.  Solr's built-in 'join' query, when combined with filter query cache, result in very fast search performance.

We will talk about the steps in more details below.

### Meta-data collection

The meta-data collection is always one shard with N replicas, where N is the number of Solr nodes that host the document collection.  Solr's "join" query requires that the join-from-index exists locally in the Solr node.  This requirement does impose a document size limit of 2 billion on the meta-data collection, which should not be a problem for vast majority of cases since meta-data is shared by definition.

### Solr join query

The [join query](https://wiki.apache.org/solr/Join) should always be supplied as a filter query along side the main search query on the documents.  This is because it's highly cachable by definition (meta-data is shared by documents), and multiple join queries can be combined together with ease via filter queies.

It's worth noting the caching mechanism of the join+filter queries:  the cached results is the matching document id set in the document index, not the results returned by from-index (or meta-data index).  The cache is invalidated when either the document index changes or the from index (the metadata index) changes.  For system with multiple meta-data types, it may be desirbale to store different types in different collections, so that change in one meta-data type will not invalidate the cache of other meta-data type.

## Example

An [example](https://github.com/mhzed/join-filter-demo) is constructed to demonstrate the solution outlined in this document.   

"DescendantJoinTest.java" contains an example for directory structure filtering.

For creating the collection storing directory structure, the java code is:

```java
	public static CollectionAdminRequest.Create shadowCreate(
					CloudSolrClient client, String originalCollection,
					String shadowCollection, String config) throws IOException {
		Collection<String> nodeset = client.getClusterStateProvider().getCollection(originalCollection).getSlices()
						.stream().flatMap((slice)-> slice.getReplicas().stream()).map((replica)->
						replica.getNodeName()).distinct().collect(Collectors.toList()); 						
		CollectionAdminRequest.Create req = CollectionAdminRequest.createCollection(
						shadowCollection, config, 1, nodeset.size());
		req.setCreateNodeSet(nodeset.stream().collect(Collectors.joining(",")));
		return req;
	}	

```

For search, two approaches are shown.  The first example uses graph query:  if the folder objects are linked together as an acyclic graph via a 'parent' field, then a graph query can be used to collect all descendants of a folder.

```java
	SolrQuery graphJoinQuery(String mainQuery, String folderId) {
		return new SolrQuery(mainQuery).addFilterQuery(String.format(
						"{!join fromIndex=%s from=%s to=%s}{!graph from=%s to=%s}%s:%s", 
						FolderCollection, IdField, "folder_id_s",
						ParentField, IdField, IdField, ClientUtils.escapeQueryChars(folderId))).setRows(1000000);
	}
```

The second example uses the "PathHierarchyTokenizerFactory": the directory path is directly stored and analyzed via PathHierarchyTokenizerFactory.

```java
	SolrQuery pathJoinQuery(String mainQuery, String path) {
		return new SolrQuery(mainQuery).addFilterQuery(String.format(
						"{!join fromIndex=%s from=%s to=%s}%s:%s", 
						FolderCollection, IdField, "folder_id_s",
						PathField, ClientUtils.escapeQueryChars(path))).setRows(1000000);
	}
```



