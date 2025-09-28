# isObject (Lodash 互換性)

::: warning es-toolkitの [isObject](../../predicate/isObject.md)を使用してください

この `isObject` 関数はnullチェックと複雑なオブジェクト判別により遅く動作します。

代わりにより高速で現代的な `es-toolkit` の [isObject](../../predicate/isObject.md) を使用してください。

:::

値がオブジェクトかどうかを確認します。

```typescript
const result = isObject(value);
```

## 参照

### `isObject(value)`

値がオブジェクトかどうかを確認したい場合に `isObject` を使用してください。JavaScript では配列、関数、オブジェクト、正規表現、Date などがすべてオブジェクトとして扱われます。

```typescript
import { isObject } from 'es-toolkit/compat';

// 一般オブジェクト
isObject({});
// Returns: true

// 配列もオブジェクト
isObject([1, 2, 3]);
// Returns: true

// 関数もオブジェクト
isObject(() => {});
// Returns: true

// Dateもオブジェクト
isObject(new Date());
// Returns: true

// nullはオブジェクトでない
isObject(null);
// Returns: false

// プリミティブ型はオブジェクトでない
isObject('string');
// Returns: false

isObject(123);
// Returns: false
```

#### パラメータ

- `value` (`unknown`): オブジェクトかどうかを確認する値です。

#### 戻り値

(`value is object`): 値がオブジェクトの場合は `true`、そうでなければ `false` を返します。
