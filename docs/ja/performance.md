---
description: es-toolkitと他のライブラリのパフォーマンスの違い
---

# パフォーマンス

<BenchmarkChart />

パフォーマンスを重視して設計されたes-toolkitは、lodashのような他のライブラリと比較して平均2倍のパフォーマンス向上を提供します。いくつかの関数は、最新のJavaScript APIを完全に活用することで、最大11倍のパフォーマンス向上を達成します。

## パフォーマンス比較

<BenchmarkEnvironment />

<BenchmarkTable />

## 測定方法

各ベンチマークは [mitata](https://github.com/evanwashere/mitata) を使って個別の Node.js プロセスで実行し、上記の数値は 5 回実行した結果の中央値です。自分で実行するには、次のコマンドを使います。

```bash
yarn bench omit.bench.ts
```

ベンチマークコードは [`benchmarks/performance`](https://github.com/toss/es-toolkit/tree/main/benchmarks/performance) を参照してください。
