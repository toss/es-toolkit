# attempt

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 인수로 함수를 실행해요. 오류가 발생하지 않았다면, 반환 값을 그대로 반환해요. 오류가 발생했다면, 오류를 반환해요.

잡은 오류가 `Error`의 인스턴스가 아니면, 새 `Error`로 감싸요.

## 인터페이스

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### 파라미터

- `func` (`F`): 실행할 함수.
- `args` (`...Parameters<F>`): 함수에 전달할 인수.

### 반환 값

(`ReturnType<F> | Error`): 성공했다면, 함수의 반환 값. 오류가 발생했다면 `Error`.

## 예시

```typescript
// Example 1: Successful execution
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // Output: 5

// Example 2: Function throws an error
const errorResult = attempt(() => {
  throw new Error('Something went wrong');
});
console.log(errorResult); // Output: Error: Something went wrong

// Example 3: Non-Error thrown
const nonErrorResult = attempt(() => {
  throw 'This is a string error';
});
console.log(nonErrorResult); // Output: Error: This is a string error
```
