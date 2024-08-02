# size

입력 값의 크기를 반환합니다.

이 함수는 배열, 문자열 또는 객체를 입력받아 그 크기를 반환합니다. 배열과 문자열의 경우, 요소 또는 문자의 수를 반환합니다. 객체의 경우, 열거 가능한 속성의 수를 반환합니다.

## 인터페이스

```typescript
function size<T>(value: T[] | object | string | Map<unknown, T> | Set<T> | null | undefined): number;
```

### 파라미터

- `value` (`T`): 크기를 확인할 배열, 문자열 또는 객체입니다.

### 반환 값

(`number`): 입력 값의 크기입니다.

### 예외

입력 값이 배열, 문자열 또는 객체가 아닌 경우 오류를 던집니다.

## 예시

```typescript
const arr = [1, 2, 3];
const arrSize = size(arr);
// arrSize는 3이에요.

const str = 'hello';
const strSize = size(str);
// strSize는 5이에요.

const obj = { a: 1, b: 2, c: 3 };
const objSize = size(obj);
// objSize는 3이에요.

const emptyArr = [];
const emptyArrSize = size(emptyArr);
// emptyArrSize는 0이에요.

const emptyStr = '';
const emptyStrSize = size(emptyStr);
// emptyStrSize는 0이에요.

const emptyObj = {};
const emptyObjSize = size(emptyObj);
// emptyObjSize는 0이에요.
```
