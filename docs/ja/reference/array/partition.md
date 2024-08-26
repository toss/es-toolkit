# partition

配列を2つに分割するのに使用できる関数です。

この関数は、パラメータとして配列と`true`/`false`を返す関数を受け取ります。
この関数は2つの配列からなるタプルを返します。最初の配列は関数が`true`を返す要素で構成されます。
2番目の配列は関数が`false`を返す要素で構成されます。

## インターフェース

```typescript
function partition<T>(arr: T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]];
```

### パラメータ

- `arr` (`T[]`): 2つに分割する配列。
- `isInTruthy` (`(value: T) => boolean`): 配列の要素が最初の配列に含まれるか、2番目の配列に含まれるかを決定する関数。`true`を返すと最初の配列に、`false`を返すと2番目の配列に含まれます。

### 戻り値

(`[T[], T[]]`): 2つの配列で構成されるタプル。最初の配列は`isInTruthy`が`true`を返した要素で、2番目の配列は`false`を返した要素で構成されます。

## 例

```typescript
const array = [1, 2, 3, 4, 5];
const is偶数 = x => x % 2 === 0;
const [偶数, 奇数] = partition(array, is偶数);
// 偶数は[2, 4]、奇数は[1, 3, 5]になります。
```
