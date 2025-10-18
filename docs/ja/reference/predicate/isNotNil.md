# isNotNil

値が`null`でも`undefined`でもないかを確認します。

```typescript
const result = isNotNil(value);
```

## 参照

### `isNotNil(value)`

値が`null`や`undefined`でないかを確認したい場合は、`isNotNil`を使用してください。配列から`null`や`undefined`の値をフィルタリングする際に特に便利です。

```typescript
import { isNotNil } from 'es-toolkit/predicate';

// 基本的な使用例
console.log(isNotNil(42)); // true
console.log(isNotNil('hello')); // true
console.log(isNotNil([])); // true
console.log(isNotNil({})); // true

console.log(isNotNil(null)); // false
console.log(isNotNil(undefined)); // false

// 配列のフィルタリングで便利です
const mixedArray = [1, null, 'hello', undefined, true, 0];
const filteredArray = mixedArray.filter(isNotNil);
// filteredArrayは[1, 'hello', true, 0]になります（nullとundefinedが除外されます）
```

TypeScriptの型ガードとしても使用できます。

```typescript
function processItems(items: (string | null | undefined)[]) {
  // isNotNilでフィルタリングすると型がstring[]に絞り込まれます
  const validItems = items.filter(isNotNil);

  validItems.forEach(item => {
    // itemはstring型として保証されます
    console.log(item.toUpperCase());
  });
}
```

#### パラメータ

- `value` (`T | null | undefined`): `null`や`undefined`でないかを確認する値です。

#### 戻り値

(`value is T`): 値が`null`でも`undefined`でもない場合は`true`、そうでない場合は`false`を返します。
