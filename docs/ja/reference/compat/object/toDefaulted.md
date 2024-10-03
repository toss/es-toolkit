# toDefaulted

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された`object`をもとに、特定のプロパティに対して`undefined`を返さないようにデフォルト値を設定した新しいオブジェクトを返します。
`undefined`または`Object.prototype`から継承された値に対してデフォルト値が設定されます。

デフォルト値を設定するために、複数のオブジェクトをパラメータとして提供できます。これらのオブジェクトは左から右の順に適用されます。
あるプロパティに値が指定されると、同じプロパティに対する後の値は無視されます。

注意: この関数は新しいオブジェクトを生成します。`object`を修正したい場合は、[defaults](./defaults.md)関数を使用してください。

## インターフェース

```typescript
function toDefaulted<T extends object>(object: T): NonNullable<T>;
function toDefaulted<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function toDefaulted<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### パラメータ

- `object` (`T`): デフォルト値を指定するオブジェクト。
- `sources` (`S[]`): ソースオブジェクト。

### 戻り値

(`object`): `sources` で指定されたデフォルト値を持つ新しく生成されたオブジェクト。

## 例

```typescript
toDefaulted({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: null }, { a: 1 }); // { a: null }
toDefaulted({ a: undefined }, { a: 1 }); // { a: 1 }
```
