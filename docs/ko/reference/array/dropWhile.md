# dropWhile

배열의 처음부터 시작해서, 조건 함수가 `false`를 반환할 때까지 요소들을 제거해요.

이 함수는 각 배열의 요소를 순회하면서, 배열의 시작부터 조건 함수가 `false`를 반환할 때까지 요소를 제거해요.
남은 요소들로 구성된 새로운 배열을 반환해요.

## 인터페이스

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => boolean): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 요소를 제거하는 것을 계속할지 반환하는 조건 함수예요. 각 요소와 그 인덱스 및 배열과 함께 호출되며, true를 반환하는 동안 요소를 제거해요.

### 반환 값

(`T[]`): 조건 함수가 `false`를 반환할 때까지 남은 요소들로 이루어진 새로운 배열.

## 예시

```typescript
const array = [1, 2, 3, 2, 4, 5];
const result = dropWhile(array, x => x < 3);
// 3보다 작은 요소를 발견할 때까지 요소를 제거하므로, 결괏값은 [3, 2, 4, 5]이 되어요.
```

## Lodash와 호환성

`es-toolkit/compat`에서 `dropWhile`를 가져오면 lodash와 완전히 호환돼요.

계속해서 배열에서 요소를 제거할 조건을 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 처음으로 `false`를 반환하게 하는 요소가 있을 때까지 요소를 제거해요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하지 않는 요소가 있을 때까지 요소를 제거해요.
- **프로퍼티-값 쌍**: 해당 프로퍼티와 값이 일치하지 않는 요소가 있을 때까지 요소를 제거해요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 거짓으로 평가되는 값이 있을 때까지 요소를 제거해요.

### 인터페이스

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => unknown): T[];
function dropWhile<T>(arr: T[], objectToDrop: Partial<T>): T[];
function dropWhile<T>(arr: T[], propertyToDrop: [keyof T, unknown]): T[];
function dropWhile<T>(arr: readonly T[], propertyToDrop: string): T[];
```

### 예시

```typescript
// 검사 함수를 사용하는 예시
const array1 = [1, 2, 3, 4, 5];
const result1 = dropWhile(array1, x => x < 3);
// 3보다 작은 요소가 제거되므로, 결과는 [3, 4, 5]가 돼요.

// 부분 객체를 사용하는 예시
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = dropWhile(array2, { a: 1 });
// 첫 번째 요소만 부분 객체와 일치하므로, 결과는 [{ a: 2 }, { a: 3 }]가 돼요.

// 프로퍼티-값 쌍을 사용하는 예시
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = dropWhile(array3, ['id', 1]);
// 첫 번째 요소만 `id` 프로퍼티가 `1`과 일치하므로, 결과는 [{ id: 2 }, { id: 3 }]가 돼요.

// 프로퍼티 이름을 사용하는 예시
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = dropWhile(array4, 'isActive');
// `isActive`가 참으로 평가되는 요소들이 있을 때까지 요소를 제거하므로, 결과는 [{ isActive: false }]이 돼요.
```
