# method (Lodash 互換性)

指定されたパスのメソッドを引数と一緒に呼び出す関数を作ります。

```typescript
const methodFunc = method(path, ...args);
```

## 参照

### `method(path, ...args)`

オブジェクトで特定のパスのメソッドを事前に定義された引数と一緒に呼び出す関数を生成します。関数型プログラミングでメソッド呼び出しを再利用したり配列の`map`などで便利です。

```typescript
import { method } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// メソッド呼び出し関数を作る
const add = method('a.b', 1, 2);
console.log(add(object)); // => 3

// 配列で各オブジェクトのメソッドを呼び出す
const objects = [{ calc: { sum: (a, b) => a + b } }, { calc: { sum: (a, b) => a * b } }];

const calculate = method('calc.sum', 5, 3);
objects.map(calculate); // => [8, 15]
```

ネストしたパスも処理できます。

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

#### パラメータ

- `path` (`PropertyKey | PropertyKey[]`): 呼び出すメソッドのパスです。
- `...args` (`any[]`): メソッドに渡す引数です。

#### 戻り値

(`(object: any) => any`): オブジェクトを受け取って指定されたパスのメソッドを引数と一緒に呼び出す関数を返します。
