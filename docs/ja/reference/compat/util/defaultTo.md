# defaultTo

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`null`、`undefined`、`NaN` に対してデフォルト値を返します。

## インターフェース

```typescript
function defaultTo<T>(value: T | null | undefined, defaultValue?: T): T;
function defaultTo(value?: unknown, defaultValue?: unknown): any;
```

### パラメータ

- `value` (`unknown`): チェックする値。
- `defaultValue` (`unknown`): 最初の値が `null`、`undefined`、または `NaN` の場合に返されるデフォルト値。

### 戻り値

(`unknown`): 最初の値またはデフォルト値のいずれか。

## 例

```typescript
defaultTo(null, 'default'); // returns 'default'
defaultTo(undefined, 42); // returns 42
defaultTo(NaN, 0); // returns 0
defaultTo('actual', 'default'); // returns 'actual'
defaultTo(123, 0); // returns 123
```
