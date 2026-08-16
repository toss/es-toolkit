# uniqueId (Lodash 兼容性)

::: warning 推荐使用 crypto.randomUUID

生成唯一标识符时，使用 crypto.randomUUID() 是更安全、更标准的方式。

改为使用更快、更现代的 crypto.randomUUID()。

:::

生成唯一的字符串标识符。

```typescript
const result = uniqueId('contact_');
```

## 用法

### `uniqueId(prefix?: string): string`

生成唯一的字符串标识符。通过递增内部计数器来保证唯一性。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 带前缀生成唯一 ID
uniqueId('contact_'); // => 'contact_1'
uniqueId('user_'); // => 'user_2'

// 不带前缀生成唯一 ID
uniqueId(); // => '3'
uniqueId(); // => '4'
```

每次连续调用时内部计数器递增。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 每次调用生成不同的 ID
const ids = Array.from({ length: 5 }, () => uniqueId('item_'));
console.log(ids);
// => ['item_1', 'item_2', 'item_3', 'item_4', 'item_5']
```

对生成 DOM 元素的唯一 ID 很有用。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 生成表单元素的唯一 ID
const inputId = uniqueId('input_');
const labelId = uniqueId('label_');

console.log(inputId); // => 'input_6'
console.log(labelId); // => 'label_7'
```

#### 参数

- `prefix` (`string`, 可选): ID 前的前缀字符串。如果不提供，只返回数字。

#### 返回值

(`string`): 唯一标识符字符串。有前缀时返回 `前缀 + 编号` 形式，没有则只返回编号。
