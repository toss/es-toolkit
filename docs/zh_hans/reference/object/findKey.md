# findKey

查找对象中满足所提供的测试函数的第一个元素的键。

## Signature

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### Parameters

- `obj` (`Record<T, K>`): 要搜索的对象。
- `predicate` (`(value: K, key: T, obj: Record<T, K>) => boolean`): 对对象中的每个值执行的函数。

### Returns

(`T | undefined`): 对象中满足所提供的测试功能的第一个元素的键，如果没有元素通过测试，则为未定义。

## Examples

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```
