# every

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열이나 객체의 모든 값이 주어진 조건에 맞는지 반환해요.

조건은 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 모든 요소가 `true`를 반환해야 결과가 `true`가 돼요.
- **부분 객체**: 주어진 객체와 모든 프로퍼티가 일치하는 경우에만 `true`를 반환해요.
- **프로퍼티-값 쌍**: 해당 프로퍼티에 대해서 모든 요소가 값이 일치해야 `true`를 반환해요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 모든 요소가 참으로 평가되는 값을 가져야 `true`를 반환해요.

## 인터페이스

```typescript
function every<T>(arr: T[]): boolean;
function every<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): boolean;
function every<T>(arr: T[], doesMatch: Partial<T>): boolean;
function every<T>(arr: T[], doesMatch: [keyof T, unknown]): boolean;
function every<T>(arr: T[], doesMatch: string): boolean;

function every<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: string): boolean;
```

### 파라미터

- `arr` (`T[]`) 또는 `object` (`T`): 검색할 배열이나 객체.

- `doesMatch`:

  - 배열의 경우:

    - **검사 함수** (`(item: T, index: number, arr: T[]) => unknown`): 모든 요소가 조건을 만족하는지 확인하는 함수.
    - **부분 객체** (`Partial<T>`): 모든 요소가 주어진 부분 객체의 프로퍼티와 값에 일치해야 `true`를 반환하는 객체.
    - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플로, 모든 요소가 이 조건을 만족해야 `true`를 반환.
    - **프로퍼티 이름** (`string`): 모든 요소가 해당 프로퍼티에 대해 참으로 평가되는 값을 가져야 `true`를 반환.

  - 객체의 경우:
    - **검사 함수** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): 모든 요소가 조건을 만족하는지 확인하는 함수.
    - **Partial value** (`Partial<T[keyof T]>`): 모든 요소가 주어진 부분 값에 일치해야 `true`를 반환하는 객체.
    - **Property-value pair** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플로, 모든 요소가 이 조건을 만족해야 `true`를 반환.
    - **Property name** (`string`): 모든 요소가 해당 프로퍼티에 대해 참으로 평가되는 값을 가져야 `true`를 반환.

### 반환 값

(`boolean`): 주어진 조건을 만족하는 모든 요소가 있을 경우 `true`, 그렇지 않으면 `false`를 반환.

## 예시

### 배열의 경우

```typescript
import { every } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const items = [1, 2, 3, 4, 5];
const result = every(items, item => item > 0);
console.log(result); // true

// 부분 객체를 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, { name: 'Bob' });
console.log(result); // false

// 프로퍼티-값 쌍을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, ['name', 'Alice']);
console.log(result); // false

// 프로퍼티 이름을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, 'name');
console.log(result); // true
```

### 객체의 경우

```typescript
import { every } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const obj = { a: 1, b: 2, c: 3 };
const result = every(obj, value => value > 0);
console.log(result); // true

// 부분 객체를 쓰는 경우
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, { name: 'Bob' });
console.log(result); // false

// 프로퍼티-값 쌍을 쓰는 경우
const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = every(obj, ['name', 'Alice']);
console.log(result); // false

// 프로퍼티 이름을 쓰는 경우
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, 'name');
console.log(result); // true
```
