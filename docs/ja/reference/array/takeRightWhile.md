# takeRightWhile

条件関数が`true`を返す間、配列の末尾から要素を取得します。
条件を満たさない要素が現れると停止します。

## インターフェース

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `shouldContinueTaking` (`(item: T) => boolean`): 各要素と共に呼び出される条件関数です。この関数が`true`を返す間、要素が結果に含まれます。

### 戻り値

(`T[]`): 条件関数が`true`を返す間、配列の末尾から取得した要素を含む新しい配列です。

## 例

```typescript
// [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// []
takeRightWhile([1, 2, 3], n => n > 3);
```

## Lodash 互換性

`es-toolkit/compat` から `takeRightWhile` をインポートすると、Lodash と互換になります。

要素を取得する条件を指定でき、条件が真のような値と評価される限り配列の末尾から要素を取得します。

- **検査関数**: 配列の各要素に適用される検査関数を指定できます。関数が真のような値を返す間、要素を取得し、初めて偽のような値を返すと取得を停止します。
- **部分オブジェクト**: 部分オブジェクトを指定することもできます。指定されたオブジェクトのプロパティと一致する要素を取得します。
- **プロパティ-値ペア**: プロパティと値を指定することもできます。指定されたプロパティが値と一致する要素を取得します。
- **プロパティ名**: 最後にプロパティ名を指定することもできます。そのプロパティが真のような値と評価される要素を取得します。

### インターフェース

```typescript
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeRightWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### 例

```typescript
// 検査関数を使用した例
const array1 = [1, 2, 3, 4, 5];
const result1 = takeRightWhile(array1, x => x > 3);
// result1 は [4, 5] になります。3より大きい要素は真のような値と評価されるため末尾から取得され、最初に3以下の値が見つかると停止します。

// 部分オブジェクトを使用した例
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = takeRightWhile(array2, { a: 3 });
// result2 は [{ a: 3 }] になります。最後のオブジェクトが指定された部分オブジェクトとプロパティが一致するためです。

// プロパティ-値ペアを使用した例
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = takeRightWhile(array3, ['id', 3]);
// result3 は [{ id: 3 }] になります。最後のオブジェクトの id プロパティが値 3 と一致するためです。

// プロパティ名を使用した例
const array4 = [{ isActive: false }, { isActive: true }, { isActive: true }];
const result4 は [{ isActive: true }, { isActive: true }] になります。isActive プロパティが真のような値と評価される要素を末尾から取得するためです。

// 条件がない場合
const array5 = [1, 2, 3];
const result5 = takeRightWhile(array5);
// result5 は [1, 2, 3] になります。条件がない場合、デフォルトで identity 関数が使用されるためです。

// null または undefined 配列の場合
const result6 = takeRightWhile(null);
// result6 は [] になります。入力配列が null または undefined のためです。
```
