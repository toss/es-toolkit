# head

배열의 첫 번째 요소를 반환해요.

이 함수는 배열을 입력받아 배열의 첫 번째 요소를 반환해요. 배열이 비어 있는 경우, 함수는 `undefined`를 반환해요.

## 인터페이스

```typescript
function head<T>(arr: [T, ...T[]]): T;
function head<T>(arr: T[]): T | undefined;
```

### 파라미터

- `arr` (`T[]`): 첫 번째 요소를 가져올 배열이에요.

### 반환 값

(`T | undefined`): 배열의 첫 번째 요소, 배열이 비어 있는 경우 `undefined`를 반환해요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = head(arr1);
// firstElement1은 1이에요.

const arr2: string[] = [];
const firstElement2 = head(arr2);
// firstElement2는 undefined예요.

const arr3 = ['a', 'b', 'c'];
const firstElement3 = head(arr3);
// firstElement3는 'a'예요.

const arr4 = [true, false, true];
const firstElement4 = head(arr4);
// firstElement4는 true예요.

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = head(arr5);
// firstElement5는 1이에요.
```
