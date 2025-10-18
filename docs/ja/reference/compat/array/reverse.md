# reverse（Lodash 互換性）

::: warning `Array.prototype.reverse()` を使用してください

この `reverse` 関数は、Lodash との互換性のために `null` や `undefined` の処理を含んでいます。単純な配列の逆順だけが必要な場合は、ネイティブ JavaScript の `Array.prototype.reverse()` メソッドがより直感的で高速に動作します。

より高速でモダンな `Array.prototype.reverse()` を使用してください。

:::

配列の要素をその場で反転します。

```typescript
const reversed = reverse(array);
```

## 参照

### `reverse(array)`

配列の順序を逆にして、最初の要素が最後に、最後の要素が最初になるようにします。元の配列を直接変更し、変更された配列を返します。

```typescript
import { reverse } from 'es-toolkit/compat';

// 数値配列を反転
const numbers = [1, 2, 3, 4, 5];
const reversed = reverse(numbers);
console.log(numbers); // => [5, 4, 3, 2, 1]
console.log(reversed); // => [5, 4, 3, 2, 1]

// 文字列配列を反転
const words = ['apple', 'banana', 'cherry'];
reverse(words);
console.log(words); // => ['cherry', 'banana', 'apple']

// 空の配列や null/undefined はそのまま返される
reverse([]); // => []
reverse(null); // => null
reverse(undefined); // => undefined
```

この関数は元の配列を直接変更する点に注意が必要です。

```typescript
import { reverse } from 'es-toolkit/compat';

const original = [1, 2, 3];
const result = reverse(original);

console.log(original === result); // => true（同じ配列オブジェクト）
console.log(original); // => [3, 2, 1]（元が変更される）
```

#### パラメータ

- `array` (`T[] | null | undefined`): 反転する配列。`null` や `undefined` の場合はそのまま返します。

#### 戻り値

(`T[] | null | undefined`): 反転された配列を返します。入力が `null` や `undefined` の場合、その値をそのまま返します。
