# every (`Set`)

测试Set中的所有元素是否满足提供的谓词函数。

```typescript
const allMatch = every(set, doesMatch);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `every(set, doesMatch)`

当您想检查Set中的所有元素是否满足特定条件时,请使用 `every`。提供一个测试每个元素的谓词函数,如果所有元素都满足谓词,它返回true,否则返回false。

```typescript
import { every } from 'es-toolkit/set';

const set = new Set([10, 20, 30]);

const result = every(set, value => value > 5);
// 结果: true

const result2 = every(set, value => value > 15);
// 结果: false
```

您可以测试各种条件。

```typescript
import { every } from 'es-toolkit/set';

// 检查所有值是否满足条件
const ages = new Set([25, 30, 35, 40]);

const allAdults = every(ages, age => age >= 18);
// 结果: true

const allSeniors = every(ages, age => age >= 65);
// 结果: false

// 检查对象属性
const users = new Set([
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
]);

const allActive = every(users, user => user.active);
// 结果: true
```

#### 参数

- `set` (`Set<T>`): 要测试的Set。
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 测试每个元素的谓词函数。

#### 返回值

(`boolean`): 如果所有元素都满足谓词则返回true,否则返回false。
