# cloneDeep (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `cloneDeep`

这个 `cloneDeep` 函数由于处理特殊对象类型的复杂逻辑而相对较慢。

请改用 `es-toolkit` 的更快、更现代的 [cloneDeep](../../object/cloneDeep.md)。

:::

创建对象的深拷贝。

```typescript
const cloned = cloneDeep(value);
```

## 参考

### `cloneDeep(value)`

当您想要创建值的深拷贝时,请使用 `cloneDeep`。它将嵌套的对象和数组完全复制为新实例。

```typescript
import { cloneDeep } from 'es-toolkit/compat';

// 复制原始值
const num = 42;
const clonedNum = cloneDeep(num);
// Returns: 42 (相同的值)

// 深拷贝数组
const arr = [1, [2, 3], { a: 4 }];
const clonedArr = cloneDeep(arr);
clonedArr[1][0] = 99;
console.log(arr[1][0]); // 2 (原始值未更改)
console.log(clonedArr[1][0]); // 99

// 深拷贝对象
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};
const clonedObj = cloneDeep(obj);
clonedObj.b.d.e = 99;
console.log(obj.b.d.e); // 3 (原始值未更改)
console.log(clonedObj.b.d.e); // 99

// 深拷贝Date对象
const date = new Date('2023-01-01');
const clonedDate = cloneDeep(date);
// Returns: new Date('2023-01-01') (新的Date实例)

// 复杂的嵌套结构
const complex = {
  arr: [1, { nested: true }],
  map: new Map([['key', { value: 1 }]]),
  set: new Set([{ item: 1 }]),
  date: new Date(),
};
const clonedComplex = cloneDeep(complex);
// 所有嵌套对象都作为完全新的实例被复制
```

循环引用也得到正确处理。

```typescript
import { cloneDeep } from 'es-toolkit/compat';

const obj = { a: 1 };
obj.self = obj; // 循环引用

const cloned = cloneDeep(obj);
console.log(cloned !== obj); // true
console.log(cloned.self === cloned); // true (保留循环引用)
```

#### 参数

- `value` (`T`): 要深拷贝的值。

#### 返回值

(`T`): 返回深拷贝的值。
