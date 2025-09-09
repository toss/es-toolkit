# assert

与えられた条件が真であることを主張します。条件が偽の場合は、指定されたメッセージでエラーが投げられますます。

この関数は、[invariant](./invariant.md) 関数のエイリアスです。

## インターフェース

```typescript
function assert(condition: unknown, message: string): asserts condition;
function assert(condition: unknown, error: Error): asserts condition;
```

### パラメータ

- `condition` (`unknown`): 評価する条件。
- `message` (`string` | `Error`): 条件が偽である場合に投げるエラーメッセージ。

### 戻り値

(`void`): 条件が真の場合、voidを返します。

### エラー

条件が偽の場合、指定されたメッセージでエラーが投げられます。

## 例

```typescript
// This call will succeed without any errors
assert(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
assert(false, 'This should throw');

// Example of using assert with a condition
assert(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
assert(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using assert to check if a number is positive
assert(number > 0, 'Number must be positive');

// Example of using assert with an error
assert(false, new Error('This should throw'));

// Example of using assert with a custom error
class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}
assert(false, new CustomError('This should throw'));
```
