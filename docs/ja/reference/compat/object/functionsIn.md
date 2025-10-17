# functionsIn (Lodash 互換性)

::: warning `for...in` ループと `typeof` チェックを使用してください

この `functionsIn` 関数は `for...in` ループと関数チェック処理により、動作が遅くなります。

代わりに、より高速で現代的な `for...in` ループと `typeof` チェックを使用してください。

:::

オブジェクトのすべてのプロパティ(継承されたプロパティを含む)の中から、関数型のプロパティ名を配列として返します。

```typescript
const functionNames = functionsIn(obj);
```

## 参照

### `functionsIn(object)`

オブジェクトのすべてのプロパティを確認し、関数型のプロパティ名のみを配列として返します。オブジェクト自身のプロパティだけでなく、プロトタイプチェーンを通じて継承されたプロパティもすべて確認します。オブジェクトのすべてのメソッド(継承されたメソッドを含む)を見つけるのに便利です。

```typescript
import { functionsIn } from 'es-toolkit/compat';

// 基本的な使用法
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functionsIn(obj);
// 結果: ['greet', 'calculate']

// 継承された関数も含む
class Calculator {
  constructor() {
    this.value = 0;
    this.add = function (n) {
      this.value += n;
    };
  }

  multiply(n) {
    this.value *= n;
  }
}

Calculator.prototype.divide = function (n) {
  this.value /= n;
};

const calc = new Calculator();
const allMethods = functionsIn(calc);
// 結果: ['add', 'multiply', 'divide'] (継承されたメソッドも含む)

// プロトタイプチェーンを通じた継承
function Parent() {
  this.parentMethod = function () {
    return 'parent';
  };
}
Parent.prototype.protoMethod = function () {
  return 'proto';
};

function Child() {
  Parent.call(this);
  this.childMethod = function () {
    return 'child';
  };
}
Child.prototype = Object.create(Parent.prototype);

const child = new Child();
const inheritedFunctions = functionsIn(child);
// 結果: ['parentMethod', 'childMethod', 'protoMethod']
```

`null` または `undefined` は空配列として扱われます。

```typescript
import { functionsIn } from 'es-toolkit/compat';

functionsIn(null); // []
functionsIn(undefined); // []
```

#### パラメータ

- `object` (`any`): 確認するオブジェクトです。

#### 戻り値

(`string[]`): 関数型のプロパティ名(継承された関数を含む)で構成された配列を返します。
