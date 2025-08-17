# capitalize

将字符串的第一个字符转换为大写，其余字符转换为小写。

## 签名

```typescript
function capitalize<T extends string>(str: T): Capitalize<T>;
```

### 参数

`str` (`T`): 要转换为大写的字符串。

### 返回值

(`Capitalize<T>`): 转换后的大写字符串。

## 示例

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize('fred'); // 返回 'Fred'
capitalize('FRED'); // 返回 'Fred'
```
