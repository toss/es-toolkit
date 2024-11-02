# identity

입력값을 변경하지 않고 반환합니다.

## 인터페이스

```typescript
function identity<T>(x: T): T;
```

### 파라미터

- `x` (`T`): 반환할 값.

### 반환 값

(`T`): 입력된 값.

## 예시

```typescript
// Returns 5
identity(5);

// Returns 'hello'
identity('hello');

// Returns { key: 'value' }
identity({ key: 'value' });
```
