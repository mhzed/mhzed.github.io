# Wordvec

A playground for [word vectors](https://en.wikipedia.org/wiki/Word2vec).

The dataset used for playground can be downloaded [here](http://nlp.stanford.edu/data/wordvecs/glove.6B.zip).  It's trained on the Wikipedia 2014 + Gigaword 5 (6B tokens, 400K vocab, uncased, 300d vectors).

The supported operators are __"+ - \* /"__.  
__+ -__ takes vectors as both operands and are applied element wise.  
__\* /__ takes a vector and a number as operands.

Try out these expressions:

    tokyo-japan+france
    (chocolate+cream+cake)/3


[gimmick: iframe (width:1000, height:1000)](/wordvecplay/)

