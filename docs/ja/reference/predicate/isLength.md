# isLength

値が有効な配列の長さかどうかを確認します。

```typescript
const result = isLength(value);
```

## 使用法

### `isLength(value)`

値が有効な配列の長さかどうかを確認したい場合に `isLength` を使用してください。有効な長さは 0 以上で `Number.MAX_SAFE_INTEGER` 以下の整数である必要があります。

```typescript
import { isLength } from 'es-toolkit/predicate';

// 有効な長さ
console.log(isLength(0)); // true
console.log(isLength(42)); // true
console.log(isLength(Number.MAX_SAFE_INTEGER)); // true

// 無効な長さ
console.log(isLength(-1)); // false (負の数)
console.log(isLength(1.5)); // false (小数)
console.log(isLength(Number.MAX_SAFE_INTEGER + 1)); // false (安全でない整数)
console.log(isLength('42')); // false (文字列)
console.log(isLength(null)); // false (null)
```

TypeScript で型ガードとしても使用できます。

```typescript
function processLength(value: unknown) {
  if (isLength(value)) {
    // これで value は number 型に絞り込まれます
    console.log(value.toFixed(2));
  }
}
```

#### パラメータ

- `value` (`unknown`): 有効な長さかどうかを確認する値です。

#### 戻り値

(`value is number`): 値が有効な長さの場合は `true`、そうでなければ `false` を返します。
