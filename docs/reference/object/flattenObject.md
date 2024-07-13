# flattenObject

Flattens a nested object into a single-level object with the paths as keys.

This function takes a nested object and returns a new object with only one level of depth, where each key is a string representing the path to the original nested value, joined by a specified separator. It recursively explores the nested objects and constructs the keys for the flattened object accordingly.

## Signature

```typescript
function flattenObject<K extends Record<string, unknown>>(
  obj: K, 
  separator: string = '.'
): Record<string, unknown>;
```

### Parameters

- `obj` (`Record<string, unknown>`): The input object to be flattened.
- `separator` (`string`): The separator used to join nested keys. Defaults to '.'.

### Returns

(`Record<string, unknown>`): A new, flattened object.

## Examples

```typescript
const obj = {
    "name": "test",
    "company": {
        "name": "Company A",
        "address": {
            "city": "Ohio",
            "country": "USA"
        }
    }
};
const separator = '.';
console.log(flattenObject(obj, separator));
// Output:
// {
//     "name": "test",
//     "company.name": "Company A",
//     "company.address.city": "Ohio",
//     "company.address.country": "USA",
// }
```