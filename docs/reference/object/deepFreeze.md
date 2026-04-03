# deepFreeze

Deeply freezes an object, making it and all nested objects immutable.

Unlike `Object.freeze`, which only freezes the immediate properties of an object,
`deepFreeze` recursively freezes all nested objects and arrays.

## Signature

```typescript
function deepFreeze<T>(obj: T): T;
```

### Parameters

- `obj` (`T`): The object to deeply freeze.

### Returns

(`T`): The deeply frozen object.

## Examples

```typescript
import { deepFreeze } from 'es-toolkit/object';

const frozen = deepFreeze({ user: { name: 'Alex', age: 20 } });

frozen.user = {}; // TypeError in strict mode
frozen.user.age = 22; // TypeError in strict mode
```
