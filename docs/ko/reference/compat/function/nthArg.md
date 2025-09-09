# nthArg

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
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
