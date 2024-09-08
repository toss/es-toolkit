# conforms

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`source`のプロパティが持つ条件関数を`target`が持つプロパティに適用し、すべての条件が真であれば`true`を、そうでなければ`false`を返す関数を生成します。

生成された関数は部分的に適用された[conformsTo](./conformsTo.md)と同じです。

## インターフェース

```typescript
function conforms(source: Record<PropertyKey, (value: any) => boolean>): (object: Record<PropertyKey, any>) => boolean;
```

### パラメータ

- `source` (`Record<PropertyKey, (value: any) => boolean>`): 準拠するプロパティ述語のオブジェクトます。

### 戻り値

(`(object: Record<PropertyKey, any>) => boolean`): 新しい仕様関数を返します。

## 例

```typescript
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const predicates = { a: isPositive, b: isEven };
const conform = conforms(predicates);

console.log(conform({ a: 2, b: 4 })); // true
console.log(conform({ a: -1, b: 4 })); // false
console.log(conform({ a: 2, b: 3 })); // false
console.log(conform({ a: 0, b: 2 })); // false
```
