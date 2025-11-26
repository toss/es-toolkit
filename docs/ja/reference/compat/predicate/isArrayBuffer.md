# isArrayBuffer (Lodash互換性)

::: warning es-toolkitの[isArrayBuffer](../../predicate/isArrayBuffer.md)を使用してください
この`isArrayBuffer`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isArrayBuffer](../../predicate/isArrayBuffer.md)を使用してください。
:::

値がArrayBufferかどうかを確認します。

```typescript
const result = isArrayBuffer(value);
```

## 使用法

### `isArrayBuffer(value)`

値がArrayBufferかどうかを型安全に確認したい場合は`isArrayBuffer`を使用してください。TypeScriptでタイプガードとしても動作します。

```typescript
import { isArrayBuffer } from 'es-toolkit/compat';

// ArrayBufferの確認
const buffer = new ArrayBuffer(16);
isArrayBuffer(buffer); // true

// 他の型はfalse
isArrayBuffer(new Array()); // false
isArrayBuffer(new Map()); // false
isArrayBuffer({}); // false
isArrayBuffer('hello'); // false
isArrayBuffer(123); // false
isArrayBuffer(null); // false
isArrayBuffer(undefined); // false
```

#### パラメータ

- `value` (`unknown`): ArrayBufferかどうかを確認する値です。

#### 戻り値

(`boolean`): 値がArrayBufferの場合は`true`、そうでない場合は`false`を返します。
