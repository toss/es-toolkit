# isSymbol

値が`symbol`かどうかを確認します。

この関数はTypeScriptの型述語としても機能し、引数の型を`symbol`に狭めます。

## インターフェース

```typescript
function isSymbol(value: unknown): value is symbol;
```

### パラメータ

- `value` (`unknown`) 確認する値ます。

### 戻り値

(`value is symbol`): `value`がシンボルであれば`true`を返し、それ以外の場合は`false`を返します。

## 例

```typescript
import { isSymbol } from 'es-toolkit/predicate';

isSymbol(Symbol('a')); // true
isSymbol(Symbol.for('a')); // true
isSymbol(Symbol.iterator); // true

isSymbol(null); // false
isSymbol(undefined); // false
isSymbol('123'); // false
isSymbol(false); // false
isSymbol(123n); // false
isSymbol({}); // false
isSymbol([1, 2, 3]); // false
```
