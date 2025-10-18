# cloneDeep

Creates a deep copy of the given value.

```typescript
const deepCloned = cloneDeep(obj);
```

## Reference

### `cloneDeep(obj)`

Use `cloneDeep` when you want to completely copy an object or array, including all nested structures. A deep copy creates new copies of all nested objects and arrays, making the original and the copy completely independent.

```typescript
import { cloneDeep } from 'es-toolkit/object';

// Primitive values are returned as-is
const num = 29;
const clonedNum = cloneDeep(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// Deep copy of nested objects
const obj = { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] };
const clonedObj = cloneDeep(obj);
console.log(clonedObj); // { a: { b: { c: 'deep' } }, d: [1, 2, { e: 'nested' }] }
console.log(clonedObj === obj); // false
console.log(clonedObj.a === obj.a); // false (nested objects are also copied)
console.log(clonedObj.d === obj.d); // false (nested arrays are also copied)
console.log(clonedObj.d[2] === obj.d[2]); // false (objects within arrays are also copied)

// Modifying the original doesn't affect the copy
const original = { a: { count: 1 } };
const copied = cloneDeep(original);
original.a.count = 2;
console.log(copied.a.count); // 1 (unchanged)
```

It supports various JavaScript types like `Map` and `Set`, and handles circular references safely.

```typescript
// Deep copy of Map and Set
const map = new Map([['key', { nested: 'value' }]]);
const clonedMap = cloneDeep(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key') !== map.get('key')); // true (nested object is also copied)

// Handles circular references safely
const circular: any = { name: 'test' };
circular.self = circular;
const clonedCircular = cloneDeep(circular);
console.log(clonedCircular !== circular); // true
console.log(clonedCircular.self === clonedCircular); // true (circular reference is maintained)
```

For read-only properties defined by getters, the return value of the getter is stored as a regular property in the copied object.

```typescript
const source = {
  get computedValue() {
    return 42;
  },
  normalValue: 'hello',
};

const cloned = cloneDeep(source);
console.log(cloned); // { computedValue: 42, normalValue: 'hello' }
```

#### Parameters

- `obj` (`T`): The value to deeply copy. It can be any type, such as objects, arrays, or primitive values.

#### Returns

(`T`): A deep copy of the given value.
