# flip (Lodash 互換性)

::: warning 直接的な引数の反転を使用してください
この `flip` 関数は、単に関数の引数の順序を逆にするだけです。ほとんどの場合、より簡単な方法で置き換えることができます。

代わりに、より高速で現代的な `(...args) => func(...args.reverse())` や直接的な引数の渡し方を使用してください。
:::

与えられた関数の引数の順序を逆にする関数を作成します。

```typescript
const flippedFunc = flip(func);
```

## 使用法

### `flip(func)`

引数の順序を逆にして新しい関数を作成したい場合は `flip` を使用してください。元の関数が最初の引数から順に受け取っていたものを、最後の引数から受け取るように変更します。

```typescript
import { flip } from 'es-toolkit/compat';

function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const flipped = flip(greet);
flipped('John', 'Hello'); // 'Hello, John!'

// 元の関数は (greeting, name) の順序ですが
// 反転した関数は (name, greeting) の順序で受け取ります
```

複数の引数を受け取る関数でも、すべての引数の順序が逆になります。

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('1', '2', '3', '4'); // ['4', '3', '2', '1']
```

#### パラメータ

- `func` (`F`): 引数の順序を逆にする関数です。

#### 戻り値

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 引数の順序が逆になった新しい関数を返します。
