# invokeMap

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](mdc:../../../compatibility.md)해요.
:::

컬렉션의 각 요소에서 `path`에 해당하는 메서드를 호출하고, 호출된 각 메서드의 결과를 배열로 반환해요. 추가 인자들은 각각의 호출되는 메서드에 전달돼요. 만약 `path`가 함수라면, 컬렉션의 각 요소에 대해 호출되며 `this`가 각 요소에 바인딩돼요.

## 인터페이스

```typescript
function invokeMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  path: PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R),
  ...args: unknown[]
): Array<R | undefined>;
```

### 파라미터

- `collection` (`T[] | Record<string, T> | null | undefined`): 순회할 컬렉션이에요.
- `path` (`PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R)`): 호출할 메서드의 경로(문자열, 숫자, 심볼, 또는 이들의 배열)나 호출할 함수예요.
- `args` (`...unknown[]`): 각 메서드를 호출할 때 전달할 인자들이에요.

### 반환 값

(`Array<R | undefined>`): 결과 배열을 반환해요. 경로를 찾을 수 없거나 메서드 호출 결과가 `undefined`인 경우 해당 요소는 `undefined`가 돼요.

## 예시

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 각 요소의 메서드 호출하기
invokeMap(['a', 'b', 'c'], 'toUpperCase');
// => ['A', 'B', 'C']

// 인자와 함께 메서드 호출하기
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[1, 5, 7], [1, 2, 3]]

// 객체의 각 값에 대해 메서드 호출하기
invokeMap({ a: 1, b: 2, c: 3 }, 'toFixed', 1);
// => ['1.0', '2.0', '3.0']

// 메서드 이름 대신 함수 사용하기
invokeMap(
  ['a', 'b', 'c'],
  function (this: string, prefix: string, suffix: string) {
    return prefix + this.toUpperCase() + suffix;
  },
  '(',
  ')'
);
// => ['(A)', '(B)', '(C)']

invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```
