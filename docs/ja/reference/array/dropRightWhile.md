# dropRightWhile

配列の末尾から始めて、条件関数が`false`を返すまで要素を削除します。

この関数は配列の各要素を走査し、配列の末尾から条件関数が`false`を返すまで要素を削除します。
残りの要素で構成される新しい配列を返します。

## インターフェース

```typescript
function dropRightWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を削除する配列。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 要素の削除を続けるかどうかを返す条件関数です。各要素に対して呼び出され、`true`を返す間は要素を削除します。

### 戻り値

(`T[]`): 条件関数が`false`を返すまでの残りの要素で構成される新しい配列。

## 例

```typescript
const array = [1, 2, 3, 2, 4, 5];
const result = dropRightWhile(array, x => x > 3);
// 3以下の要素に遭遇するまで要素を削除するので、結果は[1, 2, 3, 2]になります。
```

## Lodash 互換性

`es-toolkit/compat` から `dropRightWhile` をインポートすると、Lodash と互換になります。
配列から要素を削除する条件を、さまざまな方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。最初に`false`を返す要素が見つかるまで要素を削除します。
- **部分オブジェクト**: 指定されたオブジェクトと部分的に一致しない要素が見つかるまで要素を削除します。
- **プロパティ-値ペア**: 指定されたプロパティと値が一致しない要素が見つかるまで要素を削除します。
- **プロパティ名**: 指定されたプロパティに対して偽と評価される値が見つかるまで要素を削除します。

### インターフェース

```typescript
function dropRightWhile<T>(arr: ArrayLike<T>, canContinueDropping: (item: T, index: number, arr: T[]) => unknown): T[];
function dropRightWhile<T>(arr: ArrayLike<T>, objectToDrop: Partial<T>): T[];
function dropRightWhile<T>(arr: ArrayLike<T>, propertyToDrop: [keyof T, unknown]): T[];
function dropRightWhile<T>(arr: ArrayLike<T>, propertyToDrop: string): T[];
```

### 例

```typescript
// 検査関数を使用した例
const array1 = [5, 4, 3, 2, 1];
const result1 = dropRightWhile(array1, x => x < 3);
// result1 は [5, 4, 3] になります。3未満の要素が削除されるためです。

// 部分オブジェクトを使用した例
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = dropRightWhile(array2, { a: 3 });
// result2 は [{ a: 1 }, { a: 2 }] になります。最後のオブジェクトが提供されたオブジェクトのプロパティと一致するためです。

// プロパティ-値ペアを使用した例
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = dropRightWhile(array3, ['id', 3]);
// result3 は [{ id: 1 }, { id: 2 }] になります。最後のオブジェクトが id プロパティの値 3 と一致するためです。

// プロパティ名を使用した例
const array4 = [{ isActive: false }, { isActive: true }, { isActive: true }];
const result4 = dropRightWhile(array4, 'isActive');
// result4 は [{ isActive: false }] になります。偽の isActive プロパティを持つ要素が見つかるまで要素が削除されるためです。
```
