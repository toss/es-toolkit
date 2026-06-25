# パフォーマンス

<FpBenchmarkChart />

`es-toolkit/fp` は設計時にパフォーマンスを優先しています。[remeda](https://remedajs.com/) などの他のライブラリと比べて、平均で 1.5-3 倍のパフォーマンス向上を確認できました。モダンな JavaScript API を利用し、必要な機能を中心に実装しているためです。

## パフォーマンス比較

<FpBenchmarkEnvironment />

<FpBenchmarkTable />

## 測定方法

上記の数値は、このブランチで Vitest を使って測定しました。

```bash
yarn vitest bench performance/fp/pipe.bench.ts --run
```

正確なベンチマークコードは `benchmarks/performance/fp/pipe.bench.ts` を参照してください。
