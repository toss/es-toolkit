# bindKey (Lodash Compatibility)

::: warning Use arrow functions or the `bind` method
This `bindKey` function operates in a complex and slow manner due to dynamic method binding and placeholder handling. Using JavaScript's native `bind` method or arrow functions is simpler and performs better.

Instead, use the faster and more modern arrow functions or `Function.prototype.bind`.
:::

Binds a method of an object, allowing it to reference methods that may be redefined later.

```typescript
const bound = bindKey(object, key, ...partialArgs);
```

## Reference

### `bindKey(object, key, ...partialArgs)`

Use `bindKey` when you want to bind a method of an object while allowing the method to be changed later. Unlike regular `bind`, it references the latest method each time it's called.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// Bind the method.
let bound = bindKey(object, 'greet', 'hi');
bound('!');
// Returns: 'hi fred!'

// Redefine the method.
object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

// The bound function calls the new method.
bound('!');
// Returns: 'hiya fred!'
```

You can use placeholders to reserve argument positions.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// Use a placeholder.
const bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// Returns: 'hi fred!'
```

Partially applied arguments are passed first, followed by arguments provided at call time.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  add: function (a, b, c) {
    return a + b + c;
  },
};

// Set the first argument in advance.
const bound = bindKey(object, 'add', 10);
bound(20, 30);
// Returns: 60 (10 + 20 + 30)
```

#### Parameters

- `object` (`object`): The object to invoke the method on.
- `key` (`string`): The key of the method to call.
- `...partialArgs` (`any[]`, optional): The arguments to be partially applied to the method. You can use `bindKey.placeholder` to reserve argument positions.

#### Returns

(`(...args: any[]) => any`): Returns a new bound function. This function references the latest method of the object each time it's called.
