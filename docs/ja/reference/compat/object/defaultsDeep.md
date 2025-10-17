# defaultsDeep (Lodash 互換性)

::: warning 分割代入と `Object.assign()` を使用してください

この `defaultsDeep` 関数は、ネストされたオブジェクトの再帰的なマージと循環参照の処理により、複雑で遅く動作します。

代わりに、より高速で現代的な分割代入と `Object.assign()` を使用してください。

:::

ネストされたオブジェクトに再帰的にデフォルト値を設定します。

```typescript
const result = defaultsDeep(target, ...sources);
```

## 参照

### `defaultsDeep(target, ...sources)`

ネストされたオブジェクトの `undefined` プロパティに再帰的にデフォルト値を設定したい場合は、`defaultsDeep` を使用してください。`defaults` と似ていますが、ネストされたオブジェクトもマージします。

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

// ネストされたオブジェクトのデフォルト値設定
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// 戻り値: { a: { b: 2, c: 3 }, d: 4 }

// undefined プロパティのみがデフォルト値で埋められます
defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } });
// 戻り値: { a: { b: 1 } }

// null 値はそのまま保持されます
defaultsDeep({ a: null }, { a: { b: 1 } });
// 戻り値: { a: null }
```

複数のソースオブジェクトを渡して、デフォルト値を段階的に適用できます。

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { a: { d: 4 }, e: 5 });
// 戻り値: { a: { b: 2, c: 3, d: 4 }, e: 5 }
```

#### パラメータ

- `target` (`any`): デフォルト値を設定する対象オブジェクトです。
- `...sources` (`any[]`): デフォルト値を提供するソースオブジェクトです。

#### 戻り値

(`any`): デフォルト値が再帰的に設定されたオブジェクトを返します。最初の引数 `target` が変更されます。
