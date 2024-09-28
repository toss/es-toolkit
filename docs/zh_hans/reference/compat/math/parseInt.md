# parseInt

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将 `string` 转换为指定基数的整数。如果 `radix` 未定义或为 0，则使用基数 10，除非 `string` 是十六进制，此时使用基数 16。

## 签名

```typescript
function parseInt(string: string, radix?: number, guard?: unknown): number;
```

## 参数

- `string` (`string`): 要转换为整数的字符串。
- `radix` (`number`, 可选): 在将字符串转换为整数时要使用的基数。默认为 `0`。
- `guard` (`unknown`, 可选): 启用作为 `Array#map` 等方法的迭代器。

## 返回值

(`number`): 转换后的整数。

## 示例

```javascript
import { parseInt } from 'es-toolkit/compat';

parseInt('08'); // => 8
parseInt('0x20'); // => 32

parseInt('08', 10); // => 8
parseInt('0x20', 16); // => 32

['6', '08', '10'].map(parseInt); // => [6, 8, 10]
```
