# takeRightWhile

조건 함수가 `true`를 반환하는 동안 배열의 끝에서부터 요소들을 가져와요.
조건을 만족하지 않는 요소가 나오면 멈춰요.

## 인터페이스

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `shouldContinueTaking` (`(item: T) => boolean`): 각 요소와 함께 호출되는 조건 함수예요. 이 함수가 `true`를 반환하는 동안 요소들이 결과에 포함돼요.

### 반환 값

(`T[]`): 조건 함수가 `true`를 반환하는 동안 배열의 끝에서부터 가져온 요소들을 포함하는 새로운 배열이에요.

## 예시

```typescript
// [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// []
takeRightWhile([1, 2, 3], n => n > 3);
```

## Lodash와 호환성

`es-toolkit/compat`에서 `takeRightWhile`를 가져오면 lodash와 완전히 호환돼요.

요소를 가져올 조건을 명시할 수 있고, 조건이 참 같은 값으로 평가되는 동안 배열의 끝에서 요소를 가져와요.

- **검사 함수**: 배열의 각 요소에 적용되는 검사 함수를 제공할 수 있어요. 함수가 참 같은 값을 반환하는 동안 요소를 가져오고, 처음으로 거짓 같은 값을 반환하면 가져오기를 멈춰요.
- **부분 객체**: 부분 객체를 제공할 수도 있어요. 제공된 객체의 속성과 일치하는 동안 요소를 가져와요.
- **프로퍼티-값 쌍**: 프로퍼티와 값을 지정할 수도 있어요. 지정된 프로퍼티가 주어진 값과 일치하는 요소를 가져와요.
- **프로퍼티 이름**: 마지막으로, 프로퍼티 이름을 제공할 수 있어요. 해당 프로퍼티의 값이 참 같은 값으로 평가되는 동안 요소를 가져와요.

### 인터페이스

```typescript
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeRightWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### 예시

```typescript
// 검사 함수를 사용하는 예시
const array1 = [1, 2, 3, 4, 5];
const result1 = takeRightWhile(array1, x => x > 3);
// result1은 [4, 5]가 돼요. 3보다 큰 요소는 참 같은 값으로 평가되므로 끝에서 가져오고, 처음으로 3 이하의 값을 만나면 멈춰요.

// 부분 객체를 사용하는 예시
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = takeRightWhile(array2, { a: 3 });
// result2는 [{ a: 3 }]가 돼요. 마지막 객체만 주어진 부분 객체와 속성이 일치하기 때문이에요.

// 프로퍼티-값 쌍을 사용하는 예시
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = takeRightWhile(array3, ['id', 3]);
// result3는 [{ id: 3 }]가 돼요. 마지막 객체의 id 속성이 값 3과 일치하기 때문이에요.

// 프로퍼티 이름을 사용하는 예시
const array4 = [{ isActive: false }, { isActive: true }, { isActive: true }];
const result4 = takeRightWhile(array4, 'isActive');
// result4는 [{ isActive: true }, { isActive: true }]가 돼요. isActive 속성이 참 같은 값으로 평가되는 요소를 끝에서 가져오기 때문이에요.

// 조건이 없는 경우
const array5 = [1, 2, 3];
const result5 = takeRightWhile(array5);
// result5는 [1, 2, 3]이에요. 조건이 없는 경우 기본적으로 identity 함수가 사용되기 때문이에요.

// null이나 undefined 배열의 경우
const result6 = takeRightWhile(null);
// result6은 []가 돼요. 입력 배열이 null 또는 undefined이기 때문이에요.
```
