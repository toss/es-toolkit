---
description: The performance difference between es-toolkit and alternative libraries
---

# Performance

<BenchmarkChart />

Designed with performance in mind, es-toolkit provides an average of 2× performance improvement compared to alternative libraries like lodash. Some functions achieve up to an 11× performance gain by fully utilizing modern JavaScript APIs.

## Performance Comparison

<BenchmarkEnvironment />

<BenchmarkTable />

## Measurement Method

Each benchmark runs in its own Node.js process with [mitata](https://github.com/evanwashere/mitata), and the numbers above are the median of five runs. To run a benchmark yourself:

```bash
yarn bench omit.bench.ts
```

See [`benchmarks/performance`](https://github.com/toss/es-toolkit/tree/main/benchmarks/performance) for the benchmark code.
