# rearg

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
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
