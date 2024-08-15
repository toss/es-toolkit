# has

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체가 주어진 경로에 해당하는 프로퍼티를 가지는지 확인해요.

경로로는 객체의 프로퍼티 이름, 프로퍼티 이름의 배열, 또는 깊은 경로를 나타내는 문자열을 쓸 수 있어요.

만약에 경로가 인덱스를 나타내고, 객체가 배열 또는 `arguments` 객체라면, 그 인덱스가 유효한지 (0 이상이고 길이 미만인지) 확인해요. 그래서 모든 인덱스가 정의되어 있지 않은 희소 배열(Sparse array)에도 쓸 수 있어요.

## 인터페이스

```typescript
function has(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### 파라미터

- `object` (`unknown`): 프로퍼티가 있는지 확인할 객체.
- `path` (`string`, `number`, `symbol`, `Array<string | number | symbol>`): 프로퍼티가 있는지 확인할 경로. 프로퍼티 이름, 프로퍼티 이름의 배열, 또는 깊은 경로를 나타내는 문자열을 쓸 수 있어요.

### 반환 값

(`boolean`): 객체가 경로에 값을 가지고 있으면 `true`, 아니면 `false`.

## 예시

```typescript
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

has(obj, 'a'); // true
has(obj, ['a', 'b']); // true
has(obj, ['a', 'b', 'c']); // true
has(obj, 'a.b.c'); // true
has(obj, 'a.b.d'); // false
has(obj, ['a', 'b', 'c', 'd']); // false
has([], 0); // false
has([1, 2, 3], 2); // true
has([1, 2, 3], 5); // false
```

## 데모

::: sandpack

```ts index.ts
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

console.log(has(obj, 'a.b.c'));
```

:::
