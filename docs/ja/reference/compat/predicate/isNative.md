# isNative

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`がネイティブ関数かどうかを確認します。

ネイティブ関数とは、JavaScriptエンジン自体に実装されている関数を意味します。例えば、`Array.prototype.map`、`Object.keys`、`Function.prototype.bind`などがあります。

## インターフェース

```typescript
function isNative(value: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 確認する値

### 戻り値

(`boolean`): `value`がネイティブ関数の場合は`true`、そうでない場合は`false`を返します。

## 例

```typescript
import { isNative } from 'es-toolkit/compat';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
