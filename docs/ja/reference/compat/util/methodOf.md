# methodOf (Lodash 互換性)

与えられたオブジェクトからパスを受け取ってメソッドを引数と一緒に呼び出す関数を作ります。

```typescript
const pathInvoker = methodOf(object, ...args);
```

## 参照

### `methodOf(object, ...args)`

特定のオブジェクトのメソッドを事前に定義された引数と一緒に呼び出す関数を生成します。`method`とは逆にオブジェクトは固定してパスを後で指定する時に便利です。

```typescript
import { methodOf } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// オブジェクトと引数を事前にバインドする
const callMethod = methodOf(object, 1, 2);
console.log(callMethod('a.b')); // => 3

// 複数のパスに対して同じオブジェクトと引数で呼び出す
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

ネストしたオブジェクトでも使用できます。

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

#### パラメータ

- `object` (`object`): メソッドを呼び出すオブジェクトです。
- `...args` (`any[]`): メソッドに渡す引数です。

#### 戻り値

(`(path: PropertyKey | PropertyKey[]) => any`): パスを受け取って指定されたオブジェクトのメソッドを引数と一緒に呼び出す関数を返します。
