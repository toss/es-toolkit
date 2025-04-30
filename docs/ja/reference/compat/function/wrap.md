# wrap

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::
与えられた関数 `func` をラップする新しい関数を作成します。
このプロセスでは、元の関数の実行前後に `wrapper` 関数で定義された追加のロジックを適用できます。

関数の代わりに値 `value` が提供された場合、この値は `wrapper` 関数の最初の引数として渡されます。
## インターフェース

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

## 例

```typescript
// Wrap a function
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrap a primitive value
const wrapped = wrap('value', v => `<p>${v}</p>`);
wrapped(); // => "<p>value</p>"
```
