---
description: es-toolkit과 다른 라이브러리의 성능 차이
---
성능
============

![es-toolkit과 lodash 사이의 성능 차이를 보여주는 그래프. es-toolkit은 lodash를 쓸 때보다 최대 11배 높은 성능을 보여요.](/assets/performance.png)

es-toolkit은 성능을 우선적으로 고려한 설계 덕분에, 독보적인 성능을 보여요. lodash와 같은 다른 라이브러리와 비교했을 때, 평균적으로 2배의 성능 향상을 확인할 수 있었어요. 함수에 따라서는 11배 빠른 성능을 보이기도 했죠. 
현대적인 JavaScript API을 이용하여 구현했기 때문이에요.

## 성능 비교

|                                                          | es-toolkit@0.0.1 | lodash-es@4.17.21 | 차이        |
|-----------------------------------------------------------|------------------|------------------|------------|
| [omit](./reference/object/omit.md)                        |	4,767,360회       |	403,624회        |	11.8×     |
| [pick](./reference/object/pick.md)                        |	9,121,839회       |	2,663,072회      |	3.43×     |
| [differenceWith](./reference/array/differenceWith.md)     |	9,291,897회       |	4,275,222회      |	2.17×   |
| [difference](./reference/array/difference.md)             |	10,436,101회      |	5,155,631회      | 2.02×   |
| [intersectionWith](./reference/array/intersectionWith.md) |	8,074,722회       |	3,814,479회      |	2.12×   |
| [intersection](./reference/array/intersection.md)         |	9,999,571회       |	4,630,316회      |	2.15×   |
| [unionBy](./reference/array/unionBy.md)                   |	6,435,983회       |	3,794,899회      | 1.69×   |
| [union](./reference/array/union.md)                       |	5,059,209회       |	4,771,400회      | 1.06×   |
| [dropRightWhile](./reference/array/dropRightWhile.md)     |	7,529,559회       |	5,606,439회      | 1.34×   |
| [groupBy](./reference/array/groupBy.md)                   |	5,000,235회       |	5,206,286회      | 0.96×   |

테스트 환경은 MacBook Pro 14인치(M1 Max, 2021)예요. [벤치마크 코드](https://github.com/toss/es-toolkit/tree/main/benchmarks/lodash)를 참고하세요.