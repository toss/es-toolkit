# ceil

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将一个数字向上舍入到指定的精度。

该函数接受一个数字和一个可选的精度值，返回将数字向上舍入到指定小数位数的结果。

## 签名

```typescript
function ceil(number: number | string, precision: number | string = 0): number;
```

### 参数

- `number` (`number | string`): 要向上舍入的数字。
- `precision` (`number | string`, 可选): 要向上舍入的精度，默认为 `0`。

### 返回

(`number`): 向上舍入的数字。

### 示例

```typescript
import { ceil } from 'es-toolkit/compat';

ceil(4.006); // => 5
ceil(6.004, 2); // => 6.01
ceil(6040, -2); // => 6100
```
