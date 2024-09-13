# flattenDeep

ネストされた配列のすべての深さを展開して平坦化します。

JavaScript言語に含まれる[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)を`flat(Infinity)`で呼び出した時と同じように動作しますが、より高速です。

## インターフェース

```typescript
// ネストされた配列を再帰的に展開して、最も内部の要素の型を抽出するユーティリティ型です。
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### パラメータ

- `arr` (`T[]`): 平坦化するネストされた配列です。

### 戻り値

(`Array<ExtractNestedArrayType<T>>`): すべての深さが平坦化された新しい配列です。

## 例

```typescript
const array = [1, [2, [3]], [4, [5, 6]]];

const result = flattenDeep(array);
// [1, 2, 3, 4, 5, 6]を返します。
```
