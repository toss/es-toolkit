# upperFirst

将字符串的第一个字符转换为大写。

## 签名

```typescript
function upperFirst(str: string): string;
```

### 参数

- `str` (`string`): 要修改的字符串。

### 返回值

(`string`): 转换后的字符串。

## 示例

```typescript
import { upperFirst } from 'es-toolkit/string';

upperFirst('fred'); // 返回 'Fred'
upperFirst('Fred'); // 返回 'Fred'
upperFirst('FRED'); // 返回 'FRED'
```
