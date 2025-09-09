# values

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`object` の列挙可能なプロパティ値を返します。

オブジェクトではない値はオブジェクトに変換されます。

## インターフェース

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### パラメータ

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 問い合わせるオブジェクト。

### 戻り値

(`T[]`): プロパティ値の配列。

## 例

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
