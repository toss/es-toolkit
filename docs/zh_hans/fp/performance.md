# 性能

<FpBenchmarkChart />

`es-toolkit/fp` 在设计时优先考虑性能。与 [remeda](https://remedajs.com/) 等其他库相比，我们观察到平均 1.5-3 倍的性能提升。这是因为它使用现代 JavaScript API，并围绕必要功能进行实现。

## 性能比较

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## 测量方法

每个基准测试都使用 [mitata](https://github.com/evanwashere/mitata) 在独立的 Node.js 进程中运行，以上数字是运行 5 次后的中位数。如需自行运行，请使用以下命令：

```bash
yarn bench fp/pipe
```

准确的基准测试代码见 `benchmarks/performance/fp/pipe.bench.ts`。
