# bindKey (Lodash 兼容性)

::: warning 请使用箭头函数或 `bind` 方法
这个 `bindKey` 函数由于动态方法绑定和占位符处理而变得复杂和缓慢。使用 JavaScript 的原生 `bind` 方法或箭头函数更简单，性能更好。

请使用更快、更现代的箭头函数或 `Function.prototype.bind`。
:::

绑定对象的方法，允许引用可能在以后被重新定义的方法。

```typescript
const bound = bindKey(object, key, ...partialArgs);
```

## 用法

### `bindKey(object, key, ...partialArgs)`

当您想绑定对象的方法，同时允许该方法在以后被更改时，请使用 `bindKey`。与普通的 `bind` 不同，它每次调用时都会引用最新的方法。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// 绑定方法。
let bound = bindKey(object, 'greet', 'hi');
bound('!');
// 返回: 'hi fred!'

// 重新定义方法。
object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

// 绑定的函数调用新方法。
bound('!');
// 返回: 'hiya fred!'
```

您可以使用占位符来保留参数位置。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// 使用占位符。
const bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// 返回: 'hi fred!'
```

部分应用的参数会首先传递，然后是调用时提供的参数。

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  add: function (a, b, c) {
    return a + b + c;
  },
};

// 预先设置第一个参数。
const bound = bindKey(object, 'add', 10);
bound(20, 30);
// 返回: 60 (10 + 20 + 30)
```

#### 参数

- `object` (`object`): 要调用方法的对象。
- `key` (`string`): 要调用的方法的键。
- `...partialArgs` (`any[]`, 可选): 要部分应用到方法的参数。您可以使用 `bindKey.placeholder` 来保留参数位置。

#### 返回值

(`(...args: any[]) => any`): 返回一个新的绑定函数。此函数每次调用时都会引用对象的最新方法。
