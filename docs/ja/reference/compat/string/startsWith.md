# startsWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列が指定された文字列で始まるかどうかを確認します。検索を開始するインデックスを指定することができます。

## インターフェース

```typescript
function startsWith(str: string, target: string, position: number = 0): boolean;
```

### パラメータ

- `str` (`string`): 検索する文字列。
- `target` (`string`): 開始時に一致すべき文字列。
- `position` (`number`, オプション): 検索を開始するインデックス。

### 戻り値

(`boolean`): 文字列が指定された文字列で始まるかどうか。

## 例

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith('fooBar', 'foo'); // true を返す
startsWith('fooBar', 'Bar'); // false を返す
startsWith('fooBar', 'abcdef'); // false を返す
startsWith('fooBar', 'Bar', 3); // true を返す
```
