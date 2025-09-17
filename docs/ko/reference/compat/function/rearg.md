# rearg (Lodash 호환성)

::: warning 구조 분해 할당을 사용하세요

이 `rearg` 함수는 인수 순서를 다시 정렬하는 복잡한 로직을 처리해요. 대부분의 경우 더 간단한 방법으로 대체할 수 있어요.

대신 더 빠르고 현대적인 구조 분해 할당이나 전개 연산자를 사용하세요.

:::

`func` 함수에게 주어지는 인자의 순서를 바꾸는 새로운 함수를 생성해요.

`indices` 배열이 나타내는 인덱스에 따라서 인자의 순서가 바뀌어요. 예를 들어서, `indices`가 `[2, 0, 1]` 이라면, 새 함수의 첫 번째 인자는 세 번째 인자로, 두 번째 인자는 첫 번째 인자로, 세 번째 인자는 두 번째 인자로 주어져요.

## 인터페이스

```typescript
function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indices: Array<number | number[]>
): (...args: any[]) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인수를 재배열할 함수예요.
- `indices` (`Array<number | number[]>`): 배열된 인수 인덱스예요.

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 새로운 함수를 반환해요.

## 예시

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const rearrangedGreet = rearg(greet, 1, 0);
console.log(rearrangedGreet('World', 'Hello')); // Output: "Hello, World!"
```
