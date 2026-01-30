---
description: The performance difference between es-toolkit and alternative libraries
---

# Performance

Designed with performance in mind, es-toolkit provides an average of 2× performance improvement compared to alternative libraries like lodash.

## Performance Comparison

|                                                           | es-toolkit@1.39.8 | lodash-es@4.17.21 | Difference |
| --------------------------------------------------------- | ----------------- | ----------------- | ---------- |
| [omit](./reference/object/omit.md)                        | 5,522,023 times   | 1,598,902 times   | 3.45x      |
| [pick](./reference/object/pick.md)                        | 11,548,374 times  | 2,507,413 times   | 4.61x      |
| [differenceWith](./reference/array/differenceWith.md)     | 18,559,083 times  | 4,648,750 times   | 3.99x      |
| [difference](./reference/array/difference.md)             | 13,838,471 times  | 5,605,974 times   | 2.47x      |
| [intersectionWith](./reference/array/intersectionWith.md) | 14,160,477 times  | 4,100,403 times   | 3.87x      |
| [intersection](./reference/array/intersection.md)         | 12,555,311 times  | 5,442,531 times   | 2.31x      |
| [unionBy](./reference/array/unionBy.md)                   | 6,116,069 times   | 4,210,245 times   | 1.76x      |
| [dropRightWhile](./reference/array/dropRightWhile.md)     | 18,924,422 times  | 11,115,819 times  | 1.70x      |

Tested with MacBook Pro 16-inch (M1 Max, 2021). Refer to our [benchmark code](https://github.com/toss/es-toolkit/tree/main/benchmarks).
