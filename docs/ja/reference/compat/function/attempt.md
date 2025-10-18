# attempt (Lodash 互換性)

::: warning `es-toolkit` の [`attempt`](../../util/attempt.md) 関数または try-catch ブロックを使用してください

この `attempt` 関数は、エラーと戻り値を区別せずに返すため、使用時に混乱する可能性があります。

代わりに、より直接的で明確な [`attempt`](../../util/attempt.md) 関数または try-catch ブロックを使用してください。

:::

関数を実行し、エラーが発生した場合にエラーオブジェクトを返す関数です。

```typescript
const result = attempt(func, ...args);
```

## 参照

### `attempt(func, ...args)`

関数を安全に実行したい場合は `attempt` を使用してください。エラーが発生する可能性のある関数を実行する際に、プログラムがクラッシュするのを防ぎ、エラーを戻り値として処理するのに便利です。

```typescript
import { attempt } from 'es-toolkit/compat';

// 基本的な使用法 - 成功する場合
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // 5

// エラーが発生する場合
const errorResult = attempt(() => {
  throw new Error('何かがうまくいきませんでした');
});
console.log(errorResult); // Error: 何かがうまくいきませんでした
```

try-catch ブロックの使用との違いは次のとおりです。

```typescript
// attempt を使用
import { attempt } from 'es-toolkit/compat';

const result = attempt(riskyFunction, arg1, arg2);
if (result instanceof Error) {
  console.log('エラーが発生しました:', result.message);
} else {
  console.log('結果:', result);
}

// try-catch を使用 (より直接的)
try {
  const result = riskyFunction(arg1, arg2);
  console.log('結果:', result);
} catch (error) {
  console.log('エラーが発生しました:', error.message);
}
```

#### パラメータ

- `func` (`Function`): 実行する関数です。
- `args` (`...any[]`): 関数に渡す引数です。

#### 戻り値

(`ReturnType<F> | Error`): 関数が成功した場合は戻り値を、エラーが発生した場合は Error オブジェクトを返します。
