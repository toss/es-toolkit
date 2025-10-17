---
description: es-toolkitが持つ小さなバンドルサイズ
---

# バンドルサイズ

![es-toolkitとlodashのバンドルサイズを比較するグラフ。es-toolkitは最大97%小さいバンドルサイズを持つ。](/assets/bundle-size.png)

es-toolkitは現代的な実装を持っているため、他のライブラリと比べて非常に小さなバンドルサイズを持っています。[lodash](https://lodash.com)と比較すると、関数によっては最大97%小さいサイズになります。

この観点から、es-toolkitはバンドルサイズを削減するのに最も効果的な選択肢です。いくつかのユーティリティ関数は100バイト未満のサイズです。

## バンドルサイズの比較

|                                            | es-toolkit@1.40.0 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ----------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 94 bytes          | 4817 bytes        | -98.0%     |
| [difference](./reference/array/difference) | 90 bytes          | 7985 bytes        | -98.8%     |
| [sum](./reference/math/sum)                | 93 bytes          | 698 bytes         | -86.6%     |
| [debounce](./reference/function/debounce)  | 531 bytes         | 2873 bytes        | -81.5%     |
| [throttle](./reference/function/throttle)  | 764 bytes         | 3111 bytes        | -75.4%     |
| [pick](./reference/object/pick)            | 132 bytes         | 9520 bytes        | -98.6%     |
| [zip](./reference/array/zip)               | 221 bytes         | 3961 bytes        | -94.4%     |

## バンドルサイズの測定方法

[esbuild 0.23.0](https://esbuild.github.io)でバンドルサイズを測定しています。以下のようなコードを使用しています。

```tsx
import { chunk } from 'es-toolkit';

// または import { chunk } from 'lodash-es';

console.log(chunk);
```

[バンドルサイズ測定ベンチマークコード](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)を参照してください。
