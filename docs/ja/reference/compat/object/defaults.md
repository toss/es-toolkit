# defaults

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

対象オブジェクト `object` に対して、特定のプロパティが `undefined` にならないようにデフォルト値を設定します。
`undefined` であるか、`Object.prototype` から継承された値に対してデフォルト値を設定します。

デフォルト値を設定するために、複数のオブジェクトをパラメータとして提供できます。これらのオブジェクトは左から右の順に適用されます。
あるプロパティに値が指定されると、同じプロパティに対する後続の値は無視されます。

注意: この関数は最初のパラメータ `object` を変更します。変更したくない場合は、[toDefaulted](./toDefaulted.md) 関数を使用してください。

## インターフェース

```typescript
function defaults<T extends object>(object: T): NonNullable<T>;
function defaults<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaults<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function defaults<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### パラメータ

- `object` (`T`): 対象オブジェクト。
- `sources` (`S[]`): デフォルト値を表すオブジェクト。

### 戻り値

(`object`): `sources`で指定されたデフォルト値を持つように値が埋められた対象オブジェクト。

## 例

```typescript
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: null }, { a: 1 }); // { a: null }
defaults({ a: undefined }, { a: 1 }); // { a: 1 }
```
