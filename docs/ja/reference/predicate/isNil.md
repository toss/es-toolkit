# isNil

与えられた値がnullまたはundefinedであるかを確認します。

値が`null`または`undefined`の場合は`true`を返し、そうでない場合は`false`を返します。

TypeScriptの型ガードとしてよく使用され、パラメータとして与えられた値を`null`または`undefined`型に絞り込むことができます。

## インターフェース

```typescript
function isNil(x: unknown): x is null | undefined;
```

### パラメータ

- `x` (`unknown`): `null` または `undefined` かどうかを確認する値。

### 戻り値

(`x is null | undefined`): 値が `null` または `undefined` であれば `true`、そうでなければ `false` を返します。

## 例

```typescript
import { isNil } from 'es-toolkit/predicate';

const value1 = null;
const value2 = undefined;
const value3 = 42;
const result1 = isNil(value1); // true
const result2 = isNil(value2); // true
const result3 = isNil(value3); // false
```
