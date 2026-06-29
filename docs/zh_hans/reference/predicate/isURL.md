# isURL

检查给定值是否为有效的URL字符串。

使用JavaScript内置的URL构造函数验证URL。
有效的URL格式必须包含协议（如http、https等）。

检查相对URL时，可以提供第二个参数作为基础URL。

可以用作TypeScript类型守卫。将参数类型缩小为`string`。

## 接口

```typescript
function isURL(value: unknown, base?: string): value is string;
```

### 参数

- `value`(`unknown`): 要检查URL有效性的值。
- `base`(`string`, 可选): 当`value`是相对URL时使用的基础URL。

### 返回值

(`value is string`): 如果值是有效的URL则返回`true`，否则返回`false`。

## 示例

```typescript
isURL('https://example.com'); // true
isURL('http://localhost:3000'); // true
isURL('https://example.com/path?query=123#hash'); // true
isURL('ftp://ftp.example.com'); // true
isURL('ws://websocket.example.com'); // true
isURL('file:///path/to/file'); // true

// 使用基础URL参数
isURL('/products', 'https://example.com'); // true
isURL('about', 'https://example.com/'); // true
isURL('category/shoes', 'https://shop.example.com'); // true
isURL('#section', 'https://example.com/page'); // true
isURL('?query=value', 'https://example.com/page'); // true

isURL('example.com'); // false (没有协议)
isURL('not a url'); // false
isURL(''); // false
isURL('http://'); // false

// 即使有基础URL，无效的相对URL仍然是无效的
isURL('', 'https://example.com'); // false
isURL('not a url', 'https://example.com'); // false
isURL('!#$%@#!#@', 'https://example.com'); // false

isURL(123); // false
isURL(null); // false
isURL(undefined); // false
```
