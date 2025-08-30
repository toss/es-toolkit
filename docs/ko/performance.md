---
description: es-toolkit과 다른 라이브러리의 성능 차이
---

# 성능

es-toolkit은 설계할 때 성능을 우선적으로 고려하고 있어요. lodash와 같은 다른 라이브러리와 비교했을 때, 평균적으로 2배의 성능 향상을 확인할 수 있었어요.

## 성능 비교

|                                                           | es-toolkit@1.39.8 | lodash-es@4.17.21 | 차이  |
| --------------------------------------------------------- | ----------------- | ----------------- | ----- |
| [omit](./reference/object/omit.md)                        | 5,522,023회       | 1,598,902회       | 3.45x |
| [pick](./reference/object/pick.md)                        | 11,548,374회      | 2,507,413회       | 4.61x |
| [differenceWith](./reference/array/differenceWith.md)     | 18,559,083회      | 4,648,750회       | 3.99x |
| [difference](./reference/array/difference.md)             | 13,838,471회      | 5,605,974회       | 2.47x |
| [intersectionWith](./reference/array/intersectionWith.md) | 14,160,477회      | 4,100,403회       | 3.87x |
| [intersection](./reference/array/intersection.md)         | 12,555,311회      | 5,442,531회       | 2.31x |
| [unionBy](./reference/array/unionBy.md)                   | 6,116,069회       | 4,210,245회       | 1.76x |
| [dropRightWhile](./reference/array/dropRightWhile.md)     | 18,924,422회      | 11,115,819회      | 1.70x |

테스트 환경은 MacBook Pro 16인치(M1 Max, 2021)예요. [벤치마크 코드](https://github.com/toss/es-toolkit/tree/main/benchmarks)를 참고하세요.
