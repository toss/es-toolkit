# Performance

<FpBenchmarkChart />

`es-toolkit/fp` is designed with performance as a priority. Compared with other libraries such as [remeda](https://remedajs.com/), we observed an average 1.5-3x performance improvement. This comes from using modern JavaScript APIs and focusing the implementation on the features that are necessary.

## Performance Comparison

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## Measurement Method

To run the benchmark yourself:

```bash
yarn bench fp/pipe
```

See `benchmarks/performance/fp/pipe.bench.ts` for the exact benchmark code.
