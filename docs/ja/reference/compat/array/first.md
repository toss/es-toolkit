# first

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列の最初の要素を返します。配列が空の場合は`undefined`を返します。

この関数は配列を受け取り、配列の最初の要素を返します。
配列が空の場合、関数は`undefined`を返します。

## インターフェース

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### パラメータ

- `arr` (`ArrayLike<T> | undefined | null`): 最初の要素を取得するための配列です。

### 戻り値

(`T | undefined`): 配列の最初の要素、または配列が空の場合は`undefined`です。

## 例

```typescript
const emptyArr: number[] = [];
const noElement = head(emptyArr);
// noElement will be undefined
```
