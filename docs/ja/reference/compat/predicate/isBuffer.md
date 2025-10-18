# isBuffer (Lodash互換性)

::: warning es-toolkitの[isBuffer](../../predicate/isBuffer.md)を使用してください
この`isBuffer`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isBuffer](../../predicate/isBuffer.md)を使用してください。
:::

値がBufferインスタンスかどうかを確認します。

```typescript
const result = isBuffer(value);
```

## 参照

### `isBuffer(value)`

値がBufferインスタンスかどうかを型安全に確認したい場合は`isBuffer`を使用してください。Node.js環境でBufferオブジェクトを扱う際に便利です。TypeScriptでタイプガードとしても動作します。

```typescript
import { isBuffer } from 'es-toolkit/compat';

// Bufferインスタンスの確認
const buffer = Buffer.from('hello');
isBuffer(buffer); // true

// 他の型はfalse
isBuffer('hello'); // false
isBuffer([1, 2, 3]); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer({}); // false
isBuffer(null); // false
isBuffer(undefined); // false
```

#### パラメータ

- `value` (`unknown`): Bufferインスタンスかどうかを確認する値です。

#### 戻り値

(`boolean`): 値がBufferインスタンスの場合は`true`、そうでない場合は`false`を返します。
