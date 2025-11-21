# defaults (Lodash 互換性)

::: warning `Object.assign()` を使用してください

この `defaults` 関数は、`undefined` と `Object.prototype` から継承されたプロパティを特別に処理する複雑なロジックにより、動作が遅くなります。

代わりに、より高速で現代的な `Object.assign()` を使用してください。

:::

オブジェクトの `undefined` プロパティをデフォルト値で埋めます。

```typescript
const result = defaults(object, source);
```

## 使用法

### `defaults(object, ...sources)`

オブジェクトの `undefined` プロパティや `Object.prototype` から継承されたプロパティにデフォルト値を設定したい場合は、`defaults` を使用してください。複数のデフォルト値オブジェクトを渡すことができ、左から右の順に適用されます。

```typescript
import { defaults } from 'es-toolkit/compat';

// デフォルト値で undefined プロパティを埋める
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 });
// 戻り値: { a: 1, b: 2, c: 3 }

// undefined プロパティのみがデフォルト値で埋められます
defaults({ a: undefined }, { a: 1 });
// 戻り値: { a: 1 }

// null 値はそのまま保持されます
defaults({ a: null }, { a: 1 });
// 戻り値: { a: null }
```

プロパティがすでに値を持っている場合、デフォルト値で上書きされません。

```typescript
import { defaults } from 'es-toolkit/compat';

defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
// 戻り値: { a: 1, b: 2, c: 3 }
```

#### パラメータ

- `object` (`any`): デフォルト値を設定する対象オブジェクトです。
- `...sources` (`any[]`): デフォルト値を提供するソースオブジェクトです。

#### 戻り値

(`any`): デフォルト値が設定されたオブジェクトを返します。最初の引数 `object` が変更されます。
