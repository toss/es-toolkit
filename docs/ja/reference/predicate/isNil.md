# isNil

値が`null`または`undefined`であるかを確認します。

```typescript
const result = isNil(value);
```

## 参照

### `isNil(value)`

値が`null`や`undefined`であるかを確認したい場合は、`isNil`を使用してください。

```typescript
import { isNil } from 'es-toolkit/predicate';

// null または undefined の値
console.log(isNil(null)); // true
console.log(isNil(undefined)); // true

// その他の値
console.log(isNil(0)); // false
console.log(isNil('')); // false
console.log(isNil(false)); // false
console.log(isNil([])); // false
console.log(isNil({})); // false
```

TypeScriptの型ガードとしても使用できます：

```typescript
function processValue(value: string | null | undefined) {
  if (isNil(value)) {
    // valueはnull | undefined型に絞り込まれます
    console.log('値が空です');
  } else {
    // valueはstring型に絞り込まれます
    console.log(value.toUpperCase());
  }
}
```

#### パラメータ

- `value` (`unknown`): `null`または`undefined`であるかを確認する値です。

#### 戻り値

(`value is null | undefined`): 値が`null`または`undefined`の場合は`true`、そうでない場合は`false`を返します。
