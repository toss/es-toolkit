# toUpper

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された値を文字列に変換し、その後大文字に変換します。様々なタイプの入力値に対応し、まず文字列に変換してから処理を行います。

## インターフェース

```typescript
function toUpper(value?: unknown): string;
```

### パラメータ

- `value` (`unknown`): 大文字に変換する値。省略した場合は空の文字列を返します。

### 戻り値

`string`: 入力値を文字列に変換した後、大文字に変換した結果。

## 例

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper('--foo-bar--'); // '--FOO-BAR--' を返す
toUpper('Hello World'); // 'HELLO WORLD' を返す
toUpper(null); // '' を返す
toUpper([1, 2, 3]); // '1,2,3' を返す
toUpper(123); // '123' を返す
toUpper(); // '' を返す
```
