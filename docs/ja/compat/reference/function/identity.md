# identity (Lodash 互換性)

::: warning `es-toolkit` の `identity` を使用してください
この `identity` 関数は `es-toolkit` のメインライブラリにも同じ機能の関数があります。単に入力値をそのまま返す機能です。

代わりに、より高速で現代的な `es-toolkit` の [identity](../../function/identity.md) を使用してください。
:::

受け取った値をそのまま返します。

```typescript
const result = identity(value);
```

## 使用法

### `identity(value)`

受け取った値をそのまま返したい場合は `identity` を使用してください。主にデフォルト値やプレースホルダー関数として使用され、関数型プログラミングでよく使われます。

```typescript
import { identity } from 'es-toolkit/compat';

// 基本的な使い方
console.log(identity(5)); // 5
console.log(identity('hello')); // 'hello'
console.log(identity({ key: 'value' })); // { key: 'value' }

// 配列の map と一緒に使用（値のコピー）
const numbers = [1, 2, 3, 4, 5];
const copied = numbers.map(identity);
console.log(copied); // [1, 2, 3, 4, 5]

// フィルタリングでデフォルト値として使用
const values = [1, 0, '', 'hello', null, undefined, false, true];
const filtered = values.filter(identity); // 真と評価される値だけを残す
console.log(filtered); // [1, 'hello', true]

// デフォルトの変換関数として使用
function processData(data, transform = identity) {
  return transform(data);
}

console.log(processData('hello')); // 'hello'
console.log(processData('hello', x => x.toUpperCase())); // 'HELLO'
```

ほとんどの場合、より簡単なアロー関数 `x => x` で置き換えることができます:

```typescript
// identity の代わりにアロー関数を使用（推奨）
const copied = numbers.map(x => x);
const filtered = values.filter(x => x);
```

#### パラメータ

- `value` (`T`): 返す値です。

#### 戻り値

(`T`): 受け取った値をそのまま返します。
