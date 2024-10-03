# eq

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

2つの値の間で`SameValueZero`比較を行い、それらが同等であるかどうかを判定します。

## インターフェース

```typescript
function eq(value?: unknown, other?: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 比較する値。
- `other` (`unknown`): 比較するもう一方の値。

### 戻り値

(`boolean`): 値が同等であれば`true`を返し、そうでなければ`false`を返します。

## 例

```typescript
eq(1, 1); // true
eq(0, -0); // true
eq(NaN, NaN); // true
eq('a', Object('a')); // false
```
