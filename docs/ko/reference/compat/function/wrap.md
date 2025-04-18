# wrap

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

Creates a new function that passes the original function or value `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original value in a flexible way.

## 인터페이스

```typescript
function wrap<T extends (...args: unknown[]) => unknown>(
  value: T,
  wrapper: (value: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T>;
function wrap<T, TArgs extends unknown[], TResult>(
  value: T,
  wrapper: (value: T, ...args: TArgs) => TResult
): (...args: TArgs) => TResult;
```

## 예시

```typescript
// Wrap a function
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrap a primitive value
const wrapped = wrap('value', v => `<p>${v}</p>`);
wrapped(); // => "<p>value</p>"
```
