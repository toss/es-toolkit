# isSymbol

Checks if a given value is a `symbol`.

```typescript
const result = isSymbol(value);
```

## Usage

### `isSymbol(value)`

Use `isSymbol` when you want to check if a value is a `symbol`.

```typescript
import { isSymbol } from 'es-toolkit/predicate';

// symbol values
const sym1 = Symbol('description');
const sym2 = Symbol.for('global');
const sym3 = Symbol.iterator;

console.log(isSymbol(sym1)); // true
console.log(isSymbol(sym2)); // true
console.log(isSymbol(sym3)); // true

// Non-symbol values
console.log(isSymbol('symbol')); // false
console.log(isSymbol(123)); // false
console.log(isSymbol(true)); // false
console.log(isSymbol(null)); // false
console.log(isSymbol(undefined)); // false
console.log(isSymbol({})); // false
console.log(isSymbol([])); // false
```

Useful for safely accessing object properties or managing metadata.

```typescript
// Safe property access
function getPropertyValue(obj: object, key: unknown) {
  if (isSymbol(key)) {
    // TypeScript infers key as symbol
    return (obj as any)[key];
  }

  if (typeof key === 'string') {
    return (obj as any)[key];
  }

  return undefined;
}

// Usage examples
const mySymbol = Symbol('myKey');
const obj = {
  name: 'John',
  [mySymbol]: 'secret value',
};

console.log(getPropertyValue(obj, 'name')); // 'John'
console.log(getPropertyValue(obj, mySymbol)); // 'secret value'
console.log(getPropertyValue(obj, 123)); // undefined

// Metadata storage
class MetadataManager {
  private metadata = new Map<symbol, any>();

  setMetadata(key: unknown, value: any): boolean {
    if (isSymbol(key)) {
      this.metadata.set(key, value);
      return true;
    }
    return false;
  }

  getMetadata(key: unknown): any {
    if (isSymbol(key)) {
      return this.metadata.get(key);
    }
    return undefined;
  }

  hasMetadata(key: unknown): boolean {
    if (isSymbol(key)) {
      return this.metadata.has(key);
    }
    return false;
  }
}

// Usage examples
const manager = new MetadataManager();
const typeSymbol = Symbol('type');
const versionSymbol = Symbol('version');

manager.setMetadata(typeSymbol, 'user');
manager.setMetadata(versionSymbol, '1.0');
manager.setMetadata('invalid', 'value'); // false, not a symbol

console.log(manager.getMetadata(typeSymbol)); // 'user'
console.log(manager.hasMetadata(versionSymbol)); // true
```

#### Parameters

- `value` (`unknown`): The value to check if it's a symbol.

#### Returns

(`value is symbol`): Returns `true` if the value is a symbol, `false` otherwise.
