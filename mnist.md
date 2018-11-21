# MNIST recognition in typescript

MNIST digit recognition is the 'hello-world' of deep learning.  I implemented a feed forward neural network to train on MNIST dataset in TypeScript to get my feet wet in deep learning.  The project is hosted in [github](https://github.com/mhzed/dlt).

Implementing a project like this forces one to deal with the low level details of back-propagation: seeing the mathematics working its magic in a front row seat, so to speak.  It was tremendously educational and fun.

Though the project was in TypeScript/JavaScript, the performance is close to native C level, as the matrix operations utilizes Intel CPU's support of [BLAS](https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms) via the excellent [Vectorious](https://github.com/mateogianolio/vectorious) library.  A full epoch on 50k samples with mini-batch size of 20 takes only 2+ seconds on a 2013 MacBook Pro with Intel Core I5.

I was in the midst of adding support for a convolutional layer in the neural network before I was interrupted by regular life and work.  

Hat tip to the free online [book](http://neuralnetworksanddeeplearning.com/) that guided me through this project.