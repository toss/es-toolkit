# wrap (Lodash 互換性)

::: warning 高階関数を使用してください

この `wrap` 関数は、単に関数をラップする機能です。ほとんどの場合、よりシンプルな高階関数やクロージャを使用する方が明確です。

代わりに、より高速で現代的なクロージャや直接的な関数定義を使用してください。

:::

与えられた値または関数をラップする新しい関数を作成します。

```typescript
const wrappedFunc = wrap(value, wrapper);
```

## 参照

### `wrap(value, wrapper)`

値や関数に追加のロジックを適用したい場合は、`wrap` を使用してください。元の値を最初の引数として受け取るラッパー関数を通じて、新しい動作を定義できます。

```typescript
import { wrap } from 'es-toolkit/compat';

// 関数をラップしてログ機能を追加
const greet = (name: string) => `Hi, ${name}`;
const loggedGreet = wrap(greet, (originalFunc, name) => {
  const result = originalFunc(name);
  console.log(`[LOG] ${result}`);
  return result;
});

loggedGreet('Alice'); // コンソールに "[LOG] Hi, Alice" を出力し、"Hi, Alice" を返します
```

関数でない値もラップできます。値はラッパー関数の最初の引数として渡されます。

```typescript
import { wrap } from 'es-toolkit/compat';

// 文字列を HTML タグでラップする関数を作成
const htmlWrapper = wrap('Hello World', (text, tag) => `<${tag}>${text}</${tag}>`);
console.log(htmlWrapper('h1')); // "<h1>Hello World</h1>"

// 数値を計算に使用する関数を作成
const calculate = wrap(10, (baseValue, multiplier) => baseValue * multiplier);
console.log(calculate(5)); // 50
```

より複雑な関数ラッピングの例です。

```typescript
import { wrap } from 'es-toolkit/compat';

const add = (a: number, b: number) => a + b;

// パフォーマンス測定を追加した関数を作成
const timedAdd = wrap(add, (originalAdd, a, b) => {
  const start = Date.now();
  const result = originalAdd(a, b);
  const end = Date.now();
  console.log(`実行時間: ${end - start}ms`);
  return result;
});

timedAdd(3, 7); // 実行時間をコンソールに出力し、10 を返します
```

#### パラメータ

- `value` (`T`): ラップする値または関数です。
- `wrapper` (`(value: T, ...args: U[]) => V`): 元の値を最初の引数として受け取り、追加のロジックを適用する関数です。

#### 戻り値

(`(...args: U[]) => V`): ラッパー関数が適用された新しい関数を返します。
