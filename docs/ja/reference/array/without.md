# without

配列から指定された値を除いた新しい配列を作成します。

値の等価性は[SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero)アルゴリズムを使用して比較されるため、`NaN`との比較も可能です。

## インターフェース

```typescript
function without<T>(array: T[], ...values: T[]): T[];
```

### パラメータ

- `array` (`T[]`): 値を除去する対象の配列。
- `values` (`...T[]`): 除去する値。

### 戻り値

(`T[]`) 指定された値を除いた新しい配列。

## 例

```typescript
import { without } from 'es-toolkit/array';

// 配列から指定された値を除去します
without([1, 2, 3, 4, 5], 2, 4);
// 結果: [1, 3, 5]

// 配列から指定された文字列値を除去します
without(['a', 'b', 'c', 'a'], 'a');
// 結果: ['b', 'c']

// 指定された値が配列に存在しない場合の処理
without([1, 2, 3], 4, 5);
// 結果: [1, 2, 3]

// 異なる型の値を含む場合の処理
without([1, '2', 3, '4'], 2, '4');
// 結果: [1, '2', 3]
```
