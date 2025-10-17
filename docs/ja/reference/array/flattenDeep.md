# flattenDeep

ネストされた配列のすべての深さを平坦化した新しい配列を返します。

```typescript
const result = flattenDeep(arr);
```

## 参照

### `flattenDeep(arr)`

どれほど深くネストされた配列でも完全に平坦化したい場合は `flattenDeep` を使用してください。配列内のすべてのネストされた配列を展開し、一つの平面的な構造にします。

JavaScript言語に含まれた[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)を`flat(Infinity)`として呼び出したときと同じように動作しますが、より高速です。

```typescript
import { flattenDeep } from 'es-toolkit/array';

// すべてのネストレベルを平坦化します。
const array = [1, [2, [3]], [4, [5, 6]]];
const result = flattenDeep(array);
// Returns: [1, 2, 3, 4, 5, 6]
```

どれほど複雑なネスト構造でも完全に平坦化します。

```typescript
import { flattenDeep } from 'es-toolkit/array';

const complexArray = [1, [2, [3, [4, [5]]]], 6];
const result = flattenDeep(complexArray);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### パラメータ

- `arr` (`T[]`): 平坦化するネストされた配列です。

#### 戻り値

(`Array<ExtractNestedArrayType<T>>`): すべての深さが平坦化された新しい配列を返します。
