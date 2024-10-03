# dropWhile

配列の先頭から始めて、条件関数が`false`を返すまで要素を削除します。

この関数は配列の各要素を順に処理し、配列の先頭から条件関数が`false`を返すまで要素を削除します。
残りの要素で構成される新しい配列を返します。

## インターフェース

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を削除する配列。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 要素の削除を続けるかどうかを返す条件関数です。各要素、そのインデックス、および配列とともに呼び出され、`true`を返す間は要素を削除します。

### 戻り値

(`T[]`): 条件関数が`false`を返すまでの残りの要素で構成される新しい配列。

## 例

```typescript
const array = [1, 2, 3, 2, 4, 5];
const result = dropWhile(array, x => x < 3);
// 3未満の要素が見つかるまで要素を削除するので、結果は[3, 2, 4, 5]になります。
```

## Lodash 互換性

`es-toolkit/compat` から `dropWhile` をインポートすると、Lodash と互換になります。
配列から要素を削除する条件を、さまざまな方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。最初に`false`を返す要素が見つかるまで要素を削除します。
- **部分オブジェクト**: 指定されたオブジェクトと部分的に一致しない要素が見つかるまで要素を削除します。
- **プロパティ-値ペア**: 指定されたプロパティと値が一致しない要素が見つかるまで要素を削除します。
- **プロパティ名**: 指定されたプロパティに対して偽と評価される値が見つかるまで要素を削除します。

### インターフェース

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => unknown): T[];
function dropWhile<T>(arr: T[], objectToDrop: Partial<T>): T[];
function dropWhile<T>(arr: T[], propertyToDrop: [keyof T, unknown]): T[];
function dropWhile<T>(arr: readonly T[], propertyToDrop: string): T[];
```

### 例

```typescript
// 検査関数を使用した例
const array1 = [1, 2, 3, 4, 5];
const result1 = dropWhile(array1, x => x < 3);
// result1 は [3, 4, 5] になります。3未満の要素が削除されるためです。

// 部分オブジェクトを使用した例
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = dropWhile(array2, { a: 1 });
// result2 は [{ a: 2 }, { a: 3 }] になります。最初のオブジェクトが提供されたオブジェクトのプロパティと一致するためです。

// プロパティ-値ペアを使用した例
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = dropWhile(array3, ['id', 1]);
// result3 は [{ id: 2 }, { id: 3 }] になります。最初のオブジェクトが id プロパティの値 1 と一致するためです。

// プロパティ名を使用した例
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = dropWhile(array4, 'isActive');
// result4 は [{ isActive: false }] になります。偽の isActive プロパティを持つ要素が見つかるまで要素が削除されるためです。
```
