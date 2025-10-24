# takeRightWhile

从数组的末尾开始获取元素,直到条件函数返回假为止,返回一个新数组。

```typescript
const result = takeRightWhile(arr, shouldContinueTaking);
```

## 参考

### `takeRightWhile(arr, shouldContinueTaking)`

当您想从数组的末尾开始获取满足条件的元素时,请使用 `takeRightWhile`。遇到条件函数返回假的第一个元素时会停止。

```typescript
import { takeRightWhile } from 'es-toolkit/array';

// 从末尾开始获取小于4的数字
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
// 结果: [3, 2, 1]

// 从末尾开始获取大于3的数字
takeRightWhile([1, 2, 3], n => n > 3);
// 结果: []

// 获取字符串长度小于等于5的元素
takeRightWhile(['hello', 'world', 'foo', 'bar'], str => str.length <= 5);
// 结果: ['hello', 'world', 'foo', 'bar']
```

#### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `shouldContinueTaking` (`(item: T) => boolean`): 与每个元素一起调用的条件函数。只要此函数返回真,元素就会被包含在结果中。

#### 返回值

(`T[]`): 包含从数组末尾开始获取的、条件函数返回真的元素的新数组。
