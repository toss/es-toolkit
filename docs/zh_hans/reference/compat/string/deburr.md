# deburr (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `deburr`

由于处理非字符串输入值,此 `deburr` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [deburr](../../string/deburr.md)。

:::

将字符串中的特殊字符和变音符号转换为ASCII字符。

```typescript
const result = deburr(str);
```

## 参考

### `deburr(str)`

将字符串中的特殊字符和变音符号转换为ASCII字符。这对于使多语言文本更易于搜索或排序很有用。

```typescript
import { deburr } from 'es-toolkit/compat';

deburr('Æthelred'); // 'Aethelred'
deburr('München'); // 'Munchen'
deburr('Crème brûlée'); // 'Creme brulee'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { deburr } from 'es-toolkit/compat';

deburr(123); // '123'
deburr(null); // ''
deburr(undefined); // ''
```

#### 参数

- `str` (`string`,可选): 要删除特殊字符的字符串。

#### 返回值

(`string`): 返回特殊字符和变音符号转换为ASCII字符的字符串。
