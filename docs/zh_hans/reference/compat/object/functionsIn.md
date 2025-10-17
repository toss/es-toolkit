# functionsIn (Lodash 兼容性)

::: warning 请使用 `for...in` 循环和 `typeof` 检查

这个 `functionsIn` 函数由于使用了 `for...in` 循环和函数检查过程,运行速度较慢。

请使用更快、更现代的 `for...in` 循环和 `typeof` 检查。

:::

返回对象的所有属性(包括继承的属性)中函数类型的属性名称数组。

```typescript
const functionNames = functionsIn(obj);
```

## 参考

### `functionsIn(object)`

检查对象的所有属性,返回仅包含函数类型属性名称的数组。不仅检查对象自身的属性,还会通过原型链检查所有继承的属性。适用于查找对象的所有方法(包括继承的方法)。

```typescript
import { functionsIn } from 'es-toolkit/compat';

// 基本用法
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functionsIn(obj);
// 结果: ['greet', 'calculate']

// 包括继承的函数
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
// 结果: ['add', 'multiply', 'divide'] (包括继承的方法)

// 通过原型链继承
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
// 结果: ['parentMethod', 'childMethod', 'protoMethod']
```

`null` 或 `undefined` 将被视为空数组。

```typescript
import { functionsIn } from 'es-toolkit/compat';

functionsIn(null); // []
functionsIn(undefined); // []
```

#### 参数

- `object` (`any`): 要检查的对象。

#### 返回值

(`string[]`): 返回由函数类型的属性名称(包括继承的函数)组成的数组。
