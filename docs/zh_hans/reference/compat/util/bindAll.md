# bindAll (Lodash 兼容性)

将对象的方法绑定到对象本身。

```typescript
const boundObject = bindAll(object, methodNames);
```

## 参考

### `bindAll(object, ...methodNames)`

当您想要将特定方法的 `this` 值固定到该对象时，请使用 `bindAll`。当将方法作为事件处理程序或回调函数传递时，这对于维护 `this` 上下文很有用。

```typescript
import { bindAll } from 'es-toolkit/compat';

const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

// 将方法绑定到对象
bindAll(view, 'click');
document.addEventListener('click', view.click);
// => 点击时输出 'clicked docs'
```

您可以一次绑定多个方法。

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  name: 'example',
  greet() {
    return `Hello, ${this.name}!`;
  },
  farewell() {
    return `Goodbye, ${this.name}!`;
  },
};

// 使用数组绑定多个方法
bindAll(obj, ['greet', 'farewell']);

const greet = obj.greet;
greet(); // 'Hello, example!' (this 已正确绑定)
```

它可以处理数字和特殊键。

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  '-0': function () {
    return 'negative zero';
  },
  '0': function () {
    return 'zero';
  },
};

bindAll(obj, -0);
obj['-0'](); // 'negative zero'
```

#### 参数

- `object` (`Object`): 要绑定方法的对象。
- `methodNames` (`...(string | string[] | number | IArguments)`): 要绑定的方法名。可以指定为单独的字符串、数组、数字或 Arguments 对象。

#### 返回值

(`Object`): 返回已绑定方法的原始对象。
