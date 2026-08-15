# cloneDeepWith (Lodash 兼容性)

::: warning 建议实现自定义逻辑

这个 `cloneDeepWith` 函数由于复杂的自定义函数和深拷贝处理而相对较慢。

请改用 `cloneDeep` 并直接实现自定义逻辑。

:::

使用自定义函数创建对象的深拷贝。

```typescript
const cloned = cloneDeepWith(value, customizer);
```

## 用法

### `cloneDeepWith(value, customizer?)`

当您想要自定义深拷贝的工作方式时,请使用 `cloneDeepWith`。自定义函数控制特定值的复制方式。

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

// 基本用法(没有自定义函数)
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};
const cloned = cloneDeepWith(obj);
// Returns: { a: 1, b: { c: 2 } } (完全新的实例)

// 特殊处理Date对象
const obj2 = {
  name: 'test',
  createdAt: new Date('2023-01-01'),
  nested: {
    updatedAt: new Date('2023-12-31'),
  },
};
const cloned2 = cloneDeepWith(obj2, value => {
  if (value instanceof Date) {
    // 将Date转换为时间戳数字
    return value.getTime();
  }
  // 返回undefined使用默认的深拷贝行为
});
// Returns: {
//   name: 'test',
//   createdAt: 1672531200000,
//   nested: { updatedAt: 1703980800000 }
// }

// 转换数组元素
const arr = [1, [2, 3], { a: 4, b: [5, 6] }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value * 10;
  }
});
// Returns: [10, [20, 30], { a: 40, b: [50, 60] }]

// 处理函数
const objWithFunc = {
  data: { count: 1 },
  increment: function () {
    this.data.count++;
  },
};
const clonedWithFunc = cloneDeepWith(objWithFunc, value => {
  if (typeof value === 'function') {
    // 将函数转换为字符串
    return value.toString();
  }
});
// Returns: {
//   data: { count: 1 },
//   increment: "function() { this.data.count++; }"
// }
```

结合循环引用和自定义函数:

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
obj.b.self = obj; // 循环引用

const cloned = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value + 100;
  }
});

console.log(cloned.a); // 101
console.log(cloned.b.c); // 102
console.log(cloned.b.self === cloned); // true (保留循环引用)
```

#### 参数

- `value` (`T`): 要深拷贝的值。
- `customizer` (`function`, 可选): 决定复制方式的函数。格式为 `(value: any, key?: string, object?: any, stack?: Map<any, any>) => any`。

#### 返回值

(`T`): 返回由自定义函数处理的深拷贝。
