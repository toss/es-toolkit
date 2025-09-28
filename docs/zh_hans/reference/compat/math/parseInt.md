# parseInt (Lodash 兼容性)

::: warning 请使用 `parseInt`

这个 `parseInt` 函数由于额外的函数调用会运行较慢。

请使用更快、更现代的原生 `parseInt`。

:::

将字符串转换为整数。

```typescript
const result = parseInt(string, radix);
```

## 参考

### `parseInt(string, radix?)`

当您想要将字符串转换为整数时，请使用 `parseInt`。可以指定基数来解析不同进制。

```typescript
import { parseInt } from 'es-toolkit/compat';

// 基本十进制解析
parseInt('123');
// Returns: 123

parseInt('08');
// Returns: 8

// 十六进制自动识别
parseInt('0x20');
// Returns: 32

// 明确指定基数
parseInt('08', 10);
// Returns: 8

parseInt('0x20', 16);
// Returns: 32

parseInt('1010', 2);
// Returns: 10

// 在数组中使用
['6', '08', '10'].map(parseInt);
// Returns: [6, 8, 10]
```

格式错误的字符串返回 NaN。

```typescript
import { parseInt } from 'es-toolkit/compat';

parseInt('abc');
// Returns: NaN

parseInt('');
// Returns: NaN

parseInt('123abc');
// Returns: 123 (只解析前面部分)
```

#### 参数

- `string` (`string`): 要转换为整数的字符串。
- `radix` (`number`, 可选): 转换时使用的基数。默认值为 `0`，此时根据字符串格式自动确定。

#### 返回值

(`number`): 返回转换后的整数。如果无法转换则返回 NaN。