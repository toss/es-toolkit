# lowerFirst

将字符串的第一个字符转换为小写。

## 签名

```typescript
function lowerFirst(str: string): string;
```

### 参数

- `str` (`string`): 要修改的字符串。

### 返回值

(`string`): 转换后的字符串。

## 示例

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst('fred'); // 返回 'fred'
lowerFirst('Fred'); // 返回 'fred'
lowerFirst('FRED'); // 返回 'fRED'
```
