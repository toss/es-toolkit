# isRegExp

检查给定值是否为 `RegExp` 实例。

```typescript
const result = isRegExp(value);
```

## 用法

### `isRegExp(value)`

当您想检查值是否为 `RegExp` 实例时,请使用 `isRegExp`。在区分正则表达式对象和普通字符串或其他对象时非常有用。

```typescript
import { isRegExp } from 'es-toolkit/predicate';

// RegExp 实例
const regex1 = /abc/;
const regex2 = new RegExp('abc');
const regex3 = new RegExp('\\d+', 'g');

console.log(isRegExp(regex1)); // true
console.log(isRegExp(regex2)); // true
console.log(isRegExp(regex3)); // true

// 非 RegExp 值
console.log(isRegExp('/abc/')); // false (字符串)
console.log(isRegExp('abc')); // false
console.log(isRegExp({})); // false
console.log(isRegExp(null)); // false
console.log(isRegExp(undefined)); // false
```

对正则表达式模式验证或字符串处理非常有用:

```typescript
// 动态模式验证
function validatePattern(pattern: unknown, text: string) {
  if (isRegExp(pattern)) {
    // TypeScript 将 pattern 推断为 RegExp
    return pattern.test(text);
  }

  // 将字符串模式转换为正则表达式
  if (typeof pattern === 'string') {
    const regex = new RegExp(pattern);
    return regex.test(text);
  }

  return false;
}

// 使用示例
console.log(validatePattern(/hello/, 'hello world')); // true
console.log(validatePattern('\\d+', '123')); // true
console.log(validatePattern('invalid', 'text')); // false

// 在表单验证中使用
function createValidator(rule: unknown) {
  if (isRegExp(rule)) {
    return (value: string) => rule.test(value);
  }

  // 其他规则类型...
  return () => false;
}

// 创建邮箱验证器
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = createValidator(emailRegex);

console.log(emailValidator('test@example.com')); // true
console.log(emailValidator('invalid-email')); // false
```

在条件字符串处理中使用:

```typescript
// 文本处理工具
function processText(input: string, processor: unknown) {
  if (isRegExp(processor)) {
    // 使用正则表达式提取匹配部分
    const matches = input.match(processor);
    return matches ? matches : [];
  }

  // 其他处理器类型...
  return [input];
}

// 提取数字
const numberRegex = /\d+/g;
const numbers = processText('价格: 1000元, 折扣: 200元', numberRegex);
console.log(numbers); // ['1000', '200']

// 提取 URL
const urlRegex = /https?:\/\/[^\s]+/g;
const urls = processText('网站: https://example.com 参考', urlRegex);
console.log(urls); // ['https://example.com']

// 基于配置的文本验证
class TextValidator {
  private rules: Array<{ name: string; rule: unknown }> = [];

  addRule(name: string, rule: unknown) {
    this.rules.push({ name, rule });
  }

  validate(text: string) {
    const results: Array<{ rule: string; passed: boolean }> = [];

    for (const { name, rule } of this.rules) {
      if (isRegExp(rule)) {
        results.push({
          rule: name,
          passed: rule.test(text),
        });
      } else {
        results.push({
          rule: name,
          passed: false,
        });
      }
    }

    return results;
  }
}

// 使用示例
const validator = new TextValidator();
validator.addRule('仅字母', /^[a-zA-Z]+$/);
validator.addRule('包含数字', /\d/);
validator.addRule('禁止特殊字符', /^[^!@#$%^&*()]+$/);

console.log(validator.validate('Hello123'));
// [
//   { rule: '仅字母', passed: false },
//   { rule: '包含数字', passed: true },
//   { rule: '禁止特殊字符', passed: true }
// ]
```

区分字符串和正则表达式:

```typescript
// 在搜索功能中使用
function searchText(content: string, query: unknown) {
  if (isRegExp(query)) {
    // 正则表达式搜索 - 高级模式匹配
    const matches = content.match(query);
    return matches ? matches.length : 0;
  }

  if (typeof query === 'string') {
    // 普通字符串搜索
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    return matches ? matches.length : 0;
  }

  return 0;
}

// 使用示例
const text = 'Hello world! Hello everyone!';

console.log(searchText(text, /hello/gi)); // 2 (正则表达式)
console.log(searchText(text, 'Hello')); // 2 (字符串,已转义)
console.log(searchText(text, /h.llo/i)); // 2 (模式匹配)

// 动态过滤
function createFilter(patterns: unknown[]) {
  const regexPatterns = patterns.filter(isRegExp);

  return (text: string) => {
    return regexPatterns.some(pattern => pattern.test(text));
  };
}

// 垃圾邮件过滤器示例
const spamPatterns = [
  /\b(广告|促销)\b/,
  /\d{3}-\d{4}-\d{4}/, // 电话号码模式
  'invalid', // 不是 RegExp,从过滤器中排除
  /\$\d+/, // 价格模式
];

const spamFilter = createFilter(spamPatterns);
console.log(spamFilter('紧急广告!')); // true
console.log(spamFilter('你好')); // false
```

使用正则表达式标志和属性:

```typescript
// 检查 RegExp 属性
function analyzeRegex(value: unknown) {
  if (isRegExp(value)) {
    return {
      source: value.source,
      flags: value.flags,
      global: value.global,
      ignoreCase: value.ignoreCase,
      multiline: value.multiline,
      unicode: value.unicode,
      sticky: value.sticky,
    };
  }

  return null;
}

// 使用示例
const regex = /hello/gim;
const analysis = analyzeRegex(regex);
console.log(analysis);
// {
//   source: 'hello',
//   flags: 'gim',
//   global: true,
//   ignoreCase: true,
//   multiline: true,
//   unicode: false,
//   sticky: false
// }

// 克隆正则表达式
function cloneRegex(value: unknown) {
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags);
  }

  return null;
}

const originalRegex = /test/gi;
const clonedRegex = cloneRegex(originalRegex);
console.log(clonedRegex?.test('TEST')); // true
```

#### 参数

- `value` (`unknown`): 要检查是否为 RegExp 实例的值。

#### 返回值

(`value is RegExp`): 如果值是 RegExp 实例,则返回 `true`,否则返回 `false`。
