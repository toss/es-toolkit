# flatten

ネストされた配列を指定した深さまで平坦化します。

JavaScriptに組み込まれている[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)と同じように動作しますが、より高速です。

## インターフェース

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): Array<FlatArray<T[], D>>;
```

### パラメータ

- `arr` (`T[]`): 平坦化する入れ子の配列です。
- `depth` (`D`): 平坦化する深さです。デフォルト値は1です。

### 戻り値

(`Array<FlatArray<T[], D>>`): 指定された深さまで平坦化された新しい配列です。

## 例

```typescript
const array = [1, [2, 3], [4, [5, 6]]];

const result1 = flatten(array);
// [1, 2, 3, 4, [5, 6]]を返します。

const result2 = flatten(array, 1);
// [1, 2, 3, 4, [5, 6]]を返します。

const result3 = flatten(array, 2);
// [1, 2, 3, 4, 5, 6]を返します。
```
