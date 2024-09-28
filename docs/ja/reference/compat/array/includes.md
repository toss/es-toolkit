# includes

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された値が、与えられた配列、オブジェクト、または文字列に含まれているかどうかを確認します。

比較演算にはSameValueZeroを使用します。

## インターフェース

```typescript
function includes<T>(arr: T[], item: T, fromIndex?: number): boolean;
function includes<T extends Record<string, any>>(obj: T, value: T[keyof T], fromIndex?: number): boolean;
function includes(str: string, substr: string, fromIndex?: number): boolean;
```

### パラメータ

- `source` (`T[] | Record<string, any> | string`): 検索する配列、オブジェクト、または文字列。
- `target` (`T`): 検索する値。
- `fromIndex` (`number`): 検索を開始するインデックス。負の値の場合は `source` の末尾からの位置。

### 戻り値

(`boolean`): 検索する値が `source` に含まれていれば `true`、そうでなければ `false`。

## 例

```typescript
includes([1, 2, 3], 2); // true
includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
includes('hello world', 'world'); // true
includes('hello world', 'test'); // false
```
