# valuesIn

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトから値を取得します。プロトタイプから継承されたものも含みます。

- 値がオブジェクトでない場合、オブジェクトに変換されます。
- [配列のようなオブジェクト](../predicate/isArrayLike.md)は配列のように扱われます。
- 一部のインデックスが欠けている疎な配列は密な配列のように扱われます。
- 値が `null` または `undefined` の場合、空の配列を返します。
- プロトタイプオブジェクトを処理する際には、`constructor` プロパティは結果から除外されます。

## インターフェース

```typescript
function valuesIn<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function valuesIn<T>(arr: ArrayLike<T>): T[];
function valuesIn<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### パラメータ

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 値を調べるためのオブジェクト。

### 戻り値

(`T[]`): プロパティ値の配列。

## 例

```typescript
const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // => [1, 2, 3]
```
