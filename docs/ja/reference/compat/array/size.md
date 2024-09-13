# size

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた引数のサイズを返します。

配列、文字列、数値のサイズを計算します。配列は含まれる要素の数を、文字列は文字の数を、オブジェクトは列挙可能なプロパティの数を返します。

## インターフェース

```typescript
function size<T>(value: T[] | object | string | Map<unknown, T> | Set<T> | null | undefined): number;
```

### パラメータ

- `value` (`T`): サイズを確認する配列、文字列、またはオブジェクト。

### 戻り値

(`number`): 入力値のサイズ。

## 例

```typescript
const arr = [1, 2, 3];
const arrSize = size(arr);
// arrSize は 3 です。

const str = 'hello';
const strSize = size(str);
// strSize は 5 です。

const obj = { a: 1, b: 2, c: 3 };
const objSize = size(obj);
// objSize は 3 です。

const emptyArr = [];
const emptyArrSize = size(emptyArr);
// emptyArrSize は 0 です。

const emptyStr = '';
const emptyStrSize = size(emptyStr);
// emptyStrSize は 0 です。

const emptyObj = {};
const emptyObjSize = size(emptyObj);
// emptyObjSize は 0 です。
```
