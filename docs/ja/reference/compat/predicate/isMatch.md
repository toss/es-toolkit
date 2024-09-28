# isMatch

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`target` が `source` の形状と値に一致するかどうかを確認します。オブジェクト、配列、`Map`、`Set` の深い比較をサポートしています。

## インターフェース

```typescript
function isMatch(target: unknown, source: unknown): boolean;
```

### パラメータ

- `target` (`unknown`): 形状と値が一致するかどうかを確認する値。
- `source` (`unknown`): 確認する形状と値を持つオブジェクト。

### 戻り値

(`boolean`): `target` が `source` の形状と値に一致する場合は `true`。そうでない場合は `false`。

## 例

### オブジェクトの一致

```typescript
isMatch({ a: 1, b: 2 }, { a: 1 }); // true
```

### 配列の一致

```typescript
isMatch([1, 2, 3], [1, 2, 3]); // true
isMatch([1, 2, 2, 3], [2, 2]); // true
isMatch([1, 2, 3], [2, 2]); // false
```

### `Map` の一致

```typescript
const targetMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const sourceMap = new Map([['key1', 'value1']]);
isMatch(targetMap, sourceMap); // true
```

### `Set` の一致

```javascript
const targetSet = new Set([1, 2, 3]);
const sourceSet = new Set([1, 2]);
isMatch(targetSet, sourceSet); // true
```
