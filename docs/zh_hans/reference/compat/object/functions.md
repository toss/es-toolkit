# functions (Lodash 兼容性)

::: warning 请使用 `Object.keys` 和 `typeof` 检查

此 `functions` 函数内部会经过 `keys` 函数和过滤过程,因此运行缓慢。

请使用更快、更现代的 `Object.keys` 和 `typeof` 检查。

:::

返回对象自有属性中函数属性的名称数组。

```typescript
const functionNames = functions(obj);
```

## 参考

### `functions(object)`

检查对象的自有属性,仅返回函数属性的名称数组。排除继承的属性和 `Symbol` 键,只检查对象直接拥有的字符串键属性。在查找对象的方法或单独处理函数属性时很有用。

```typescript
import { functions } from 'es-toolkit/compat';

// 基本用法
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functions(obj);
// 结果: ['greet', 'calculate']

// 在类实例中查找函数
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
const methods = functions(calc);
// 结果: ['add'] (排除继承的 multiply、divide)

// 没有函数的对象
const data = { x: 1, y: 2, z: 'text' };
const noFunctions = functions(data);
// 结果: []
```

`null` 或 `undefined` 会被处理为空数组。

```typescript
import { functions } from 'es-toolkit/compat';

functions(null); // []
functions(undefined); // []
```

#### 参数

- `object` (`any`): 要检查的对象。

#### 返回值

(`string[]`): 返回由函数属性名称组成的数组。
