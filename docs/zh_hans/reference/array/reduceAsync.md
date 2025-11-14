# reduceAsync

使用异步归约函数将数组归约为单个值。

```typescript
const result = await reduceAsync(array, reducer, initialValue);
```

## 参考

### `reduceAsync(array, reducer, initialValue)`

当需要通过顺序处理每个元素将数组归约为单个值时，使用 `reduceAsync`。归约函数从左到右顺序应用于每个元素，将一个调用的累积结果传递给下一个调用。

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 获取每个数字的异步值并求和。
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + (await fetchValue(n)), 0);
// 返回：所有获取值的总和

// 将数组转换为对象。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userMap = await reduceAsync(
  users,
  async (acc, user) => {
    const details = await fetchUserDetails(user.id);
    acc[user.id] = details;
    return acc;
  },
  {} as Record<number, any>
);
// 返回：{ 1: {...}, 2: {...}, 3: {...} }
```

与其他异步数组方法不同，`reduceAsync` 必须顺序处理元素，不支持并发执行，因为下一步需要上一步的结果。

#### 参数

- `array` (`readonly T[]`)：要归约的数组。
- `reducer` (`(accumulator: U, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<U>`)：处理每个元素的异步函数。它接收累积值和当前值，并返回新的累积值。
- `initialValue` (`U`)：累加器的初始值。

### 返回值

(`Promise<U>`)：一个解析为最终累积值的 Promise。

---

### `reduceAsync(array, reducer)`

在没有初始值的情况下归约数组时，第一个元素用作初始值，归约函数从第二个元素开始应用。

```typescript
import { reduceAsync } from 'es-toolkit/array';

// 在没有初始值的情况下计算总和。
const numbers = [1, 2, 3, 4, 5];
const sum = await reduceAsync(numbers, async (acc, n) => acc + n);
// 返回：15 (1 + 2 + 3 + 4 + 5)

// 空数组返回 undefined。
const emptyArray: number[] = [];
const result = await reduceAsync(emptyArray, async (acc, n) => acc + n);
// 返回：undefined
```

在没有初始值的情况下对空数组调用 `reduceAsync` 会返回 `undefined`。

#### 参数

- `array` (`readonly T[]`)：要归约的数组。
- `reducer` (`(accumulator: T, currentValue: T, currentIndex: number, array: readonly T[]) => Promise<T>`)：处理每个元素的异步函数。它接收累积值和当前值，并返回新的累积值。

### 返回值

(`Promise<T | undefined>`)：一个解析为最终累积值的 Promise。如果数组为空，则返回 `undefined`。
