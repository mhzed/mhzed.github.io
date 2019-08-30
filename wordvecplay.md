# Word2Vec play ground

A playground for [word vectors](https://en.wikipedia.org/wiki/Word2vec).

The dataset used for the playground is trained by [glove](https://github.com/stanfordnlp/GloVe) and can be downloaded [here](http://nlp.stanford.edu/data/wordvecs/glove.6B.zip). The vectors are trained on the Wikipedia 2014 + Gigaword 5 (6B tokens, 400K vocab, uncased, 300d vectors).

The supported operators are **"+ - \* /"**.  
**+ -** takes vectors (words) as both operands and are applied element wise.  
**-** can also be used as negate operator.
**\* /** takes a vector (word) and a number as operands.

The results are the words whose vectors are the closest (cosine distance wise) to the resulting vector.

Try out these expressions:

    tokyo-japan+france

[](//mhzed.com/wordvecplay/ ':include :type=iframe width=700px height=800px')
