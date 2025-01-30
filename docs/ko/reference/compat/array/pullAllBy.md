# pullAllBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

제공된 함수로 요소들을 매핑한 후, 지정된 모든 값을 배열에서 제거해요.

요소를 매핑하는 방법은 여러 방법으로 명시할 수 있어요.

- **함수**: 요소끼리 비교하기 전, 각각의 요소를 주어진 함수로 매핑해요. 각각의 요소마다 함수가 실행되고, 반환되는 값으로 요소를 비교해요.
- **프로퍼티 이름**: 주어진 프로퍼티의 값으로 요소를 비교해요.
- **부분 객체**: 두 요소 모두가 주어진 부분 객체의 모든 프로퍼티 및 값과 일치하는지를 기준으로 비교해요.
- **프로퍼티-값 쌍**: 두 요소 모두가 주어진 프로퍼티 및 값과 일치하는지를 기준으로 비교해요.

이 함수는 `arr`을 제자리에서 변경해요.
원본 배열을 수정하지 않고 값을 제거하려면 [differenceBy](../../array/differenceBy.md)를 사용하세요.

## 인터페이스

```typescript
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: Partial<T>): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: [keyof T, unknown]): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: keyof T): T[];
```

### 파라미터

- `arr` (`T[]`): 수정할 배열.
- `valuesToRemove` (`ArrayLike<T>`): 배열에서 제거할 값.
- `getValue`:
  - **함수** (`(value: T) => unknown`): 요소끼리 비교하기 전, 각각의 요소를 주어진 함수로 매핑해요. 각각의 요소마다 함수가 실행되고, 반환되는 값으로 요소를 비교해요.
  - **프로퍼티 이름** (`keyof T`): 주어진 프로퍼티의 값으로 요소를 비교해요.
  - **부분 객체** (`Partial<T>`): 두 요소 모두가 주어진 부분 객체의 모든 프로퍼티 및 값과 일치하는지를 기준으로 비교해요.
  - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 두 요소 모두가 주어진 프로퍼티 및 값과 일치하는지를 기준으로 비교해요.

### 반환 값

(`T[]`): 지정된 값이 제거된 수정된 배열.

## 예시

```typescript
// Using a iteratee function
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], obj => obj.value);
console.log(result); // [{ value: 2 }]

// Using a property name
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], 'value');
console.log(result); // [{ value: 2 }]
```
