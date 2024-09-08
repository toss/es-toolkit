# some

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 조건을 만족하는 요소가 배열에 있는지 확인해요.

조건은 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 처음으로 `true`를 반환하게 하는 값이 선택돼요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하는 첫 번째 요소가 선택돼요.
- **프로퍼티-값 쌍**: 해당 프로퍼티에 대해서 값이 일치하는 첫 번째 요소가 선택돼요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 참으로 평가되는 값을 가지는 첫 번째 요소가 선택돼요.

조건이 주어지지 않았다면, 배열에 참으로 평가받는 요소가 있는지 확인해요.

## 인터페이스

```typescript
function some<T>(arr: T[], predicate: (item: T, index: number, arr: any) => unknown): boolean;
function some<T>(arr: T[], predicate: [keyof T, unknown]): boolean;
function some<T>(arr: T[], predicate: string): boolean;
function some<T>(arr: T[], predicate: Partial<T>): boolean;
```

### 파라미터

- `arr` (`T[]`): 반복할 배열.
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string`):
  - **검사 함수** (`(item: T, index: number, arr: T[]) => unknown`): 찾는 요소인지 여부를 반환하는 함수.
  - **부분 객체** (`Partial<T>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.
  - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
  - **프로퍼티 이름** (`string`): 참으로 평가되는 값을 가지고 있는지 확인할 프로퍼티 이름.

### 반환 값

(`boolean`): 조건을 만족하는 요소가 있는지 여부.

## 예시

```typescript
some([1, 2, 3, 4], n => n % 2 === 0);
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
// => true
```
