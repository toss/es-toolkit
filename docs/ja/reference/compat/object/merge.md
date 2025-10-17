# merge (Lodash 互換性)

::: warning `es-toolkit`の`merge`を使用してください

この `merge` 関数は、内部的に複雑な `mergeWith` 関数を呼び出すため相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`merge`](../../object/merge.ts)を使用してください。

:::

複数のオブジェクトを深くマージして1つのオブジェクトにします。

```typescript
const result = merge(target, ...sources);
```

## 参照

### `merge(object, ...sources)`

ターゲットオブジェクトに1つ以上のソースオブジェクトを深くマージします。ネストされたオブジェクトと配列は再帰的にマージされます。ソースオブジェクトのプロパティが`undefined`の場合、ターゲットオブジェクトの既存の値は上書きされません。オブジェクト設定のマージやデフォルト値の適用に便利です。

```typescript
import { merge } from 'es-toolkit/compat';

// 基本的なオブジェクトのマージ
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// 結果: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// 配列のマージ
const obj1 = { arr: [1, 2] };
const obj2 = { arr: [3, 4] };
const merged = merge(obj1, obj2);
// 結果: { arr: [3, 4] } (配列は置き換えられる)

// 複数のオブジェクトをマージ
const base = { a: 1 };
const ext1 = { b: 2 };
const ext2 = { c: 3 };
const ext3 = { d: 4 };
const combined = merge(base, ext1, ext2, ext3);
// 結果: { a: 1, b: 2, c: 3, d: 4 }

// ネストされたオブジェクトのマージ
const config = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  features: { auth: true }
};
const overrides = {
  api: { timeout: 10000, retries: 3 },
  features: { analytics: true }
};
const finalConfig = merge(config, overrides);
// 結果: {
//   api: { url: 'https://api.example.com', timeout: 10000, retries: 3 },
//   features: { auth: true, analytics: true }
// }
```

ターゲットオブジェクトは変更されるため、元を保持したい場合は空のオブジェクトを使用してください。

```typescript
import { merge } from 'es-toolkit/compat';

const original = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 } };

// 元を保持
const result = merge({}, original, source);
// original は変更されない
```

#### パラメータ

- `object` (`any`): マージ先となるターゲットオブジェクトです。このオブジェクトは変更されます。
- `...sources` (`any[]`): マージするソースオブジェクトです。

#### 戻り値

(`any`): マージされたターゲットオブジェクトを返します。
