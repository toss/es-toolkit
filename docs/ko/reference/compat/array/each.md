# each

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열 (`arr`)의 요소들을 왼쪽에서 오른쪽으로 순회하며 각 요소에 대해 `callback` 함수를 호출해요.

`callback` 함수가 `false`를 반환하면 순회를 멈춰요.

[forEach](./forEach.md) 함수의 다른 이름이에요.

## 인터페이스

```ts
function each<T extends object>(object: T, callback: (value: T[keyof T], key: keyof T, object: T) => void): T;
```

### 파라미터

- `object` (`T`): 순회할 객체. 배열, 문자열, 또는 객체일 수 있어요.
- `callback` (`(value: T[keyof T], key: keyof T, object: T)`): 각 반복마다 호출될 함수.
  - `value`: 배열에서 처리 중인 현재 요소.
  - `index`: 배열에서 처리 중인 현재 요소의 프로퍼티 이름.
  - `object`: `each` 함수가 호출된 객체.

### 반환 값

(`T`): `each`로 순회하는 객체.

## 예시

```ts
import { each } from 'es-toolkit/compat';

const array = [1, 2, 3];
const result: number[] = [];

// each 함수를 사용하여 배열을 순회하며 각 요소를 결과 배열에 추가해요.
each(array, value => {
  result.push(value);
});

console.log(result); // Output: [1, 2, 3];
```
