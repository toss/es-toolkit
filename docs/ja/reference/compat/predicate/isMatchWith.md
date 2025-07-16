# isMatchWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた比較関数を使用して、`target` と `source` の深い比較による一致を確認します。比較関数を使用して値の一致を細かく制御できます。

この関数は2つの値を再帰的に走査し、各プロパティ-値のペアごとにカスタム比較関数を呼び出します。比較関数がブール値を返す場合はその結果を直接使用し、`undefined` を返す場合は [isMatch](./isMatch.md) で使用される既定の比較関数を使用します。

データ型によって値の比較方法が異なります：

- **オブジェクト**: `source` のすべてのプロパティが `target` に存在し一致する場合は `true`
- **配列**: `source` 配列のすべての要素が `target` 配列で見つかる場合は `true` (順序は関係なし)
- **Map**: `source` Map のすべてのキー-値ペアが `target` Map に存在し一致する場合は `true`
- **Set**: `source` Set のすべての要素が `target` Set で見つかる場合は `true`
- **関数**: 厳密等価演算子(`===`)で比較し、関数にプロパティがある場合はオブジェクトとして比較
- **プリミティブ値**: 厳密等価演算子(`===`)で比較

特別なケース：

- `source` が空のオブジェクト、配列、Map、Set の場合、常にどの `target` に対しても `true` を返します
- 自己参照オブジェクトは内部スタックを使用して無限再帰を防ぎます

## インターフェース

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  compare?: (objValue: any, srcValue: any, key: PropertyKey, object: any, source: any, stack?: Map<any, any>) => unknown
): boolean;
```

### パラメータ

- `target` (`unknown`): 一致を確認する値
- `source` (`unknown`): 一致を比較するパターン/テンプレート
- `compare` (`function`, オプション): オプションのカスタム比較関数。以下の引数を受け取ります:
  - `objValue`: 現在のパスの target 値
  - `srcValue`: 現在のパスの source 値
  - `key`: 比較中のプロパティキーまたは配列インデックス
  - `object`: target の親オブジェクト/配列
  - `source`: source の親オブジェクト/配列
  - `stack`: 循環参照検出に使用される内部 Map
    一致する場合は `true`、一致しない場合は `false`、デフォルトの動作を継続する場合は `undefined` を返す必要があります

### 戻り値

(`boolean`): オブジェクトが一致する場合は `true`、そうでなければ `false` を返します。

## 例

### カスタム比較関数なしの比較

```typescript
// Basic matching without custom comparator
isMatchWith({ a: 1, b: 2 }, { a: 1 }); // true
isMatchWith([1, 2, 3], [1, 3]); // true
```

### 大文字小文字を区別しない文字列の比較

```typescript
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // Use default behavior for non-strings
};

isMatchWith({ name: 'JOHN', age: 30 }, { name: 'john' }, caseInsensitiveCompare); // true
```

### 数値範囲を比較するカスタム比較関数の定義

```typescript
// Custom comparison for range matching
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true
```
