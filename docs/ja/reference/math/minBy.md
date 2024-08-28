# minBy

与えられた配列内の要素の中から、条件に従って最小値を持つ最初の要素を選択する関数です。

配列が空でない場合、条件に従って最小値を持つ最初の要素を返し、空の場合は `undefined` を返します。

## インターフェース

```typescript
function minBy<T>(elements: T[], selector: (element: T) => number): T;
```

### パラメータ

- `elements`: 検索する要素の配列。
- `selector`: 要素を受け取り、オブジェクトのプロパティを返す関数。

### 戻り値

関数の最小値を持つ配列の最初の要素。配列が空の場合は `undefined` を返します。

### 例

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 結果: { a: 1 }
minBy([], x => x.a); // 結果: undefined
```
