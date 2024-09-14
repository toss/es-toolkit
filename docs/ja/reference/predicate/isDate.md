# isDate

`value`がDateオブジェクトであるかどうかを確認します。

## インターフェース

```typescript
function isDate(value: unknown): value is Date;
```

### パラメータ

- `value` (`unknown`): 確認する値です。

### 戻り値

(`value is Date`): `value`がDateオブジェクトであれば`true`を、それ以外の場合は`false`を返します。

## 例

```typescript
const value1 = new Date();
const value2 = '2024-01-01';

console.log(isDate(value1)); // true
console.log(isDate(value2)); // false
```
