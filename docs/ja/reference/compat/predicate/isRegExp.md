# isRegExp (Lodash 互換性)

::: warning es-toolkitの [isRegExp](../../predicate/isRegExp.md)を使用してください

この `isRegExp` 関数はLodash互換性のための関数ですが、単純な型確認です。

代わりにより高速で現代的な `es-toolkit` の [isRegExp](../../predicate/isRegExp.md) を使用してください。

:::

値が正規表現かどうかを確認します。

```typescript
const result = isRegExp(value);
```

## 使用法

### `isRegExp(value)`

値が正規表現かどうかを型安全に確認したい場合に `isRegExp` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 正規表現
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
isRegExp(/[a-z]+/g); // true
isRegExp(/pattern/gi); // true

// その他の型はfalse
isRegExp('/abc/'); // false (文字列)
isRegExp('pattern'); // false (文字列)
isRegExp({}); // false (オブジェクト)
isRegExp([]); // false (配列)
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(123); // false (数値)
```

正規表現文字列と実際の正規表現オブジェクトを区別します。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 正規表現 vs 正規表現文字列
isRegExp(/test/); // true
isRegExp('/test/'); // false
isRegExp('\\d+'); // false
isRegExp('/\\d+/g'); // false

// 様々な正規表現フラグ
isRegExp(/test/i); // true (大文字小文字無視)
isRegExp(/test/g); // true (グローバル検索)
isRegExp(/test/m); // true (複数行)
isRegExp(/test/gim); // true (すべてのフラグの組み合わせ)
```

動的に生成された正規表現も認識します。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// RegExp コンストラクタで作成した正規表現
const dynamicRegex = new RegExp('\\d{3}-\\d{4}', 'g');
isRegExp(dynamicRegex); // true

// 文字列を通じて生成した正規表現
const pattern = 'hello';
const flags = 'gi';
const regex = new RegExp(pattern, flags);
isRegExp(regex); // true
```

#### パラメータ

- `value` (`any`): 正規表現かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が正規表現の場合は `true`、そうでなければ `false` を返します。
