# round

将数字四舍五入到指定的小数位数。

```typescript
const rounded = round(value, precision?);
```

## 参考

### `round(value, precision?)`

当您想将数字四舍五入到特定小数位数时使用 `round`。它是用于精确计算的数学函数。

```typescript
import { round } from 'es-toolkit/math';

// 默认 - 四舍五入到整数。
const num1 = round(1.2345);
console.log(num1); // 1

// 四舍五入到小数点后 2 位。
const num2 = round(1.2345, 2);
console.log(num2); // 1.23

// 四舍五入到小数点后 3 位。
const num3 = round(1.2387, 3);
console.log(num3); // 1.239

// 也可以四舍五入负数。
const num4 = round(-1.2345, 2);
console.log(num4); // -1.23

// 也可以处理大数。
const num5 = round(123.456789, 4);
console.log(num5); // 123.4568
```

在价格计算和统计中很有用。

```typescript
import { round } from 'es-toolkit/math';

// 价格计算(到小数点后 2 位)
const price = 19.999;
const finalPrice = round(price, 2);
console.log(finalPrice); // 20.00

// 百分比计算(到小数点后 1 位)
const percentage = 66.66666;
const displayPercentage = round(percentage, 1);
console.log(displayPercentage); // 66.7

// 评分计算(到小数点后 1 位)
const rating = 4.267;
const displayRating = round(rating, 1);
console.log(displayRating); // 4.3
```

在需要精确的计算中进行四舍五入。

```typescript
import { round } from 'es-toolkit/math';

// 整理数学计算结果
const result = Math.PI * 2;
const cleanResult = round(result, 5);
console.log(cleanResult); // 6.28318

// 四舍五入测量值
const measurement = 15.789123;
const rounded = round(measurement, 3);
console.log(rounded); // 15.789
```

无效的 precision 值会抛出错误。

```typescript
import { round } from 'es-toolkit/math';

// 如果 precision 不是整数,则会发生错误。
try {
  round(1.23, 2.5);
} catch (error) {
  console.error(error.message); // 'Precision must be an integer.'
}
```

#### 参数

- `value` (`number`): 要四舍五入的数字。
- `precision` (`number`, 可选): 小数位数。必须是整数。默认值为 `0`。

#### 返回值

(`number`): 返回四舍五入到指定精度的数字。

#### 抛出异常

- 如果 `precision` 不是整数,则抛出错误。
