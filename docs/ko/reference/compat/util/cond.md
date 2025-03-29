# cond

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`pairs`를 반복하면서 `boolean`값을 반환하는 첫 번째 조건자의 해당 함수를 호출하는 함수를 반환해요. 조건자-함수 쌍은 생성된 함수의 `this` 바인딩과 인수로 호출돼요.

## 인터페이스

```typescript
function cond(pairs: any[][]): (...args: any[]) => unknown;
```

### 파라미터

- `pairs` (`Array`): 조건자-함수 쌍이에요.

### 반환 값

(`(...args: any[]) => unknown`): 새로운 복합 함수를 반환해요.

## 예시

```typescript
const func = cond([
  [matches({ a: 1 }), constant('matches A')],
  [conforms({ b: isNumber }), constant('matches B')],
  [stubTrue, constant('no match')],
]);

func({ a: 1, b: 2 });
// => 'matches A'

func({ a: 0, b: 1 });
// => 'matches B'

func({ a: '1', b: '2' });
// => 'no match'
```
