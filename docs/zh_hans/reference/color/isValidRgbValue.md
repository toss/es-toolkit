# isValidRgbValue

验证数字是否为有效的RGB颜色值。

该函数检查给定的数字是否代表有效的RGB颜色分量。有效的RGB值必须是0到255（包含）之间的整数。

## 签名

```typescript
function isValidRgbValue(value: number): boolean;
```

### 参数

- `value` (`number`): 要验证为RGB颜色分量的数字。

### 返回值

(`boolean`): 如果值是有效的RGB颜色分量则返回`true`，否则返回`false`。

## 示例

```typescript
import { isValidRgbValue } from 'es-toolkit/color';

// 有效的RGB值
isValidRgbValue(0); // true (最小值)
isValidRgbValue(255); // true (最大值)
isValidRgbValue(128); // true (中间值)
isValidRgbValue(42); // true

// 无效的RGB值 - 超出范围
isValidRgbValue(-1); // false (低于最小值)
isValidRgbValue(256); // false (超过最大值)
isValidRgbValue(300); // false (超过最大值)

// 无效的RGB值 - 不是整数
isValidRgbValue(1.5); // false (小数)
isValidRgbValue(255.1); // false (小数)
isValidRgbValue(42.999); // false (小数)

// 无效的RGB值 - 不是数字
isValidRgbValue(NaN); // false
isValidRgbValue(Infinity); // false
isValidRgbValue(-Infinity); // false
```
