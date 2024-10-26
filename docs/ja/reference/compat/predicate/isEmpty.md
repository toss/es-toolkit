# isEmpty

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が空であるかどうかを確認します。

- 与えられた値が文字列の場合、空の文字列かどうかを確認します。
- 与えられた値が配列、`Map`や`Set`の場合、サイズが0かどうかを確認します。
- 与えられた値が[配列のようなオブジェクト](../compat/predicate/isArrayLike.md)の場合、長さが0かどうかを確認します。
- 与えられた値がオブジェクトの場合、プロパティを持たない空のオブジェクトかどうかを確認します。
- 文字列、ブール値、数値、Bigintのようなプリミティブ値は空と見なされます。

## インターフェース

```typescript
function isEmpty(): true;
function isEmpty(value: string): value is '';
function isEmpty(value: Map<any, any>): boolean;
function isEmpty(value: Set<any>): boolean;
function isEmpty(value: Array<any>): value is [];
function isEmpty<T extends Record<any, any>>(
  value: T | null | undefined
): value is Record<keyof T, never> | null | undefined;
function isEmpty(value: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 確認する値です。

### 戻り値

(`boolean`): 値が空の場合は`true`、そうでない場合は`false`です。
数値配列。

## 例

```typescript
isEmpty(); // true
isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty('hello'); // false
isEmpty([1, 2, 3]); // false
isEmpty({ a: 1 }); // false
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false
```
