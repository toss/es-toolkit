# isString (Lodash 互換性)

::: warning `typeof` 演算子を使用してください

この `isString` 関数はString オブジェクトラッパーの処理により複雑です。

代わりにより簡単で現代的な `typeof value === 'string'` を使用してください。

:::

値が文字列かどうかを確認します。

```typescript
const result = isString(value);
```

## 参照

### `isString(value)`

値が文字列かどうかを型安全に確認したい場合に `isString` を使用してください。プリミティブ文字列とStringオブジェクトラッパーの両方を確認します。TypeScript で型ガードとしても動作します。

```typescript
import { isString } from 'es-toolkit/compat';

// プリミティブ文字列
isString('hello'); // true
isString(''); // true
isString('123'); // true

// String オブジェクトラッパー
isString(new String('hello')); // true
isString(new String('')); // true

// その他の型はfalse
isString(123); // false
isString(true); // false
isString(null); // false
isString(undefined); // false
isString({}); // false
isString([]); // false
isString(Symbol('test')); // false
```

文字列と似て見える他の型と区別します。

```typescript
import { isString } from 'es-toolkit/compat';

// 文字列 vs 数値
isString('123'); // true
isString(123); // false

// 文字列 vs 真偽値
isString('true'); // true
isString(true); // false

// 文字列 vs null/undefined
isString('null'); // true
isString(null); // false
isString('undefined'); // true
isString(undefined); // false
```

#### パラメータ

- `value` (`unknown`): 文字列かどうかを確認する値です。

#### 戻り値

(`value is string`): 値が文字列の場合は `true`、そうでなければ `false` を返します。
