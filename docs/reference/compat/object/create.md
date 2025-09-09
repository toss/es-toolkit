# create

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an object that inherits from the prototype object.

If `properties` are provided, they will be added to the new object. Only string-keyed enumerable properties directly owned by the properties object are copied. Inherited properties or those with `Symbol` keys are not copied.

## Signature

```typescript
function create<T extends object, U extends object>(prototype: T, properties?: U): T & U;
```

### Parameters

- `prototype` (`T extends object`): The object to inherit from.
- `properties` (`U extends object`, Optional): The properties to assign to the object.

### Returns

(`T & U`): The new object.

## Examples

```typescript
import { create } from 'es-toolkit/compat';

const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });

john.greet(); // Output: Hello, my name is John
```
