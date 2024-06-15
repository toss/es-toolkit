# isEmpty

Checks if a given value is empty.
This function determines whether a value is considered empty based on a specific set of criteria. It works with various types such as strings, arrays, objects, maps, and sets, and it correctly identifies empty values.

## Signature

function isEmpty<T>(value: T): boolean;

### Parameters

- value (T): The value to be checked for emptiness.

### Returns

- (boolean): true if the value is empty, otherwise false.

### Empty Values

The following values are considered empty:

- null
- undefined
- false
- 0
- NaN
- "" (empty string)
- empty arrays
- empty objects (objects with no enumerable own-properties)
- empty Map and Set
- objects with a valid length property that is 0 or negative

## Examples

```typescript
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(false); // true
isEmpty(0); // true
isEmpty(NaN); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true

isEmpty('a'); // false
isEmpty([0]); // false
isEmpty(1); // false
```
