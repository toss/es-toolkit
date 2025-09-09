# nthArg

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定されたインデックス `n` にある引数を取得する関数を作成します。

`n` が負の場合、末尾から数えて n 番目の引数が返ります。文字列。

## インターフェース

```typescript
function nthArg(n: number): (...args: any[]) => unknown;
```

### パラメータ

- `n` (`number`): 取得する引数のインデックス。
  負の場合、引数リストの末尾から数えます。文字列。

### 戻り値

(`(args: any[]) => unknown`): 指定されたインデックスの引数を返す新しい関数です。文字列。

## 例

```typescript
const getSecondArg = nthArg(1);
const result = getSecondArg('a', 'b', 'c');
console.log(result); // => 'b'

const getLastArg = nthArg(-1);
const result = getLastArg('a', 'b', 'c');
console.log(result); // => 'c'
```
