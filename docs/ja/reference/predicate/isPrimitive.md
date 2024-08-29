# isPrimitive

値がJavaScriptのプリミティブ値かどうかを確認します。

JavaScriptのプリミティブ値とは、null、undefined、string、number、symbol、bigintを指します。

## インターフェース

```typescript
function isPrimitive(value: unknown): value is null | undefined | string | number | boolean | symbol | bigint;
```

### パラメータ

- `value` (`unknown`): 検査する値。

### 戻り値

(`value is null | undefined | string | number | boolean | symbol | bigint`): 値がプリミティブ値の場合は `true`、そうでない場合は `false`。

## 例

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive('123'); // true
isPrimitive(false); // true
isPrimitive(true); // true
isPrimitive(Symbol('a')); // true
isPrimitive(123n); // true
isPrimitive({}); // false
isPrimitive(new Date()); // false
isPrimitive(new Map()); // false
isPrimitive(new Set()); // false
isPrimitive([1, 2, 3]); // false
```
