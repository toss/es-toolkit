# flip

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 함수의 파라미터 순서를 반대로 바꾸는 새로운 함수를 생성해요.

## 인터페이스

```typescript
function flip<F extends (...args: any[]) => any>(func: F): (...args: Reversed<Parameters<F>>) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 파라미터 순서를 반대로 할 함수.

### 반환 값

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 파라미터 순서가 반대로 된 함수.

## 예시

```typescript
function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('a', 'b', 'c', 'd'); // => ['d', 'c', 'b', 'a']
```
