# isString

检查给定值是否为字符串。

```typescript
const result = isString(value);
```

## 用法

### `isString(value)`

当您想检查值是否为字符串时,请使用 `isString`。在区分字符串类型和其他原始类型或对象时非常有用。

```typescript
import { isString } from 'es-toolkit/predicate';

// 字符串值
console.log(isString('hello')); // true
console.log(isString('')); // true
console.log(isString('123')); // true
console.log(isString('true')); // true

// 非字符串值
console.log(isString(123)); // false
console.log(isString(true)); // false
console.log(isString(null)); // false
console.log(isString(undefined)); // false
console.log(isString([])); // false
console.log(isString({})); // false
console.log(isString(new String('hello'))); // false (String 对象)
```

对数据验证和类型安全的字符串处理非常有用:

```typescript
// 安全的字符串操作
function processText(input: unknown): string {
  if (isString(input)) {
    // TypeScript 将 input 推断为 string
    return input.trim().toLowerCase();
  }

  // 将其他类型转换为字符串
  return String(input);
}

// 使用示例
console.log(processText('  HELLO  ')); // 'hello'
console.log(processText(123)); // '123'
console.log(processText(true)); // 'true'
console.log(processText(null)); // 'null'

// 表单数据验证
function validateForm(data: Record<string, unknown>) {
  const errors: string[] = [];

  if (!isString(data.name) || data.name.length === 0) {
    errors.push('姓名为必填项');
  }

  if (!isString(data.email) || !data.email.includes('@')) {
    errors.push('请输入有效的电子邮箱');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// 使用示例
console.log(validateForm({ name: 'John', email: 'john@example.com' }));
// { isValid: true, errors: [] }

console.log(validateForm({ name: 123, email: 'invalid-email' }));
// { isValid: false, errors: ['姓名为必填项', '请输入有效的电子邮箱'] }
```

#### 参数

- `value` (`unknown`): 要检查是否为字符串的值。

#### 返回值

(`boolean`): 如果值是字符串,则返回 `true`,否则返回 `false`。
