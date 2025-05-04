# isNative

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
import { isNative } from 'es-toolkit/predicate';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
