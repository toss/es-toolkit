---
description: es-toolkitが持つ小さなバンドルサイズ
---

# バンドルサイズ

<BundleSizeChart />

es-toolkitは現代的な実装を持っているため、他のライブラリと比べて非常に小さなバンドルサイズを持っています。[lodash](https://lodash.com)と比較すると、関数によっては最大97%小さいサイズになります。

この観点から、es-toolkitはバンドルサイズを削減するのに最も効果的な選択肢です。いくつかのユーティリティ関数は100バイト未満のサイズです。

## バンドルサイズの比較

<BundleSizeTable />

## バンドルサイズの測定方法

[esbuild 0.23.0](https://esbuild.github.io)でバンドルサイズを測定しています。以下のようなコードを使用しています。

```tsx
import { chunk } from 'es-toolkit';

// または import { chunk } from 'lodash-es';

console.log(chunk);
```

[バンドルサイズ測定ベンチマークコード](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)を参照してください。
