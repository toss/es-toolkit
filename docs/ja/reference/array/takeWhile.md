# takeWhile

与えられた条件関数が`true`を返す先頭の要素を含む新しい配列を返します。
条件を満たさない要素が現れると停止します。

## インターフェース

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `shouldContinueTaking` (`(item: T) => boolean`) 各要素と共に呼び出される条件関数です。この関数が`true`を返す間、要素が結果に含まれます。

### 戻り値

(`T[]`) 条件関数が`true`を返す間、先頭から取得した要素を含む新しい配列です。

## 例

```typescript
// [1, 2] を返します
takeWhile([1, 2, 3, 4], x => x < 3);

// [] を返します
takeWhile([1, 2, 3, 4], x => x > 3);
```

## Lodash 互換性

`es-toolkit/compat` から `takeWhile` をインポートすると、Lodash と互換になります。

要素を取得する条件を指定でき、条件が真のような値と評価される限り配列の先頭から要素を取得します。

- **検査関数**: 配列の各要素に適用される検査関数を指定できます。関数が真のような値を返す間、要素を取得し、初めて偽のような値を返すと取得を停止します。
- **部分オブジェクト**: 部分オブジェクトを指定することもできます。指定されたオブジェクトのプロパティと一致する要素を取得します。
- **プロパティ-値ペア**: プロパティと値を指定することもできます。指定されたプロパティが値と一致する要素を取得します。
- **プロパティ名**: 最後にプロパティ名を指定することもできます。そのプロパティが真のような値と評価される要素を取得します。

### インターフェース

```typescript
function takeWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### 例

```typescript
// 検査関数を使用した例
const array1 = [1, 2, 3, 4, 5];
const result1 = takeWhile(array1, x => x < 3);
// result1 は [1, 2] になります。3より小さい要素は真のような値と評価されるため先頭から取得され、最初に3以上の値が見つかると停止します。

// 部分オブジェクトを使用した例
const array2 = [{ a: 3 }, { a: 2 }, { a: 1 }];
const result2 = takeWhile(array2, { a: 3 });
// result2 は [{ a: 3 }] になります。最初のオブジェクトが指定された部分オブジェクトとプロパティが一致するためです。

// プロパティ-値ペアを使用した例
const array3 = [{ id: 3 }, { id: 2 }, { id: 1 }];
const result3 = takeWhile(array3, ['id', 3]);
// result3 は [{ id: 3 }] になります。最初のオブジェクトの id プロパティが値 3 と一致するためです。

// プロパティ名を使用した例
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = takeWhile(array4, 'isActive');
// result4 は [{ isActive: true }, { isActive: true }] になります。isActive プロパティが真のような値と評価される要素を先頭から取得するためです。

// 条件がない場合
const array5 = [1, 2, 3];
const result5 = takeWhile(array5);
// result5 は [1, 2, 3] になります。条件がない場合、デフォルトで identity 関数が使用されるためです。

// null または undefined 配列の場合
const result6 = takeWhile(null);
// result6 は [] になります。入力配列が null または undefined のためです。
```