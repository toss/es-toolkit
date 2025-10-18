# times (Lodash 兼容性)

给定次数执行函数并将结果作为数组返回。

```typescript
const result = times(n, iteratee);
```

## 参考

### `times(n, iteratee)`

执行给定次数的迭代函数并将结果作为数组返回。每次迭代时将当前索引传递给函数。

```typescript
import { times } from 'es-toolkit/compat';

// 从0到2的索引乘以2的值数组
times(3, i => i * 2);
// 返回：[0, 2, 4]

// 多次生成相同值
times(2, () => 'es-toolkit');
// 返回：['es-toolkit', 'es-toolkit']
```

如果不传递函数，则返回索引数组。

```typescript
import { times } from 'es-toolkit/compat';

times(3);
// 返回：[0, 1, 2]
```

#### 参数

- `n` (`number`): 要迭代的次数。转换为整数，如果小于1或不是安全整数则返回空数组。
- `iteratee` (`(num: number) => T`, 可选): 每次迭代时执行的函数。接受索引作为参数。如果不提供，则直接返回索引。

#### 返回值

(`T[]`): 返回由每次迭代执行函数的结果组成的数组。
