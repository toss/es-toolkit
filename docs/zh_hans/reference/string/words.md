# words

将字符串拆分为单词数组。它可以识别 ASCII 和 Unicode 字符作为单词。

## 签名

```ts
function words(str: string): string[];
```

### 参数

- `str` (`string`): 要拆分为单词的字符串。

### 返回值

(`string[]`): 从字符串中提取的单词数组。

## 示例

```typescript
words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

words('camelCaseHTTPRequest🚀');
// => ['camel', 'Case', 'HTTP', 'Request', '🚀']

words('Lunedì 18 Set');
// => ['Lunedì', '18', 'Set']
```

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `words` 以实现与 lodash 的完全兼容。

- `words` 还接受一个可选的第二个参数 `pattern`，允许您定义自定义模式来拆分字符串。
- 如果第一个参数不是字符串，`words` 将自动将其转换为字符串。

```typescript
import { words } from 'es-toolkit/compat';

words('fred, barney, & pebbles', /[^, ]+/g);
// ['fred', 'barney', '&', 'pebbles']
```
