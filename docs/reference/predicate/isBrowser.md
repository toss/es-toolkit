# isBrowser

Checks if the current environment is a browser.

This function checks for the existence of the `window.document` property, which only exists in browser environments.

## Signature

```typescript
function isBrowser(): boolean;
```

### Returns

(`boolean`): Returns `true` if the current environment is a browser, otherwise `false`.

## Examples

```typescript
if (isBrowser()) {
  console.log('This is running in a browser');
  document.getElementById('app').innerHTML = 'Hello World';
}
```
