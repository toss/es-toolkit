# toPath

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

深いキー文字列をパスセグメントの配列に変換します。

この関数は、深いキーを表す文字列（例：`'a.b.c'` や `'a[b][c]'`）を受け取り、各パスセグメントを表す文字列の配列に分解します。

## インターフェース

```typescript
function toPath(deepKey: string): string[];
```

### パラメータ

- `deepKey` (`string`): 変換する深いキー文字列。

### 戻り値

(`string[]`): 各パスセグメントを表す文字列の配列。

## 例

```typescript
toPath('a.b.c'); // ['a', 'b', 'c'] を返します
toPath('a[b][c]'); // ['a', 'b', 'c'] を返します
toPath('.a.b.c'); // ['', 'a', 'b', 'c'] を返します
toPath('a["b.c"].d'); // ['a', 'b.c', 'd'] を返します
toPath(''); // [] を返します
toPath('.a[b].c.d[e]["f.g"].h'); // ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h'] を返します 数値配列。
```
