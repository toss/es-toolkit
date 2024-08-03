# bind

Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.

The `bind.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.

**Note:** Unlike native `Function#bind`, this method doesn't set the `length` property of bound functions.

## Signature

```typescript
function bind(func: (...args: any[]) => any, thisArg?: any, ...partials: any[]): (...args: any[]) => any;
namespace bind {
  placeholder: symbol;
}
```

### Parameters

- `fn` (`(...args: any[]) => any`): The function to bind.
- `thisArg` (`any`, optional): The `this` binding of `func`.
- `partials` (`any[]`): The arguments to be partially applied.

### Returns

(`(...args: any[]) => any`): Returns the new bound function.

## Examples

```typescript
import { bind } from 'es-toolkit/function';

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'fred' };

let bound = bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
bound = bind(greet, object, bind.placeholder, '!');
bound('hi');
// => 'hi fred!'
```
