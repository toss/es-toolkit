# isNull

値が`null`であるかを確認します。

```typescript
const result = isNull(value);
```

## 参照

### `isNull(value)`

値が正確に`null`であるかを確認したい場合は、`isNull`を使用してください。厳密等価（`===`）を使用して`null`のみを認識し、undefinedは認識しません。

```typescript
import { isNull } from 'es-toolkit/predicate';

// null値
console.log(isNull(null)); // true

// null以外の値
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
console.log(isNull(false)); // false
console.log(isNull([])); // false
console.log(isNull({})); // false
```

TypeScriptの型ガードとしても使用できます。

```typescript
function processValue(value: string | null | undefined) {
  if (isNull(value)) {
    // valueはnull型に絞り込まれます
    console.log('値がnullです');
  } else {
    // valueはstring | undefined型に絞り込まれます
    console.log('値がnullではありません：', value);
  }
}
```

`isNull`は[`isNil`](./isNil.md)と異なり、`undefined`を`false`として扱います。

```typescript
import { isNil, isNull } from 'es-toolkit/predicate';

console.log(isNull(undefined)); // false
console.log(isNil(undefined)); // true
```

#### パラメータ

- `value` (`unknown`): `null`であるかを確認する値です。

#### 戻り値

(`value is null`): 値が`null`の場合は`true`、そうでない場合は`false`を返します。
