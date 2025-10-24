# isPlainObject

检查值是否为普通对象（plain object）。

```typescript
const result = isPlainObject(value);
```

## 参考

### `isPlainObject(value)`

当您想检查值是否为普通对象时，请使用 `isPlainObject`。普通对象是使用对象字面量（`{}`）或 `Object` 构造函数创建的对象。类实例、数组或其他特殊对象不是普通对象。

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

// 普通对象
console.log(isPlainObject({})); // true
console.log(isPlainObject({ name: 'John', age: 30 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject(new Object())); // true

// 非普通对象
console.log(isPlainObject([])); // false（数组）
console.log(isPlainObject(new Date())); // false（Date 对象）
console.log(isPlainObject(new Set())); // false（Set 对象）
console.log(isPlainObject(new Map())); // false（Map 对象）
console.log(isPlainObject(null)); // false（null）
console.log(isPlainObject(42)); // false（数字）
console.log(isPlainObject('hello')); // false（字符串）

// 类实例
class MyClass {}
console.log(isPlainObject(new MyClass())); // false
```

在序列化数据或验证配置对象时很有用。

```typescript
function processConfig(config: unknown) {
  if (isPlainObject(config)) {
    // config 现在被缩小为 Record<PropertyKey, any> 类型
    console.log('有效的配置对象');
    Object.keys(config).forEach(key => {
      console.log(`${key}: ${config[key]}`);
    });
  } else {
    throw new Error('配置必须是普通对象');
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为普通对象的值。

#### 返回值

(`value is Record<PropertyKey, any>`): 如果值为普通对象则返回 `true`，否则返回 `false`。

## 性能比较

|                   | [包大小](../../bundle-size.md) | [运行时性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------------- |
| es-toolkit        | 279 字节（减少 82.4%）         | 1,505,684 次（快 1.70×）           |
| es-toolkit/compat | 435 字节（减少 72.5%）         | 2,013,760 次（快 2.28×）           |
| lodash-es         | 1,586 字节                     | 882,669 次                         |
