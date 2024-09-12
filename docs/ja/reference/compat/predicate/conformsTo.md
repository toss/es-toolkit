# conformsTo

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`source`のプロパティが持つ条件関数を`target`が持つプロパティに適用し、すべての条件が真であれば`true`を、そうでなければ`false`を返します。

この関数を部分的に適用すると、[conforms](./conforms.md)関数と同じ動作をします。

## インターフェース

```typescript
function conformsTo(target: Record<PropertyKey, any>, source: Record<PropertyKey, (value: any) => boolean>): boolean;
```

### パラメータ

- `target` (`Record<PropertyKey, any>`): 検査するオブジェクトです。
- `source` (`Record<PropertyKey, (value: any) => boolean>`): 適合させるべきプロパティ条件のオブジェクトです。

### 戻り値

(`boolean`): `object` が条件に適合する場合は `true` を、そうでない場合は `false` を返します。

## 例

```typescript
const object = { a: 1, b: 2 };
const source = {
  a: n => n > 0,
  b: n => n > 1,
};

console.log(conformsTo(object, source)); // => true

const source2 = {
  a: n => n > 1,
  b: n => n > 1,
};

console.log(conformsTo(object, source2)); // => false
```
