# extend

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`source`が持っているプロパティの値を`object`オブジェクトに割り当てます。プロトタイプから継承されたプロパティも含まれます。

`source`と`object`が同じ値を持っているプロパティは上書きされません。

[assignIn](./assignIn.md)の別名です。

## インターフェース

```typescript
function extend<O, S>(object: O, source: S): O & S;
function extend<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function extend<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function extend<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4): O & S1 & S2 & S3;
function extend(object: any, ...sources: any[]): any;
```

### パラメータ

- `object` (`any`): `source`のプロパティ値が割り当てられるオブジェクト。
- `sources` (`...any[]`): `object`に割り当てる値を持つオブジェクトたち。

### 戻り値

(`any`): `source`の値が割り当てられた`object`オブジェクト。

## 例

```typescript
const target = { a: 1 };
const result = extend(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
