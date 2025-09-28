# stubFalse (Lodash 互換性)

::: warning `false`を直接使用してください

この `stubFalse` 関数は単純に`false`を返すラッパー関数で不要な抽象化です。

代わりに、より高速で直接的な`false`値を使用してください。

:::

常に`false`を返します。

```typescript
const falseValue = stubFalse();
```

## 参照

### `stubFalse()`

常に`false`を返す関数です。関数型プログラミングで一貫した偽値が必要な時や条件付きコールバックでデフォルト値として使用する時に便利です。

```typescript
import { stubFalse } from 'es-toolkit/compat';

// falseを返す
const result = stubFalse();
console.log(result); // => false

// 配列フィルタリングでデフォルト条件として使用する
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(stubFalse); // すべての要素を除去
console.log(evenNumbers); // => []

// 関数型プログラミングで使用する
const isValid = condition => (condition ? someValidation : stubFalse);
const validator = isValid(false);
console.log(validator()); // => false
```

毎回同じ`false`値を返します。

```typescript
import { stubFalse } from 'es-toolkit/compat';

const result1 = stubFalse();
const result2 = stubFalse();

console.log(result1 === result2); // => true
console.log(typeof result1); // => 'boolean'
console.log(result1); // => false
```

#### パラメータ

パラメータはありません。

#### 戻り値

(`false`): 常に`false`を返します。
