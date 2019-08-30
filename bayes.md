
# Bayes and puzzles

There are a few famous probability puzzles that are notoriously counter intuitive.  
With persistence and patience, one can usually overcome the cognitive resistance and 
reason his/her way into the correct solution, as I did.  After I encountered the Baye's theorem during my self
tutoring in machine learning, I realized that these problems can actually be solved easily 
using Baye's theorem.  You can find a detailed explanation of Baye's theorem [here](https://en.wikipedia.org/wiki/Bayes%27_theorem).
In this article, we will apply Baye's theorem to two famous puzzles: [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem), 
[Boy or Girl paradox](https://en.wikipedia.org/wiki/Boy_or_Girl_paradox).  This article journals my 
thought process of applying Baye's theorem to these puzzles.

Before proceeding, recall that the formula for [Baye's theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem) is:

$P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)} $

## Monty Hall problem

A brief description first.  There are 3 closed doors, 1 with prize behind it.  Contestant randomly selects 1 door.  The host, knowing what's
behind the doors, pick one of the remaining two doors that is empty and reveal it to the contestant.  Host then ask the contestant
if he/she wants to switch.  Should the contestant switch?

Now there is a second form of Monty Hall question that is less asked but is just as mind twisting.  Suppose 
the host's toddler son wondered in and happened to knock open an empty door randomly, should the contestant switch then?

The answer to the original Month Hall problem is "yes, switch".  The answer to the second question is "Doesn't matter".
We will use Baye's theorem to reach these answers algebraically, and the process will hopefully provide helpful insights 
into the reasons behind these answers.

To answer the original Monty Hall problem, let us first walk through a particular scenario: say contestant picks door1, and
host knowingly reveals empty door3.  So the question becomes:

1. $P(Prize=door1 \mid Open=door3)$:  probability of prize behind door1 given host opens door3
2. $P(Prize=door2 \mid Open=door3)$:  probability of prize behind door2 given host opens door3
3. If 2 > 1, then definitely switch!  If 2 = 1, then switch makes no difference.  If 2 < 1, never switch!


Note $P(Prize=door3 \mid Open=door3)$ is not among consideration, by definition this is eliminated from
the probability space.

Next we solve for 1 and 2:

1. $P(Prize=door1 \mid Open=door3)$ = $\frac{P(Open=door3 \mid Prize=door1) P(Prize=door1)}{P(Open=door3)}$
    - $P(Open=door3 \mid Prize=door1)$, probability of host open door3 given prize is behind door1, = 1/2
    - $P(Prize=door1)$, probability of prize is behind door1, = 1/3
    - $P(Open=door3)$, probability of host open door3 in general, = 1/2
    - result = (1/2 * 1/3) / 1/2 = 1/3
    - This also matches intuition: contestant picked randomly 1 out of 3 and stayed with the pick, the probability
      of winning should remain 1/3.

2. $P(Prize=door2 \mid Open=door3)$ = $\frac{P(Open=door3 \mid Prize=door2) P(Prize=door2)}{P(Open=door3)}$
    - $P(Open=door3 \mid Prize=door2)$, probability of host open door3 given prize is behind door2, = 1.  In other words, the host has no choice.
    - $P(Prize=door2)$, probability of prize is behind door2, = 1/3
    - $P(Open=door3)$, probability of host open door3 in general, = 1/2
    - result = (1 * 1/3) / 1/2 = 2/3


Since 2/3 is greater than 1/3, switch is a good idea!

One way to reason this result is that when the host removed an empty door, the host assigned its probability
score to the only remaining closed door:  2 doors out of three by definition has 2/3 chance of containing the prize, 
now that the empty door is removed, the entire 2/3 probability is assigned to the only remaining closed door.

For the second form of the question.  Lets walk through the steps again to solve for 1 and 2:

1. $P(Prize=door1 \mid Open=door3)$ = $\frac{P(Open=door3 \mid Prize=door1) P(Prize=door1)}{P(Open=door3)}$
    - $P(Open=door3 \mid Prize=door1)$, probability of toddler knocks door3 given the prize is behind door1, = 1/2
    - $P(Prize=door1)$, probability of prize is behind door1, = 1/3
    - $P(Open=door3)$, probability of toddler knocks over door3 in general, = 1/2
    - result = (1/2 * 1/3) / 1/2 = 1/3

2. $P(Prize=door2 \mid Open=door3)$ = $\frac{P(Open=door3 \mid Prize=door2) P(Prize=door2)}{P(Open=door3)}$
    - $P(Open=door3 \mid Prize=door2)$, probability of toddler knocks door3 given prize is behind door2, = 1/2
    - $P(Prize=door2)$, probability of prize is behind door2, = 1/3
    - $P(Open=door3)$, probability of toddler knocks over door3 in general, = 1/2
    - result = (1/2 * 1/3) / 1/2 = 1/3


1/3 = 1/3, switching makes no difference!

From contestant's perspective, both scenarios appear the same.  However, the actual probability of winning the prize
after switching the door varies a great deal depending on the **circumstances** behind the scenario: whether the host
chose the empty door with or without the knowledge of the prize location.  In Bayesian thinking, the prior affects
the posterior probability! 

## Boys and Girls paradox

### Version 1
We have a random sample of parents with two children.  We then ask one parent if at least one of the children
is a daughter.  If the parent says yes,  what's the probability that the other child is also a daughter?

If the other child is also a daughter, then both children are daughters,  we denote this as P(DD).  We then denote that
P(D) is at least one child is daughter.  So we are seeking $P(DD | D)$.

$P(DD | D)$ = $\frac{P(D \mid DD) P(DD)}{P(D)}$

- $P(D \mid DD)$, probability one is daughter given both are daughters: 1
- $P(DD)$, probability both are daughters: 1/4
- $P(D)$, probability at least one daughter = 1 - probability of both sons = 1 - 1/4 = 3/4
- result = (1/2 * 1/3) / 1/2 = 1/3


The probability of the other child is a daughter is 1/3.

### Version 2
Same as version 1, except we ask if each parent if they have a daughter named Lucy.  If a parent says yes,  what's the
probability that the other child is also a daughter?

We are looking for $P(DD | Lucy)$.

$P(DD | Lucy)$ = $\frac{P(Lucy \mid DD) P(DD)}{P(Lucy)}$

- $P(DD)$, probability both are daughters: 1/4
- $P(Lucy)$, probability of a girl is named Lucy, lets assume it's L (the value doesn't really matter).
- $P(Lucy \mid DD)$, probability of at least one girl is named Lucy given there are two daughters, this is 2 * $P(Lucy)$ = 2 * L.
- result = (2 \* P(Lucy) * 1/4) / P(Lucy) = (2 * L * 1/4) / L  = 1/2


The probability of other child is a daughter is now 1/2!

The [wiki page](https://en.wikipedia.org/wiki/Boy_or_Girl_paradox) is much more detailed at explaining this
paradox including using Baye's theorem.  


## Final thoughts

Applying Baye's theorem to these problems revealed new insights about these puzzles that I thought
I had figured out.  I wish I had paid more attention in school!
