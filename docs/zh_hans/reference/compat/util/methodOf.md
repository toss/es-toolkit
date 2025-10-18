# methodOf (Lodash 兼容性)

从给定对象接受路径并使用参数调用方法的函数。

```typescript
const pathInvoker = methodOf(object, ...args);
```

## 参考

### `methodOf(object, ...args)`

创建一个使用预定义参数调用特定对象方法的函数。与 `method` 相反，当您想要固定对象并稍后指定路径时很有用。

```typescript
import { methodOf } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 预先绑定对象和参数
const callMethod = methodOf(object, 1, 2);
console.log(callMethod('a.b')); // => 3

// 对多个路径使用相同的对象和参数调用
const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
};

const compute = methodOf(calculator, 10, 5);
console.log(compute('add')); // => 15
console.log(compute('multiply')); // => 50
console.log(compute('subtract')); // => 5
```

也可以在嵌套对象中使用。

```typescript
import { methodOf } from 'es-toolkit/compat';

const data = {
  users: {
    findById: function (id) {
      return `User ${id}`;
    },
    findByName: function (name) {
      return `Found ${name}`;
    },
  },
};

const userFinder = methodOf(data, 'john');
userFinder('users.findById'); // => 'User john'
userFinder('users.findByName'); // => 'Found john'
```

#### 参数

- `object` (`object`): 要调用方法的对象。
- `...args` (`any[]`): 传递给方法的参数。

#### 返回值

(`(path: PropertyKey | PropertyKey[]) => any`): 返回一个接受路径并使用参数调用指定对象方法的函数。
