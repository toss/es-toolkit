---
description: es-toolkit与替代库之间的性能差异
---

# 性能

<BenchmarkChart />

es-toolkit 设计时考虑了性能，与类似 lodash 的替代库相比，平均性能提升了2倍。通过充分利用现代 JavaScript API，部分函数甚至可以获得高达11倍的性能提升。

## 性能比较

<BenchmarkEnvironment />

<BenchmarkTable />

## 测量方法

每个基准测试都使用 [mitata](https://github.com/evanwashere/mitata) 在独立的 Node.js 进程中运行，以上数字是运行 5 次后的中位数。如需自行运行，请使用以下命令：

```bash
yarn bench omit.bench.ts
```

基准测试代码见 [`benchmarks/performance`](https://github.com/toss/es-toolkit/tree/main/benchmarks/performance)。
