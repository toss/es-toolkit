# identity

入力された値を変更せずに返します。

## インターフェース

```typescript
function identity<T>(x: T): T;
```

### パラメータ

- `x` (`T`): 返される値。

### 戻り値

(`T`): 入力値。

## 例

```typescript
// Returns 5
identity(5);

// Returns 'hello'
identity('hello');

// Returns { key: 'value' }
identity({ key: 'value' });
```
