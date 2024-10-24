# invariant

与えられた条件が真であることを主張します。条件が偽の場合は、指定されたメッセージでエラーが投げられますます。

## インターフェース

```typescript
function invariant(condition: unknown, message: string): asserts condition;
```

### パラメータ

- `condition` (`unknown`): 評価する条件。
- `message` (`string`): 条件が偽である場合に投げるエラーメッセージ。

### 戻り値

(`void`): 条件が真の場合、voidを返します。

### エラー

条件が偽の場合、指定されたメッセージでエラーが投げられます。

## 例

```typescript
// This call will succeed without any errors
invariant(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
invariant(false, 'This should throw');

// Example of using invariant with a condition
invariant(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
invariant(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using invariant to check if a number is positive
invariant(number > 0, 'Number must be positive');
```
