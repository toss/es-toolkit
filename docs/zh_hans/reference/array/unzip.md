# unzip

将绑定在一起的数组解开,将相同位置的元素收集成新数组并返回。

```typescript
const unzippedArrays = unzip(zipped);
```

## 参考

### `unzip(zipped)`

当您想从绑定在一起的二维数组中收集相同索引的元素创建新数组时,请使用 `unzip`。这是 zip 的相反操作。

```typescript
import { unzip } from 'es-toolkit/array';

// 解开绑定了字符串、布尔值、数字的数组。
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
  ['c', true, 3],
];
const result = unzip(zipped);
console.log(result);
// [['a', 'b', 'c'], [true, false, true], [1, 2, 3]]

// 解开绑定了用户信息的数组。
const users = [
  ['john', 30, 'engineer'],
  ['jane', 25, 'designer'],
  ['bob', 35, 'manager'],
];
const [names, ages, roles] = unzip(users);
console.log(names); // ['john', 'jane', 'bob']
console.log(ages); // [30, 25, 35]
console.log(roles); // ['engineer', 'designer', 'manager']
```

也可以处理长度不同的数组。较短数组的空位会用 `undefined` 填充。

```typescript
import { unzip } from 'es-toolkit/array';

const mixed = [[1, 'a'], [2, 'b', true], [3]];
const result = unzip(mixed);
console.log(result);
// [[1, 2, 3], ['a', 'b', undefined], [undefined, true, undefined]]
```

传入空数组返回空数组。

```typescript
import { unzip } from 'es-toolkit/array';

const empty = unzip([]);
console.log(empty); // []
```

#### 参数

- `zipped` (`ReadonlyArray<[...T]>`): 要解开的绑定在一起的二维数组。

#### 返回值

(`Unzip<T>`): 将相同位置的元素收集在一起的新数组。如果原数组长度不同,较短数组的空位会用 `undefined` 填充。
