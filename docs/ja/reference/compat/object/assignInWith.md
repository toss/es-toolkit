# assignInWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`source`が持っているプロパティの値を`object`オブジェクトに割り当てます。プロトタイプから継承されたプロパティも含まれます。各プロパティに割り当てる値を決定するために `getValueToAssign` 関数を提供できます。

`source`と`object`が同じ値を持っているプロパティは上書きされません。

`getValueToAssign` 関数を使用して `object` オブジェクトに割り当てる値を決定できます。この関数が返す値が割り当てられます。値が提供されない場合は、`identity` 関数がデフォルトとして使用されます。

## インターフェース

```typescript
function assignInWith<O, S>(object: O, source: S, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S) => any): O & S;
function assignInWith<O, S1, S2>(object: O, source1: S1, source2: S2, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2) => any): O & S1 & S2;
function assignInWith<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3) => any): O & S1 & S2 & S3;
function assignInWith<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3 | S4) => any): O & S1 & S2 & S3 & S4;
function assignInWith(object: any, ...sources: any[]): any;
```

### パラメータ

- `object` (`any`): `source`のプロパティ値が割り当てられるオブジェクト。
- `sources` (`...any[]`): `object`に割り当てる値を持つオブジェクトたち。
- `getValueToAssign` (`(objValue: any, srcValue: any, key: string, object: O, source: S) => any)`): 各プロパティに割り当てる値を決定する関数。この関数が返す値が対応するプロパティに割り当てられます。

### 戻り値

(`any`): `source`の値が割り当てられた`object`オブジェクト。

## 例

```typescript
const target = { a: 1 };
const result = assignInWith(target, { b: 2 }, { c: 3 }, function(objValue, srcValue) {
  return objValue === undefined ? srcValue : objValue;
});
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```