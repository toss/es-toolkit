# floor

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将一个数字向下舍入到指定的精度。

该函数接受一个数字和一个可选的精度值，返回将数字向下舍入到指定小数位数的结果。

## 签名

```typescript
function floor(number: number | string, precision: number | string = 0): number;
```

### 参数

- `number` (`number | string`): 要向下舍入的数字。
- `precision` (`number | string`, 可选): 要向下舍入的精度，默认为 `0`。

### 返回

(`number`): 向下舍入的数字。

### 示例

```typescript
import { floor } from 'es-toolkit/compat';

floor(4.006); // => 4
floor(0.046, 2); // => 0.04
floor(4060, -2); // => 4000
```
