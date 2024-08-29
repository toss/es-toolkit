# unzip

2次元配列を引数として受け取り、各配列内の配列から同じ位置にある要素を集めて新しい配列として返します。

## インターフェース

```typescript
type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T>;
```

### パラメータ

- `zipped` (`Array<[...T]>`): 結合された要素の配列です。

### 戻り値

(`Unzip<T>`): 内部配列の同じ位置にある要素を集めて作成された新しい配列です。

## 例

```typescript
unzip([
  ['a', true, 1],
  ['b', false, 2],
]);
// 戻り値: [['a', 'b'], [true, false], [1, 2]]
```
