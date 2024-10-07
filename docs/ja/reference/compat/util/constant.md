# constant

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

常に`value`を返す新しい関数を作成します。

## インターフェース

```typescript
function constant(): () => undefined;
function constant<T>(value: T): () => T;
```

### パラメータ

- `value` (`T`): 新しい関数から返される値。

### 戻り値

(`() => T | undefined`): 新しい定数関数。

## 例

```typescript
const object = { a: 1 };
const returnsObject = constant(object);

returnsObject(); // => { a: 1 }
returnsObject() === object; // => true
```
