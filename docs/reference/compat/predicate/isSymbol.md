# isSymbol (Lodash Compatibility)

::: warning Use `typeof` operator instead

This `isSymbol` function is complex due to Symbol object wrapper handling.

Use the simpler and more modern `typeof value === 'symbol'` instead.

:::

Checks if a value is a symbol.

```typescript
const result = isSymbol(value);
```

## Reference

### `isSymbol(value)`

Use `isSymbol` when you want to type-safely check if a value is a symbol. It checks both primitive symbols and Symbol object wrappers. It also works as a type guard in TypeScript.

```typescript
import { isSymbol } from 'es-toolkit/compat';

// Primitive symbols
isSymbol(Symbol('test')); // true
isSymbol(Symbol.for('global')); // true
isSymbol(Symbol.iterator); // true

// Symbol object wrappers
isSymbol(Object(Symbol('test'))); // true

// Other types return false
isSymbol('symbol'); // false
isSymbol(123); // false
isSymbol(true); // false
isSymbol(null); // false
isSymbol(undefined); // false
isSymbol({}); // false
isSymbol([]); // false
```

It also correctly recognizes various built-in symbols.

```typescript
import { isSymbol } from 'es-toolkit/compat';

// Well-known symbols
isSymbol(Symbol.iterator); // true
isSymbol(Symbol.asyncIterator); // true
isSymbol(Symbol.toStringTag); // true
isSymbol(Symbol.hasInstance); // true
isSymbol(Symbol.toPrimitive); // true

// Global symbols
isSymbol(Symbol.for('myGlobalSymbol')); // true

// Custom symbols
const mySymbol = Symbol('mySymbol');
isSymbol(mySymbol); // true
```

#### Parameters

- `value` (`unknown`): The value to check if it's a symbol.

#### Returns

(`value is symbol`): Returns `true` if the value is a symbol, `false` otherwise.
