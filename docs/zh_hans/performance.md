---
description: es-toolkit与替代库之间的性能差异
---

# 性能

![图表显示es-toolkit与lodash之间性能差异。使用es-toolkit可获得高达11倍的性能提升。](/assets/performance.png)

es-toolkit 设计时考虑了性能，与类似 lodash 的替代库相比，平均性能提升了2倍。通过充分利用现代 JavaScript API，部分函数甚至可以获得高达11倍的性能提升。

## 性能比较

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

在 MacBook Pro 14-inch (M1 Max, 2021) 上进行了测试。请参考我们的 [基准测试代码](https://github.com/toss/es-toolkit/tree/main/benchmarks)。
