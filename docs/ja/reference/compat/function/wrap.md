# wrap

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

Creates a new function that passes the original function `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original function in a flexible way.

## インターフェース

```typescript
function wrap<T extends (...args: unknown[]) => unknown>(value: T, wrapper: (fn: T, ...args: Parameters<T>) => ReturnType<T>): (...args: Parameters<T>) => ReturnType<T>;
```

### パラメータ

- `value` (`T`): The original function to wrap.
- `wrapper` (`(fn: T, ...args: Parameters<T>) => ReturnType<T>`): A function that receives the original function and its arguments, and returns the result.

### 戻り値

(`null`): A new function with the same signature as `value`, but wrapped by `wrapper`.

## 例

```typescript
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (fn, name) => `[LOG] ${fn(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrapping to modify arguments
const multiply = (a: number, b: number) => a * b;
const doubleFirst = wrap(multiply, (fn, a, b) => fn(a * 2, b));
doubleFirst(3, 4); // => 24
```