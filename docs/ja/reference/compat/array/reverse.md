# reverse

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列の要素をその場で反転します。

この関数は配列の要素をその場で反転し、元の配列を直接変更します。入力が`null`または`undefined`の場合、その値をそのまま返します。

## インターフェース

```typescript
function reverse<T>(array: T[]): T[];
```

### パラメータ

- - `array` (`T[]`): 反転する配列。

### 戻り値

(`T[]`): 反転された配列。

## ## 例

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] （元の配列が変更されます）

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
