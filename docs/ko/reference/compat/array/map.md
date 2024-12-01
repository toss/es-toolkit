# map

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열의 각 요소에 대해 제공된 이터레이터를 기반으로 변환된 값의 새 배열을 반환해요.

이터레이터는 다음과 같은 방법으로 지정할 수 있어요:

- **변환 함수**: 변환 함수를 제공하면 각 요소에 적용돼요.
- **속성 키**: 속성 키를 제공하면 함수는 각 요소에서 지정된 속성의 값을 반환해요.
- **객체**: 객체를 제공하면 함수는 각 요소를 객체와 비교하고 일치하는 경우 `true`를 반환해요.

## 인터페이스

```typescript
function map<T, U>(collection: T[], iteratee: (value: T, index: number, collection: T[]) => U): U[];
function map<T, U>(collection: ArrayLike<T>, iteratee: (value: T, index: number, collection: ArrayLike<T>) => U): U[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: null | undefined): T[];
function map<T extends object, U>(collection: T, iteratee: (value: T[keyof T], key: string, collection: T) => U): U[];
function map<T, K extends keyof T>(collection: Record<string, T> | Record<number, T>, iteratee: K): Array<T[K]>;
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: string): any[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: object): boolean[];
```

### 파라미터

- `collection` (`T[]` | `ArrayLike<T>` | `Record<string, T>` | `Record<number, T>`): 이터레이션할 컬렉션입니다.

- `iteratee`:

- **변환 함수** (`(value: T, index: number, collection: T[]) => U`): 각 요소를 변환하는 함수입니다.
- **속성 키** (`K` | `string`): 각 요소에서 추출할 속성의 키입니다.
- **객체** (`object`): 각 요소를 비교할 객체입니다.

### 반환 값

(`any[]`): 변환된 값의 새 배열입니다.

### 예시

```typescript
// 변환 함수 사용
const array = [1, 2, 3];
map(array, value => value * 2); // => [2, 4, 6]

// 이터레이터로 속성 키 사용
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, 'a'); // => [1, 2, 3]

// 이터레이터로 객체 사용
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, { a: 1 }); // => [true, false, false]

// 이터레이터 없음
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// 객체로 컬렉션 사용
const obj = { a: 1, b: 2, c: 3 };
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
