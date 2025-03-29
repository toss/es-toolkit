# cond

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns a function that iterates over `pairs` and invokes the corresponding
function of the first predicate to return truthy. The predicate-function pairs
are invoked with the `this` binding and arguments of the created function.

## Signature

```typescript
function cond(pairs: any[][]): (...args: any[]) => unknown;
```

### Parameters

- `pairs` (`Array`): The predicate-function pairs.

### Returns

(`(...args: any[]) => unknown`): Returns the new composite function.

## Examples

```typescript
var func = cond([
  [matches({ 'a': 1 }),           constant('matches A')],
  [conforms({ 'b': isNumber }), constant('matches B')],
  [stubTrue,                      constant('no match')]
]);

func({ 'a': 1, 'b': 2 });
// => 'matches A'

func({ 'a': 0, 'b': 1 });
// => 'matches B'

func({ 'a': '1', 'b': '2' });
// => 'no match'
```