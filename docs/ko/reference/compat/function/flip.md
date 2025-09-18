# flip (Lodash 호환성)

::: warning 직접적인 인수 반전을 사용하세요

이 `flip` 함수는 단순히 함수의 인수 순서를 반대로 바꾸는 기능이에요. 대부분의 경우 더 간단한 방법으로 대체할 수 있어요.

대신 더 빠르고 현대적인 `(...args) => func(...args.reverse())`나 직접적인 인수 전달을 사용하세요.

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
