# bindAll (Lodash Compatibility)

Binds methods of an object to the object itself.

```typescript
const boundObject = bindAll(object, methodNames);
```

## Reference

### `bindAll(object, ...methodNames)`

Use `bindAll` when you want to fix the `this` value of specific methods to the object itself. This is useful for maintaining the `this` context when passing methods as event handlers or callbacks.

```typescript
import { bindAll } from 'es-toolkit/compat';

const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

// Bind method to object
bindAll(view, 'click');
document.addEventListener('click', view.click);
// => Logs 'clicked docs' when clicked
```

You can bind multiple methods at once.

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

// Bind multiple methods with array
bindAll(obj, ['greet', 'farewell']);

const greet = obj.greet;
greet(); // 'Hello, example!' (this is correctly bound)
```

It can handle numeric and special keys.

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

#### Parameters

- `object` (`Object`): The object to bind methods to.
- `methodNames` (`...(string | string[] | number | IArguments)`): The method names to bind. Can be specified as individual strings, arrays, numbers, or Arguments objects.

#### Returns

(`Object`): Returns the original object with bound methods.
