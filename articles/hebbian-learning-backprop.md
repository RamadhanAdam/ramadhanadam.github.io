---
title: "Hebbian Learning and the Road to Backpropagation"
date: 2026-05-01
tags: [AI, history, neural networks]
---

Donald Hebb's 1949 rule — *neurons that fire together, wire together* — is often treated as
a historical curiosity, a pre-scientific intuition before the rigour of gradient descent arrived.
I think that undersells it.

## The Rule

Hebb's postulate, stated precisely: if neuron A repeatedly contributes to the firing of neuron B,
the synaptic weight between them should increase. In matrix form for a single weight update:

```
Δw_ij = η · x_i · x_j
```

Where `x_i` is the presynaptic activation, `x_j` the postsynaptic activation, and `η` a learning rate.
No error signal. No global objective. Just local co-activation.

## What It Gets Right

The striking thing about Hebb's rule is that it is *unsupervised by design*. The brain has no
teacher broadcasting a loss gradient. Yet it learns. Hebb was modeling that — a mechanism that
reorganises connectivity based purely on co-occurrence statistics.

This is precisely what modern self-supervised methods attempt to recover. Contrastive learning,
masked autoencoders, BYOL — all of them are, at some level, trying to build a gradient-based
approximation to Hebbian co-activation.

## Where It Falls Short

Hebb's rule has no forgetting. Weights only grow. Without a normalisation mechanism or a
competitive inhibition term, the network saturates. The biological solution is synaptic depression,
long-term potentiation vs long-term depression. The ML solution was backpropagation with a
global loss — which traded biological plausibility for tractability.

## The Connection

Backpropagation is not *replacing* Hebb. It is solving a different problem: credit assignment
across layers. Hebb's rule is local; backprop is global. The interesting question — still open —
is whether a biologically plausible local rule can approximate the global credit assignment
that backprop computes.

Forward-forward, predictive coding, and equilibrium propagation are three recent attempts.
None is settled. The question Hebb posed in 1949 is, structurally, still the question.

---

*This is part of my reading program working chronologically through 20 foundational AI papers.*
