# matchesProperty

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられたオブジェクトのプロパティが `source` の形状と値に一致するかどうかを確認する関数を作成します。

返される関数は `target` オブジェクトを受け取り、指定されたプロパティの値が `source` と一致するかどうかを確認します。

## インターフェース

```typescript
function matchesProperty(property: PropertyKey | PropertyKey[], source: unknown): (target?: unknown) => boolean;
```

### パラメータ

- `property` (`number | string | symbol | Array<number | string | symbol>`): オブジェクトのプロパティを表すパス。プロパティ名、プロパティ名の配列、または深いパスを表す文字列を使用できます。
- `source` (`unknown`): オブジェクトのプロパティと比較する値。

### 戻り値

(`(target: unknown) => boolean`): `target` オブジェクトを受け取り、指定されたプロパティの値を取得し、`source` と一致するかどうかを確認する関数。一致する場合は `true`、そうでない場合は `false` を返します。

## 例

```typescript
// 単純なプロパティ名
const checkName = matchesProperty('name', 'Alice');
console.log(checkName({ name: 'Alice' })); // true
console.log(checkName({ name: 'Bob' })); // false

// プロパティの配列
const checkNested = matchesProperty(['address', 'city'], '東京');
console.log(checkNested({ address: { city: '東京' } })); // true
console.log(checkNested({ address: { city: '大阪' } })); // false

// 深いパス
const checkNested = matchesProperty('address.city', '東京');
console.log(checkNested({ address: { city: '東京' } })); // true
console.log(checkNested({ address: { city: '大阪' } })); // false
```
