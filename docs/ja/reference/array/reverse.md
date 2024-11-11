# reverse

配列の要素をその場で反転します。

この関数は配列の要素をその場で反転し、元の配列を直接変更します。入力がnullまたはundefinedの場合、その値をそのまま返します。

## インターフェース

```typescript
function reverse<T>(array: T[] | null | undefined): T[] | null | undefined;
```

### パラメータ

- - `array` (`T[] | null | undefined`): 反転する配列

### 戻り値

(`T[] | null | undefined`): 反転された配列、または入力がnullやundefinedの場合はその値を返します。

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
