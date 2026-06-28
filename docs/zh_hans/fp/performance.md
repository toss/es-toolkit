# 性能

<FpBenchmarkChart />

`es-toolkit/fp` 在设计时优先考虑性能。与 [remeda](https://remedajs.com/) 等其他库相比，我们观察到平均 1.5-3 倍的性能提升。这是因为它使用现代 JavaScript API，并围绕必要功能进行实现。

## 性能比较

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## 测量方法

以上数字是在此分支上使用 Vitest 测得的。

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

准确的基准测试代码见 `benchmarks/performance/fp/pipe.bench.ts`。
