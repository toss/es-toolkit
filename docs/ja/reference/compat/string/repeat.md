# repeat

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された回数だけ、与えられた文字列を繰り返して返します。

文字列が空であるか、カウントが0の場合、空の文字列を返します。

## インターフェース

```typescript
function repeat(str: string, n: number): string
```

### パラメータ

- `str` (`string`): 繰り返す文字列。
- `n` (`number`): 繰り返したい回数。

### 戻り値

(`string`): `n`回繰り返された文字列。

## Examples

```javascript
repeat('abc', 0); // ''
repeat('abc', 2); // 'abcabc'
```
