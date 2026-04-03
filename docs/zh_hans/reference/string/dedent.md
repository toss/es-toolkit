# dedent

移除多行字符串中每行的公共前导空白。

## 签名

```typescript
function dedent(str: string): string;
function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
function dedent<T>(tagFn: (strings: TemplateStringsArray, ...values: unknown[]) => T): (strings: TemplateStringsArray, ...values: unknown[]) => T;
```

### 参数

- `str` (`string | TemplateStringsArray | Function`): 要移除缩进的字符串、模板字面量或标签函数。
- `values` (`unknown[]`): 作为标签模板字面量使用时要插入的值。

### 返回值

(`string | Function`): 移除公共缩进后的字符串，或合成的标签函数。

## 示例

```typescript
import { dedent } from 'es-toolkit/string';

// 作为普通函数使用
dedent('  hello\n  world');
// 结果: 'hello\nworld'

// 作为标签模板字面量使用
dedent`
  hello
  world
`;
// 结果: 'hello\nworld'

// 保留相对缩进
dedent`
  hello
    world
`;
// 结果: 'hello\n  world'

// 支持插值
const name = 'world';
dedent`
  hello
  ${name}
`;
// 结果: 'hello\nworld'

// 标签合成
const html = dedent((strings, ...values) => strings.join(''));
html`
  <div>Hello</div>
`;
// 结果: '<div>Hello</div>'
```
