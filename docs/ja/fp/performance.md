# パフォーマンス

<FpBenchmarkChart />

`es-toolkit/fp` は設計時にパフォーマンスを優先しています。[remeda](https://remedajs.com/) などの他のライブラリと比べて、平均で 1.5-3 倍のパフォーマンス向上を確認できました。モダンな JavaScript API を利用し、必要な機能を中心に実装しているためです。

## パフォーマンス比較

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## 測定方法

各ベンチマークは [mitata](https://github.com/evanwashere/mitata) を使って個別の Node.js プロセスで実行し、上記の数値は 5 回実行した結果の中央値です。自分で実行するには、次のコマンドを使います。

```bash
yarn bench fp/pipe
```

正確なベンチマークコードは `benchmarks/performance/fp/pipe.bench.ts` を参照してください。
