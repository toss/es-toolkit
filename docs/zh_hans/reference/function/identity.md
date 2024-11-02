# identity

返回输入值保持不变。

## 签名

```typescript
function identity<T>(x: T);
```

### 参数

- `x` (`T`): 要返回的值。

### 返回值

(`T`): 输入值。

## 示例

```typescript
// Returns 5
identity(5);

// Returns 'hello'
identity('hello');

// Returns { key: 'value' }
identity({ key: 'value' });
```
