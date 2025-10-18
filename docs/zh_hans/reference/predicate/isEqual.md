# isEqual

检查两个值是否深度相等。

```typescript
const result = isEqual(a, b);
```

## 参考

### `isEqual(a, b)`

当您想检查包括对象、数组、Date、RegExp 等在内的两个值是否深度相等时，请使用 `isEqual`。即使引用不同，只要内容相同就返回 `true`。在单元测试或数据比较时很有用。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 原始类型比较
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// 特殊值处理
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

支持对象和数组的深度比较。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 深度对象比较
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
isEqual(obj1, obj2); // true

// 数组比较
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
isEqual(arr1, arr2); // true
```

可以比较 Date、RegExp、Map、Set 等对象。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 日期比较
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

// 正则表达式比较
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

// Map 和 Set 比较
const map1 = new Map([['key', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqual(map1, map2); // true

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
isEqual(set1, set2); // true
```

在单元测试中经常使用。

```typescript
import { isEqual } from 'es-toolkit/predicate';

function testApiResponse() {
  const expected = { status: 200, data: { message: 'success' } };
  const actual = { status: 200, data: { message: 'success' } };

  if (isEqual(expected, actual)) {
    console.log('测试通过！');
  } else {
    console.log('测试失败！');
  }
}
```

#### 参数

- `a` (`unknown`): 要比较的第一个值。
- `b` (`unknown`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果两个值深度相等则返回 `true`，否则返回 `false`。
