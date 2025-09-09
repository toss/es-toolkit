# assign

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

複数の`source`オブジェクトのプロパティを`object`オブジェクトに割り当てます。

`source`オブジェクトのプロパティが`object`オブジェクトの対応するプロパティと同じ値の場合、上書きされません。

## インターフェース

```typescript
function assign<O, S>(object: O, source: S): O & S;
function assign<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function assign<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function assign<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): O & S1 & S2 & S3 & S4;
function assign(object: any, ...sources: any[]): any;
```

### パラメータ

- `object` (`any`): `source`のプロパティ値が割り当てられるオブジェクト。
- `sources` (`...any[]`): `object`に割り当てる値を持つオブジェクトたち。

### 戻り値

(`any`): `source`の値が割り当てられた`object`オブジェクト。

## 例

```typescript
const target = { a: 1 };
const result = assign(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
