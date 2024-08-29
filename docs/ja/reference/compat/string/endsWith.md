# endsWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列が指定された文字列で終わるかどうかを確認します。検索を終了するインデックスを指定することができます。

## インターフェース

```typescript
function endsWith(str: string, target: string, position: number = 0): boolean;
```

### パラメータ

- `str` (`string`): 検索する文字列。
- `target` (`string`): 終わりに一致すべき文字列。
- `position` (`number`, オプション): 検索を終了するインデックス。

### 戻り値

(`boolean`): 文字列が指定された文字列で終わるかどうか。

## 例

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith('fooBar', 'foo'); // false を返す
endsWith('fooBar', 'Bar'); // true を返す
endsWith('fooBar', 'abcdef'); // false を返す
endsWith('fooBar', 'Bar', 3); // false を返す
```
