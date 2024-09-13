# countBy

根据 `mapper` 函数统计数组中每个项目的出现次数。

## 签名

```typescript
function countBy<T, K extends PropertyKey>(arr: T[], mapper: (item: T) => K): Record<K, number>;
```

### 参数

- `arr` (`T[]`): 输入数组，用于统计每个项目的出现次数。
- `mapper` (`(item: T) => K`): 将每个项目映射到字符串键的转换函数。

### 返回值

(`Record<K, number>`) 包含基于转换函数的每个项目计数的对象。

## 示例

```javascript
import { countBy } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5, 6];
const result = countBy(array, x => (x % 2 === 0 ? 'even' : 'odd'));

console.log(result);
// 输出: { 'odd': 3, 'even': 3 }
```
