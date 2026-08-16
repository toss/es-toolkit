# cloneWith (Lodash 互換性)

::: warning カスタムロジックの実装を推奨します

この `cloneWith` 関数は、複雑なカスタマイザー関数の処理により相対的に遅くなります。

代わりに、`clone` とカスタムロジックを直接実装する方法を使用してください。

:::

カスタマイザー関数を使用してオブジェクトの浅いコピーを作成します。

```typescript
const cloned = cloneWith(value, customizer);
```

## 使用法

### `cloneWith(value, customizer?)`

コピーの動作をカスタマイズしたい場合は、`cloneWith`を使用してください。カスタマイザー関数が特定の値のコピー方法を制御します。

```typescript
import { cloneWith } from 'es-toolkit/compat';

// 基本的な使用法(カスタマイザーなし)
const obj = { a: 1, b: 'hello' };
const cloned = cloneWith(obj);
// Returns: { a: 1, b: 'hello' } (新しいオブジェクトインスタンス)

// 数値の変換
const obj2 = { a: 1, b: 2, c: 'text' };
const cloned2 = cloneWith(obj2, value => {
  const obj = {};
  for (const key in value) {
    const val = value[key];
    if (typeof val === 'number') {
      obj[key] = val * 2;
    } else {
      obj[key] = val;
    }
  }
  return obj;
});
// Returns: { a: 2, b: 4, c: 'text' }

// 配列要素の変換
const arr = [1, 2, 3];
const clonedArr = cloneWith(arr, value => {
  return value.map(x => x + 10);
});
// Returns: [11, 12, 13]

// 特定のタイプの処理
const complex = {
  date: new Date('2023-01-01'),
  number: 42,
  text: 'hello',
};
const clonedComplex = cloneWith(complex, value => {
  const obj = {};
  for (const key in value) {
    const val = value[key];
    if (val instanceof Date) {
      obj[key] = val.toISOString();
    } else if (typeof val === 'string') {
      obj[key] = val.toUpperCase();
    } else {
      obj[key] = val;
    }
  }
  return obj;
});
// Returns: { date: '2023-01-01T00:00:00.000Z', number: 42, text: 'HELLO' }
```

カスタマイザーが `undefined` を返す場合、デフォルトのコピー動作が使用されます。

```typescript
import { cloneWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
const cloned = cloneWith(obj, value => {
  // すべての値に対してundefinedを返す = デフォルトのコピー
  return undefined;
});
// Returns: { a: 1, b: { c: 2 } } (cloneと同じ結果)
```

#### パラメータ

- `value` (`T`): コピーする値です。
- `customizer` (`function`, オプション): コピー方法を決定する関数です。`(value: any) => any` の形式です。

#### 戻り値

(`T`): カスタマイザーによって処理された浅いコピーを返します。
