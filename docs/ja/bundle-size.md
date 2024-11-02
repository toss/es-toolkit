---
description: es-toolkitが持つ小さなバンドルサイズ
---

# バンドルサイズ

![es-toolkitとlodashのバンドルサイズを比較するグラフ。es-toolkitは最大97%小さいバンドルサイズを持つ。](/assets/bundle-size.png)

es-toolkitは現代的な実装を持っているため、他のライブラリと比べて非常に小さなバンドルサイズを持っています。[lodash](https://lodash.com)と比較すると、関数によっては最大97%小さいサイズになります。

この観点から、es-toolkitはバンドルサイズを削減するのに最も効果的な選択肢です。いくつかのユーティリティ関数は100バイト未満のサイズです。

## バンドルサイズの比較

|                                            | es-toolkit@0.0.1 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ---------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 88 bytes         | 2000 bytes        | -95.6%     |
| [difference](./reference/array/difference) | 91 bytes         | 3190 bytes        | -97.2%     |
| [sum](./reference/math/sum)                | 152 bytes        | 413 bytes         | -63.2%     |
| [debounce](./reference/function/debounce)  | 144 bytes        | 1400 bytes        | -89.7%     |
| [throttle](./reference/function/throttle)  | 110 bytes        | 1460 bytes        | -92.5%     |
| [pick](./reference/object/pick)            | 657 bytes        | 3860 bytes        | -83.0%     |
| [zip](./reference/array/zip)               | 797 bytes        | 1790 bytes        | -55.5%     |

## バンドルサイズの測定方法

[esbuild 0.23.0](https://esbuild.github.io)でバンドルサイズを測定しています。以下のようなコードを使用しています。

```tsx
import { chunk } from 'es-toolkit';

// または import { chunk } from 'lodash-es';

console.log(chunk);
```

[バンドルサイズ測定ベンチマークコード](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)を参照してください。
