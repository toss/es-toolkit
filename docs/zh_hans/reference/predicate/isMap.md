# isMap

检查值是否为Map。

```typescript
const result = isMap(value);
```

## 参考

### `isMap(value)`

当你想检查值是否为Map实例时，使用`isMap`。它使用`instanceof`运算符检查是否为`Map`。

```typescript
import { isMap } from 'es-toolkit/predicate';

// Map实例
const map = new Map([['key', 'value']]);
console.log(isMap(map)); // true

// 非Map值
console.log(isMap(new Set())); // false
console.log(isMap(new WeakMap())); // false
console.log(isMap({})); // false
console.log(isMap([])); // false
console.log(isMap(null)); // false
```

在TypeScript中也可以用作类型守卫。

```typescript
function processValue(value: unknown) {
  if (isMap(value)) {
    // 现在value被缩小为Map<any, any>类型
    console.log(value.size);
    value.set('new-key', 'new-value');
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为`Map`的值。

#### 返回值

(`value is Map<any, any>`): 如果值为Map则返回`true`，否则返回`false`。
