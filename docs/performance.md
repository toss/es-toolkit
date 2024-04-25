---
description: The performance difference between es-toolkit and alternative libraries
---
Performance
============

![Graph showing the difference in performance between es-toolkit and lodash. Using es-toolkit results in a performance gain of up to 11 times.](/assets/performance.png)

Designed with performance in mind, es-toolkit provides an average of 2× performance improvement compared to alternative libraries like lodash. Some functions achieve up to an 11× performance gain by fully utilizing modern JavaScript APIs.


## Performance Comparison

|                                                          | es-toolkit@0.0.1 | lodash-es@4.17.21 | Difference |
|-----------------------------------------------------------|------------------|--------------------|------------|
| [omit](./reference/object/omit.md)                        |	4,767,360 times  |	403,624 times     |	11.8×     |
| [pick](./reference/object/pick.md)                        |	9,121,839 times  |	2,663,072 times   |	3.43×     |
| [differenceWith](./reference/array/differenceWith.md)     |	9,291,897 times  |	4,275,222 times   |	2.17×   |
| [difference](./reference/array/difference.md)             |	10,436,101 times |	5,155,631 times   | 2.02×   |
| [intersectionWith](./reference/array/intersectionWith.md) |	8,074,722 times  |	3,814,479 times   |	2.12×   |
| [intersection](./reference/array/intersection.md)         |	9,999,571 times  |	4,630,316 times   |	2.15×   |
| [unionBy](./reference/array/unionBy.md)                   |	6,435,983 times  |	3,794,899 times   | 1.69×   |
| [union](./reference/array/union.md)                       |	5,059,209 times  |	4,771,400 times   | 1.06×   |
| [dropRightWhile](./reference/array/dropRightWhile.md)     |	7,529,559 times  |	5,606,439 times   | 1.34×   |
| [groupBy](./reference/array/groupBy.md)                   |	5,000,235 times  |	5,206,286 times   | 0.96×   |

Tested with MacBook Pro 14-inch (M1 Max, 2021). Refer to our [benchmark code](https://github.com/toss/es-toolkit/tree/main/benchmarks).