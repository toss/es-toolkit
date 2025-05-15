# isSemver

Checks if a given string is a valid semantic version according to the [Semantic Versioning 2.0.0](https://semver.org/) specification.

## Signature

```typescript
function isSemver(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to test if it is a valid semantic version.

### Returns

(`boolean`): Returns `true` if `value` is a valid semantic version, otherwise `false`.

## Examples

```typescript
const value1 = '1.0.0';
const value2 = '1.0.0-alpha+001';
const value3 = '1.0';

console.log(isSemver(value1)); // true
console.log(isSemver(value2)); // true
console.log(isSemver(value3)); // false
```
