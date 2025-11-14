# isSymbol (Lodash 互換性)

::: warning `typeof` 演算子を使用してください

この `isSymbol` 関数はSymbol オブジェクトラッパーの処理により複雑です。

代わりにより簡単で現代的な `typeof value === 'symbol'` を使用してください。

:::

値がシンボル（symbol）かどうかを確認します。

```typescript
const result = isSymbol(value);
```

## 使用法

### `isSymbol(value)`

値がシンボルかどうかを型安全に確認したい場合に `isSymbol` を使用してください。プリミティブシンボルとSymbolオブジェクトラッパーの両方を確認します。TypeScript で型ガードとしても動作します。

```typescript
import { isSymbol } from 'es-toolkit/compat';

// プリミティブシンボル
isSymbol(Symbol('test')); // true
isSymbol(Symbol.for('global')); // true
isSymbol(Symbol.iterator); // true

// Symbol オブジェクトラッパー
isSymbol(Object(Symbol('test'))); // true

// その他の型はfalse
isSymbol('symbol'); // false
isSymbol(123); // false
isSymbol(true); // false
isSymbol(null); // false
isSymbol(undefined); // false
isSymbol({}); // false
isSymbol([]); // false
```

様々な内蔵シンボルも正しく認識します。

```typescript
import { isSymbol } from 'es-toolkit/compat';

// よく知られたシンボル
isSymbol(Symbol.iterator); // true
isSymbol(Symbol.asyncIterator); // true
isSymbol(Symbol.toStringTag); // true
isSymbol(Symbol.hasInstance); // true
isSymbol(Symbol.toPrimitive); // true

// グローバルシンボル
isSymbol(Symbol.for('myGlobalSymbol')); // true

// ユーザー定義シンボル
const mySymbol = Symbol('mySymbol');
isSymbol(mySymbol); // true
```

#### パラメータ

- `value` (`unknown`): シンボルかどうかを確認する値です。

#### 戻り値

(`value is symbol`): 値がシンボルの場合は `true`、そうでなければ `false` を返します。
