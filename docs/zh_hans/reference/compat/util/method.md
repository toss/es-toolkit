# method (Lodash 兼容性)

创建一个使用参数调用指定路径方法的函数。

```typescript
const methodFunc = method(path, ...args);
```

## 参考

### `method(path, ...args)`

创建一个从对象调用特定路径方法并使用预定义参数的函数。在函数式编程中重用方法调用或在数组的 `map` 等中很有用。

```typescript
import { method } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 创建方法调用函数
const add = method('a.b', 1, 2);
console.log(add(object)); // => 3

// 对数组中每个对象调用方法
const objects = [{ calc: { sum: (a, b) => a + b } }, { calc: { sum: (a, b) => a * b } }];

const calculate = method('calc.sum', 5, 3);
objects.map(calculate); // => [8, 15]
```

也可以处理嵌套路径。

```typescript
import { method } from 'es-toolkit/compat';

const obj = {
  users: {
    getName: function (prefix) {
      return prefix + this.name;
    },
    name: 'John',
  },
};

const getUserName = method('users.getName', 'Mr. ');
getUserName(obj); // => 'Mr. John'
```

#### 参数

- `path` (`PropertyKey | PropertyKey[]`): 要调用的方法的路径。
- `...args` (`any[]`): 传递给方法的参数。

#### 返回值

(`(object: any) => any`): 返回一个接受对象并使用参数调用指定路径方法的函数。
