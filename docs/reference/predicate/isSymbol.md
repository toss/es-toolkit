# isSymbol

Check whether a value is a symbol.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `symbol`.

## Signature

```typescript
function isSymbol(value: unknown): value is symbol;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`value is symbol`): True if the value is a symbol, otherwise false.

### Examples

```typescript
import { isSymbol } from 'es-toolkit/predicate';

isSymbol(Symbol('a')); // true
isSymbol(Symbol.for('a')); // true
isSymbol(Symbol.iterator); // true
isSymbol(Object(Symbol())); // true

isSymbol(null); // false
isSymbol(undefined); // false
isSymbol('123'); // false
isSymbol(false); // false
isSymbol(123n); // false
isSymbol({}); // false
isSymbol([1, 2, 3]); // false
```
