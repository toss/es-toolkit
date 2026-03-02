# isFunction (Lodash互換性)

::: warning es-toolkitの[isFunction](../../predicate/isFunction.md)を使用してください
この`isFunction`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isFunction](../../predicate/isFunction.md)を使用してください。
:::

値が関数かどうかを確認します。

```typescript
const result = isFunction(value);
```

## 使用法

### `isFunction(value)`

値が関数かどうかを型安全に確認したい場合は`isFunction`を使用してください。TypeScriptでタイプガードとしても動作します。

```typescript
import { isFunction } from 'es-toolkit/compat';

// 通常の関数
isFunction(function () {}); // true
isFunction(() => {}); // true

// 内蔵関数とコンストラクタ
isFunction(Array.prototype.slice); // true
isFunction(Proxy); // true
isFunction(Int8Array); // true

// 非同期関数とジェネレータ関数
isFunction(async function () {}); // true
isFunction(function* () {}); // true

// 他の型はfalse
isFunction('function'); // false
isFunction({}); // false
isFunction([]); // false
isFunction(null); // false
isFunction(undefined); // false
isFunction(123); // false
```

#### パラメータ

- `value` (`unknown`): 関数かどうかを確認する値です。

#### 戻り値

(`value is (...args: any[]) => any`): 値が関数の場合は`true`、そうでない場合は`false`を返します。
