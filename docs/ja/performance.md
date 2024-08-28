---
description: es-toolkitと他のライブラリのパフォーマンスの違い
---

# パフォーマンス

![es-toolkitとlodashのパフォーマンスの違いを示すグラフ。es-toolkitを使用すると、最大11倍のパフォーマンス向上が得られます。](/assets/performance.png)

パフォーマンスを重視して設計されたes-toolkitは、lodashのような他のライブラリと比較して平均2倍のパフォーマンス向上を提供します。いくつかの関数は、最新のJavaScript APIを完全に活用することで、最大11倍のパフォーマンス向上を達成します。

## パフォーマンス比較

|                                                           | es-toolkit@0.0.1 | lodash-es@4.17.21 | Difference |
| --------------------------------------------------------- | ---------------- | ----------------- | ---------- |
| [omit](./reference/object/omit.md)                        | 4,767,360 times  | 403,624 times     | 11.8×      |
| [pick](./reference/object/pick.md)                        | 9,121,839 times  | 2,663,072 times   | 3.43×      |
| [differenceWith](./reference/array/differenceWith.md)     | 9,291,897 times  | 4,275,222 times   | 2.17×      |
| [difference](./reference/array/difference.md)             | 10,436,101 times | 5,155,631 times   | 2.02×      |
| [intersectionWith](./reference/array/intersectionWith.md) | 8,074,722 times  | 3,814,479 times   | 2.12×      |
| [intersection](./reference/array/intersection.md)         | 9,999,571 times  | 4,630,316 times   | 2.15×      |
| [unionBy](./reference/array/unionBy.md)                   | 6,435,983 times  | 3,794,899 times   | 1.69×      |
| [union](./reference/array/union.md)                       | 5,059,209 times  | 4,771,400 times   | 1.06×      |
| [dropRightWhile](./reference/array/dropRightWhile.md)     | 7,529,559 times  | 5,606,439 times   | 1.34×      |
| [groupBy](./reference/array/groupBy.md)                   | 5,000,235 times  | 5,206,286 times   | 0.96×      |

テスト環境はMacBook Pro 14インチ（M1 Max、2021）です。[ベンチマークコード](https://github.com/toss/es-toolkit/tree/main/benchmarks)を参照してください。
