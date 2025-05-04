# wrap

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 함수 `func`를 감싸는 새로운 함수를 만들어요. 
이 과정에서 원본 함수의 실행 전후에 `wrapper` 함수에 정의된 추가 로직을 적용할 수 있어요.

만약 함수 대신 값 `value`가 주어진다면, 이 값은 `wrapper` 함수의 첫 번째 인자로 전달돼요.

## 인터페이스

```typescript
function wrap<F extends (...args: unknown[]) => unknown>(
  func: F,
  wrapper: (value: F, ...args: Parameters<F>) => ReturnType<F>
): F;
function wrap<T, A extends unknown[], R>(
  value: T,
  wrapper: (value: T, ...args: A) => R
): (...args: A) => R;
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
