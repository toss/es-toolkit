# findKey

Finds the key of the first element in the object that satisfies the provided testing function.

## Signature

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### Parameters

- `obj` (`T extends Record<any, any>`): The object to search.
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): The function to execute on each value in the object.

### Returns

(`keyof T | undefined`): The key of the first element in the object that satisfies the provided testing function, or undefined if no element passes the test.

## Examples

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```

## Compatibility with Lodash

Import `findKey` from `es-toolkit/compat` for full compatibility with lodash.

You can specify the condition for finding keys in several ways:

- **Predicate function**: You can provide a predicate function that will be applied to each value in the object. The function should return `true` for elements that match the criteria. The search continues until the predicate returns `true` for the first time.
- **Partial object**: You can also provide a partial object, and the function will return the key of the first element in the object that matches the properties of the provided object.
- **Property-value pair**: Alternatively, you can specify a property-value pair, where the function will return the key of the first element that has the specified property matching the given value.
- **Property name**: Lastly, you can provide a property name, and the function will return the key of the first element where the specified property has a truthy value.

### Signature

```typescript
export function findKey<T extends Record<any, any>>(
  obj: T,
  conditionToFind: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
export function findKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;
export function findKey<T extends Record<any, any>>(
  obj: T,
  propertyToFind: [keyof T[keyof T], any]
): keyof T | undefined;
export function findKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### Examples

```typescript
const users = { barney: { age: 36 }, fred: { age: 40 } };

findKey(users, o => o.age < 40);
// => 'barney'
findKey(users, { age: 36 });
// => 'barney'
findKey(users, ['age', 36]);
// => 'barney'

const languages = { javascript: { active: false }, typescript: { active: true } };
findKey(users, 'active');
// => 'typescript'
```
