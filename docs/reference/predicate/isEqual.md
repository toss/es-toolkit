# isEqual

The `isEqual` function checks if two values are equal, including support for `Date`, `RegExp`, and deep object comparison.

## Signature

```typescript
function isEqual(a: unknown, b: unknown): boolean;
```

## Parameters

- **`a`**: `unknown` - The first value to compare.
- **`b`**: `unknown` - The second value to compare.

## Returns

- **`boolean`** - Returns `true` if the values are equal, otherwise `false`.

## Examples

### Example 1: Comparing Primitive Values

```javascript
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true
isEqual(1, 2); // false
isEqual('hello', 'world'); // false
isEqual(true, false); // false
```

### Example 2: Comparing Special Cases

```javascript
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

### Example 3: Comparing Date Objects

```javascript
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

const date3 = new Date('2021-01-01');
isEqual(date1, date3); // false
```

### Example 4: Comparing RegExp Objects

```javascript
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

const regex3 = /hello/i;
isEqual(regex1, regex3); // false
```

### Example 5: Comparing Objects

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
isEqual(obj1, obj2); // true

const obj3 = { a: 1, b: { c: 3 } };
isEqual(obj1, obj3); // false

const obj4 = { a: 1, b: 2 };
const obj5 = { a: 1, c: 2 };
isEqual(obj4, obj5); // false
```

### Example 6: Comparing Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
isEqual(arr1, arr2); // true

const arr3 = [1, 2, 4];
isEqual(arr1, arr3); // false

const arr4 = [1, 2];
isEqual(arr1, arr4); // false
```
