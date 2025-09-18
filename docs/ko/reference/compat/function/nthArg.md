# nthArg (Lodash 호환성)

::: warning 배열 인덱싱을 사용하세요

이 `nthArg` 함수는 단순히 특정 인덱스의 인수를 반환하는 기능이에요. 대부분의 경우 더 간단한 배열 인덱싱으로 대체할 수 있어요.

대신 더 빠르고 현대적인 `(...args) => args[n]`나 구조 분해 할당을 사용하세요.

:::

지정된 인덱스 `n`에서 인수를 검색하는 함수를 생성해요.

`n`이 음수이면, 끝에서부터 인수가 반환돼요.

## 인터페이스

```typescript
function nthArg(n: number): (...args: any[]) => unknown;
```

### 파라미터

- `n` (`number`): 검색할 인수의 인덱스.
  음수이면 인수 목록의 끝에서부터 계산해요.

### 반환 값

(`(args: any[]) => unknown`): 지정된 인덱스의 인수를 반환하는 함수.

## 예시

```typescript
const getSecondArg = nthArg(1);
const result = getSecondArg('a', 'b', 'c');
console.log(result); // => 'b'

const getLastArg = nthArg(-1);
const result = getLastArg('a', 'b', 'c');
console.log(result); // => 'c'
```
