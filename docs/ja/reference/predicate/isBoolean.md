# isBoolean

与えられた値が真偽値（boolean）であるかどうかを確認します。

TypeScriptの型ガードとしてよく使用され、パラメータとして与えられた値を`boolean`型に絞り込むことができます。

## インターフェース

```typescript
function isBoolean(x: unknown): x is boolean;
```

### パラメータ

- `x` (`unknown`): 真偽値かどうかをテストする値。

### 戻り値

(`x is boolean`): 値がbooleanの場合はtrue、そうでない場合はfalse。

## 例

```typescript
const value1 = true;
const value2 = 0;
const value3 = 'abc';

console.log(isBoolean(value1)); // true
console.log(isBoolean(value2)); // false
console.log(isBoolean(value3)); // false
```
