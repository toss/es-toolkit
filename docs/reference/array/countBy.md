# countBy

Count the occurrences of each item in an array based on a `mapper` function.

## Signature

```typescript
function countBy<T>(arr: T[], mapper: (item: T) => string): Record<string, number>
```

### Parameters

- `arr` (`T[]`): The input array to count occurrences.
- `mapper` (`(item: T) => string`): The transformation function that maps each item to a string key.

### Returns

(`Record<string, number>`) An object containing the count of each item based on the transformation function.

## Examples

```javascript
import { countBy } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5, 6];
const result = countBy(array, x => x % 2 === 0 ? 'even' : 'odd');

console.log(result);
// Output: { 'odd': 3, 'even': 3 }
```

