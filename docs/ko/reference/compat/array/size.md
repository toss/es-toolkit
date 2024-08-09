# size

::: info
이 함수는 [lodash와 완전히 호환](../../../compatibility.md)돼요. `es-toolkit/compat` 라이브러리에서 쓸 수 있어요.
:::

주어진 인자의 크기를 반환해요. 

배열, 문자열, 숫자의 크기를 계산하는데요, 배열은 포함된 요소의 숫자를, 문자열은 문자의 숫자를, 객체는 열거 가능한 프로퍼티의 숫자를 반환해요.


## 인터페이스

```typescript
function size<T>(value: T[] | object | string | Map<unknown, T> | Set<T> | null | undefined): number;
```

### 파라미터

- `value` (`T`): 크기를 확인할 배열, 문자열 또는 객체.

### 반환 값

(`number`): 입력 값의 크기.

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
