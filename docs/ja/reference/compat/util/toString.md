# toString

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value` を文字列に変換します。

`null` および `undefined` の場合は空の文字列が返されます。
`-0` の符号は保持されます。

## インターフェース

```typescript
function toString(value?: unknown): string;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`string`): 変換された文字列を返します。
文字列。

## 例

```typescript
toString(null); // returns ''
toString(undefined); // returns ''
toString(-0); // returns '-0'
toString([1, 2, -0]); // returns '1,2,-0'
toString([Symbol('a'), Symbol('b')]); // returns 'Symbol(a),Symbol(b)'
```
