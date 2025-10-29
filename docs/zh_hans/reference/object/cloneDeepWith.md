# cloneDeepWith

通过自定义函数深拷贝给定值。

```typescript
const customCloned = cloneDeepWith(obj, cloneValue);
```

## 参考

### `cloneDeepWith(obj, cloneValue)`

当您想要深拷贝对象或数组时,对特定值使用自定义方式进行拷贝,请使用 `cloneDeepWith`。如果自定义函数 `cloneValue` 返回一个值,则使用该值;如果返回 `undefined`,则使用默认的深拷贝方法。

```typescript
import { cloneDeepWith } from 'es-toolkit/object';

// 拷贝时将数字加倍
const obj = { a: 1, b: { c: 2, d: 'text' } };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // 返回 undefined 则使用默认拷贝方式
});
console.log(clonedObj); // { a: 2, b: { c: 4, d: 'text' } }

// 拷贝时给所有数组元素加 1
const arr = [1, [2, 3], { num: 4 }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value + 1;
  }
});
console.log(clonedArr); // [2, [3, 4], { num: 5 }]
```

自定义函数接收当前值、键、原始对象和内部栈信息作为参数。

```typescript
const data = {
  user: { name: 'Alice', age: 30 },
  settings: { theme: 'dark', lang: 'zh' },
};

const result = cloneDeepWith(data, (value, key, obj, stack) => {
  // 以特殊方式拷贝 'user' 对象
  if (key === 'user' && typeof value === 'object') {
    return { ...value, cloned: true };
  }

  // 给字符串添加前缀
  if (typeof value === 'string') {
    return `cloned_${value}`;
  }
});

console.log(result);
// {
//   user: { name: 'cloned_Alice', age: 30, cloned: true },
//   settings: { theme: 'cloned_dark', lang: 'cloned_zh' }
// }
```

使用自定义函数可以自由配置对象的拷贝方式。例如,可以将 `Date` 对象拷贝为一年后的时间。

```typescript
const data = {
  created: new Date('2023-01-01'),
  updated: new Date('2023-12-31'),
  name: 'Document',
};

const cloned = cloneDeepWith(data, value => {
  // 将 Date 对象设置为一年后
  if (value instanceof Date) {
    const newDate = new Date(value);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
});

console.log(cloned.created.getFullYear()); // 2024
console.log(cloned.updated.getFullYear()); // 2024
```

#### 参数

- `obj` (`T`):要深拷贝的值。
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`):自定义拷贝函数。返回要拷贝的值,或返回 `undefined` 以使用默认方法。
  - `value`:当前正在拷贝的值。
  - `key`:当前值的属性名。
  - `obj`:要拷贝的原始对象。
  - `stack`:用于处理循环引用的内部栈。

#### 返回值

(`T`):通过自定义函数处理的深拷贝。
