# castArray

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が配列でない場合、配列としてキャストします。

## インターフェース

```typescript
function castArray<T>(value?: T | T[]): T[];
```

### パラメータ

- `value` (`T | readonly T[]`): 配列にキャストされる値。

### 戻り値

(`T[]`): 入力値が配列でない場合はその値を含む配列、元々配列の場合はその配列。

## 例

```typescript
const arr1 = castArray(1);
// Returns: [1]

const arr2 = castArray([1]);
// Returns: [1]

const arr3 = castArray({ a: 1 });
// Returns: [{'a': 1}]

const arr4 = castArray(null);
// Returns: [null]

const arr5 = castArray(undefined);
// Returns: [undefined]

const arr6 = castArray();
// Returns: []
```
