# join

배열의 모든 요소를 지정된 구분자로 연결하여 하나의 문자열로 만듭니다.

배열이 비어 있으면 빈 문자열을 반환합니다. 구분자는 기본적으로 콤마(,)입니다.

## 인터페이스

```typescript
function join<T>(array: readonly T[], separator: string = ','): string;
```

### 파라미터

- `array` (`T[]`): 연결할 요소들을 포함하는 배열.
- `separator` (`string = ','`): 요소들 사이에 삽입될 문자열. 지정하지 않으면 기본값으로 콤마(,)가 사용됩니다.

### 반환 값

(`string`) 배열의 모든 요소를 구분자로 연결한 문자열. 배열이 비어 있으면 빈 문자열을 반환합니다.

## 예시

```typescript
const fruits = ['Apple', 'Banana', 'Cherry'];
const result = join(fruits);
// result will be 'Apple,Banana,Cherry'

const numbers = [1, 2, 3];
const formattedNumbers = join(numbers, ' - ');
// formattedNumbers will be '1 - 2 - 3'

const emptyArray = [];
const emptyResult = join(emptyArray);
// emptyResult will be ''
```
