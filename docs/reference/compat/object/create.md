# create (Lodash compatibility)

::: warning Use `Object.create` instead

This `create` function is relatively slow due to complex property processing logic.

Use the faster and more modern `Object.create` instead.

:::

Creates a new object that inherits from the given prototype.

```typescript
const obj = create(prototype, properties);
```

## Reference

### `create(prototype, properties?)`

Use `create` when you want to create a new object based on a prototype. You can optionally add properties as well.

```typescript
import { create } from 'es-toolkit/compat';

// Basic usage
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });
john.greet(); // "Hello, my name is John"

// Checking method inheritance
console.log('greet' in john); // true
console.log(john.hasOwnProperty('greet')); // false (inherited property)
console.log(john.hasOwnProperty('name')); // true (own property)

// Complex prototype
const animal = {
  type: 'animal',
  makeSound() {
    console.log('Some generic sound');
  },
};

const dog = create(animal, {
  breed: 'Golden Retriever',
  name: 'Buddy',
  makeSound() {
    console.log('Woof!');
  },
});

console.log(dog.type); // 'animal' (inherited)
console.log(dog.breed); // 'Golden Retriever' (own property)
dog.makeSound(); // 'Woof!' (overridden method)

// null prototype
const cleanObj = create(null, { data: 'value' });
console.log(cleanObj.toString); // ƒ toString() { [native code] } (null is equivalent to {})

// Inheriting empty object
const empty = create({});
console.log(Object.getPrototypeOf(empty)); // {} (empty object)
```

Only enumerable string keys are copied for properties.

```typescript
import { create } from 'es-toolkit/compat';

const proto = { inherited: true };
const props = {
  visible: 'yes',
  [Symbol('hidden')]: 'no', // Symbol keys are not copied
};

// Add non-enumerable property
Object.defineProperty(props, 'hidden', {
  value: 'secret',
  enumerable: false,
});

const obj = create(proto, props);
console.log(obj.visible); // 'yes'
console.log(obj.hidden); // undefined (non-enumerable)
console.log(obj[Symbol('hidden')]); // undefined (Symbol key)
console.log(obj.inherited); // true (inherited)
```

#### Parameters

- `prototype` (`T extends object`): The prototype object to inherit from.
- `properties` (`U extends object`, optional): Properties to add to the new object.

#### Returns

(`T & U`): Returns a new object that inherits from the prototype and has the specified properties.
