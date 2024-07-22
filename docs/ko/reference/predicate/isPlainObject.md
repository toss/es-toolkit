# isPlainObject

주어진 값이 순수 객체(Plain object)인지 확인해요.

## 인터페이스

```typescript
function isPlainObject(object: object): boolean;
```

### 파라미터

- `object` (`object`): 검사할 값.

### Returns

(`boolean`): 값이 순수 객체이면 true.

## Examples

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```
