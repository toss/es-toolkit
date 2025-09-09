# cond

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

여러 조건을 순서대로 확인하면서 맞는 조건을 찾아 해당하는 함수를 실행하는 함수를 만들어요.

각 쌍은 조건을 검사하는 함수와 실행할 함수로 이루어져 있어요.
조건 함수들을 순서대로 실행하면서 `true`를 반환하는 조건을 찾을 때까지 확인해요.
`true`를 반환하는 조건을 찾으면 그에 맞는 함수를 실행하고 결과를 반환해요.
모든 조건이 `false`를 반환하면 `undefined`를 반환해요.

## 인터페이스

```typescript
function cond<R>(pairs: Array<[truthy: () => boolean, falsey: () => R]>): () => R;
function cond<T, R>(pairs: Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>): (val: T) => R;
```

### 파라미터

- `pairs` (`Array<[truthy: (val: T) => boolean, falsey: (val: T) => R]>`): 조건을 검사하는 함수와 실행할 함수의 쌍.

### 반환 값

(`(val: T) => R`): 조건을 확인하고 맞는 함수를 실행하는 새로운 복합 함수.

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
