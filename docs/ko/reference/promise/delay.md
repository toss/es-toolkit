# delay

Delays the execution of code for a specified number of milliseconds.

This function returns a Promise that resolves after the specified delay, allowing you to use it 
with async/await to pause execution.

## Signature

```typescript
function delay(ms: number): Promise<void>;
```

### Parameters 

- `ms` (`number`): The number of milliseconds to delay.

### Returns

(`Promise<void>`): A Promise that resolves after the specified delay.

## Examples

```typescript
async function foo() {
  console.log('Start');
  await delay(1000); // Delays execution for 1 second
  console.log('End');
}

foo();
```
