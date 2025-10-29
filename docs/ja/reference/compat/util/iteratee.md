# iteratee (Lodash 互換性)

::: warning 直接的な関数やプロパティアクセスを使用してください

この `iteratee` 関数は複雑な型変換と様々なケース処理により遅く動作します。

代わりに、より高速で現代的な直接的な関数やプロパティアクセスを使用してください。

:::

要素から値を返す関数を作ります。

```typescript
const getter = iteratee(source);
```

## 参照

### `iteratee(value?)`

コレクションの要素から値を抽出したり条件を確認する関数を作りたい時に`iteratee`を使用してください。提供する引数の型によって異なる動作を実行します。

```typescript
import { iteratee } from 'es-toolkit/compat';

// 関数: 与えられた関数をそのまま返す
const func = iteratee(object => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func);
// Returns: [1, 2, 3]

// プロパティ名: そのプロパティの値を返す関数
const getA = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(getA);
// Returns: [1, 2, 3]

// オブジェクト: 与えられたオブジェクトと一致するかを確認する関数
const matchesObj = iteratee({ a: 1 });
[
  { a: 1, b: 2 },
  { a: 2, b: 3 },
  { a: 1, c: 4 },
].find(matchesObj);
// Returns: { a: 1, b: 2 }

// プロパティ-値ペア: そのプロパティが特定の値と一致するかを確認する関数
const matchesProperty = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(matchesProperty);
// Returns: { a: 1 }

// nullや引数なし: 要素をそのまま返す関数
const identity = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(identity);
// Returns: [{ a: 1 }, { a: 2 }, { a: 3 }]
```

引数の種類による動作:

- **関数**: 与えられた関数をそのまま返します。
- **プロパティ名**: 要素から与えられたプロパティの値を返します。
- **プロパティ-値ペア**: 要素のプロパティが与えられた値と一致するかどうかを示すブール値を返します。
- **部分オブジェクト**: 要素が部分オブジェクトのプロパティと値に一致するかどうかを示すブール値を返します。
- **nullや引数なし**: 要素をそのまま返す関数を返します。

#### パラメータ

- `value` (`symbol | number | string | object | null | ((...args: any[]) => unknown)`, オプション): イテレータに変換する値です。デフォルト値は`null`です。

#### 戻り値

(`(...args: any[]) => any`): 新しいイテレータ関数を返します。
