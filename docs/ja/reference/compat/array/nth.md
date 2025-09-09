# nth

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`array`のインデックス`n`にある要素を取得します。 `n`が負の場合、最後からn番目の要素が返されます。

## インターフェース

```typescript
function nth<T>(array: ArrayLike<T> | null | undefined, n: number): T | undefined;
```

### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 照会する配列。数値配列。
- `n` (`number`): 返す要素のインデックス。数値。

### 戻り値

(`T | undefined`): `array`のn番目の要素を返します。

## 例

```typescript
nth([1, 2, 3], 1); // => 2
nth([1, 2, 3], -1); // => 3
```
