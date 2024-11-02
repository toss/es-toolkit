# padStart

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列を指定された長さになるまで、先頭に文字を追加して拡張します。

すでに文字列が十分に長いか、先頭に追加する文字が空文字列の場合は、何も動作しません。

## インターフェース

```typescript
function padStart(str: string, length = 0, chars = ' '): string;
```

### パラメータ

- `str` (`string`): 長さを拡張する文字列。
- `length` (`number`): 拡張したい長さ。デフォルト値は `0`。
- `char` (`string`): 長さを拡張する際に追加する文字。デフォルト値は `' '`。

### 戻り値

指定された長さまで拡張され、先頭に文字が追加された文字列。

## 例

```javascript
padStart('hello', 10, 'a'); // 'aaaaahello'
padStart('hello', 3, 'a'); // 'hello'
padStart('hello', 5, ''); // 'hello'
```
