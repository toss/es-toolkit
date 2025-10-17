# negate

创建一个将返回真或假的函数的返回值反转的新函数。

```typescript
const negatedFunc = negate(booleanFunc);
```

## 参考

### `negate(func)`

当您想要反转返回真或假值的函数的结果时,请使用 `negate`。

这在反转条件函数或过滤逻辑时很有用。例如,可以将查找偶数的函数转换为查找奇数的函数。

```typescript
import { negate } from 'es-toolkit/function';

// 基本用法
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isEven(2)); // true
console.log(isOdd(2)); // false

console.log(isEven(3)); // false
console.log(isOdd(3)); // true

// 在数组过滤中使用
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers); // [2, 4, 6]

const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]
```

也可以反转复杂的条件函数。

```typescript
import { negate } from 'es-toolkit/function';

const isLongString = (str: string) => str.length > 5;
const isShortString = negate(isLongString);

const words = ['hi', 'hello', 'world', 'javascript'];

const longWords = words.filter(isLongString);
console.log(longWords); // ['hello', 'javascript']

const shortWords = words.filter(isShortString);
console.log(shortWords); // ['hi', 'world']
```

#### 参数

- `func` (`F`): 返回布尔值的函数。

#### 返回值

(`F`): 返回一个接收与原始函数相同参数但返回相反布尔值的新函数。
