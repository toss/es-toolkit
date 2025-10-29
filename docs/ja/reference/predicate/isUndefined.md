# isUndefined

与えられた値が `undefined` かどうかを確認します。

```typescript
const result = isUndefined(value);
```

## 参照

### `isUndefined(value)`

値が `undefined` かどうかを確認したい場合は `isUndefined` を使用してください。変数が初期化されているかどうかや、オプショナルプロパティが存在するかどうかを確認する際に便利です。

```typescript
import { isUndefined } from 'es-toolkit/predicate';

// undefined の値
console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true

let uninitialized: string;
console.log(isUndefined(uninitialized)); // true

// undefined でない値
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(0)); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false
```

#### パラメータ

- `value` (`unknown`): undefined かどうかを確認する値です。

#### 戻り値

(`value is undefined`): 値が undefined の場合は `true`、それ以外の場合は `false` を返します。
