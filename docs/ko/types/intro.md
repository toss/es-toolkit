# es-toolkit/types

`es-toolkit/types`는 타입스크립트가 기본으로 제공하지 않는 **컴파일 타임 타입 유틸리티**를 모아둔 모듈이에요. 런타임 코드가 전혀 없는 선언 전용(declaration-only) 모듈이라, 값이 아니라 타입만 가져와서 써요.

```typescript
import type { DeepPartial, ValueOf } from 'es-toolkit/types';
```

## 담고 있는 것

타입스크립트에 없어서 매번 직접 만들어 쓰던 타입들만 골라 담았어요.

| 타입 | 설명 |
| --- | --- |
| [`ValueOf<T>`](./reference/ValueOf.md) | 객체의 값 타입들을 유니온으로 만들어요. `keyof`의 값 버전이에요. |
| [`Simplify<T>`](./reference/Simplify.md) | 교차 타입이나 매핑된 타입을 하나의 읽기 쉬운 객체 타입으로 펼쳐요. |
| [`Writable<T>`](./reference/Writable.md) | 모든 프로퍼티에서 `readonly`를 없애요. 기본 `Readonly`의 반대예요. |
| [`NonEmptyArray<T>`](./reference/NonEmptyArray.md) | 최소 한 개 이상의 요소를 가지는 배열이에요. |
| [`DeepPartial<T>`](./reference/DeepPartial.md) | 중첩된 객체까지 재귀적으로 모두 선택적으로 만들어요. |
| [`DeepReadonly<T>`](./reference/DeepReadonly.md) | 중첩된 객체까지 재귀적으로 모두 `readonly`로 만들어요. |

## 선정 기준

타입스크립트가 이미 주는 건 넣지 않았어요. 비슷한 게 기본으로 있으면 그걸 쓰는 게 낫고(`Partial`, `Omit`, `NonNullable` 등), 정말로 빠진 것만 채웠어요. 채울 때도 기본 타입과 결이 같게 만들었어요. 예를 들어 `ValueOf`는 `keyof`와 짝이 맞도록 설계했어요.

## 기여하기

원하는 타입이 여기에 없다면 언제든지 [이슈](https://github.com/toss/es-toolkit/issues/new)를 남기거나 직접 기여해 주세요. 기여할 때는 그 타입이 **어떤 상황에서 필요한지**, **얼마나 자주 쓰는 패턴인지**를 함께 담아주시면 좋아요. 위 선정 기준을 판단하는 데 큰 도움이 돼요.
