# over

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 함수들을 호출하고 그 결과를 배열로 반환하는 함수를 생성해요.

다양한 타입의 반복자를 사용할 수 있어요:

- **함수**: 각 함수는 동일한 인자로 호출되고 결과가 수집돼요.
- **속성 이름**: 각 속성 이름은 제공된 객체에서 값을 추출하는 데 사용돼요.
- **객체**: 각 객체는 제공된 객체가 해당 속성과 일치하는지 확인하는 데 사용돼요.
- **속성-값 쌍**: 각 쌍은 제공된 객체의 특정 속성이 값과 일치하는지 확인해요.

## 인터페이스

```typescript
function over(...iteratees: Array<Iteratee | Iteratee[]>): (...args: any[]) => unknown[];
```

### 파라미터

- `iteratees` (`Array<Iteratee | Iteratee[]>`): 호출할 반복자.
  - `Iteratee`는 `((...args: any[]) => unknown) | symbol | number | string | object | null` 타입이에요.

### 반환 값

(`(...args: any[]) => unknown[]`): 새로운 함수를 반환해요.

## 예시

```typescript
const func = over([Math.max, Math.min]);
const func2 = over(Math.max, Math.min);
func(1, 2, 3, 4);
// => [4, 1]
func2(1, 2, 3, 4);
// => [4, 1]

const func = over(['a', 'b']);
func({ a: 1, b: 2 });
// => [1, 2]

const func = over([{ a: 1 }, { b: 2 }]);
func({ a: 1, b: 2 });
// => [true, false]

const func = over([['a', 1], ['b', 2]]);
func({ a: 1, b: 2 });
// => [true, true]
```
