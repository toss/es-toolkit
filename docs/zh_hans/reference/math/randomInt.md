# randomInt

在指定范围内生成随机整数。

```typescript
const randomInteger = randomInt(min, max);
```

## 参考

### `randomInt(maximum)` / `randomInt(minimum, maximum)`

当您需要随机整数时,请使用 `randomInt`。它只返回没有小数点的整数。

```typescript
import { randomInt } from 'es-toolkit/math';

// 生成0以上5以下的随机整数。
const num1 = randomInt(5);
console.log(num1); // 例如: 3

// 生成2以上10以下的随机整数。
const num2 = randomInt(2, 10);
console.log(num2); // 例如: 7

// 也可以用于负数范围。
const num3 = randomInt(-5, -1);
console.log(num3); // 例如: -3

// 模拟骰子掷骰(1-6)
const diceRoll = randomInt(1, 7);
console.log(diceRoll); // 例如: 4

// 从数组中选择随机索引
const items = ['apple', 'banana', 'cherry', 'date'];
const randomIndex = randomInt(items.length);
console.log(items[randomIndex]); // 例如: 'banana'
```

#### 参数

- `maximum` (`number`): 使用单个参数时的最大值(不包括)。必须大于0。
- `minimum` (`number`): 最小值(包括)。
- `maximum` (`number`): 最大值(不包括)。必须大于最小值。

#### 返回值

(`number`): 返回指定范围内的随机整数。

#### 错误

如果最大值小于或等于最小值,则抛出错误。
