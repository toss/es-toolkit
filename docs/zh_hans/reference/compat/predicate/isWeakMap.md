# isWeakMap (Lodash 兼容性)

::: warning 使用 `instanceof` 运算符
这个 `isWeakMap` 函数是 Lodash 兼容性的函数，但是简单的类型检查。

请使用更简单且现代的 `value instanceof WeakMap`。
:::

检查值是否为 WeakMap。

```typescript
const result = isWeakMap(value);
```

## 用法

### `isWeakMap(value)`

当您想类型安全地检查值是否为 WeakMap 时使用 `isWeakMap`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap 检查
const weakMap = new WeakMap();
isWeakMap(weakMap); // true

// 其他类型返回 false
isWeakMap(new Map()); // false
isWeakMap(new Set()); // false
isWeakMap(new WeakSet()); // false
isWeakMap({}); // false
isWeakMap([]); // false
isWeakMap('weakmap'); // false
isWeakMap(123); // false
isWeakMap(null); // false
isWeakMap(undefined); // false
```

也与其他类似的集合进行区分。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap vs Map
const obj = {};
const weakMap = new WeakMap([[obj, 'value']]);
const map = new Map([[obj, 'value']]);

isWeakMap(weakMap); // true
isWeakMap(map); // false

// WeakMap vs WeakSet
isWeakMap(new WeakMap()); // true
isWeakMap(new WeakSet()); // false

// WeakMap vs 普通对象
isWeakMap(new WeakMap()); // true
isWeakMap({}); // false
```

在利用 WeakMap 的特殊属性时很有用。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

function setupWeakReference(collection: unknown, key: object, value: any) {
  if (isWeakMap(collection)) {
    // WeakMap 只能使用对象作为键，并维护弱引用
    collection.set(key, value);
    console.log('已存储到 WeakMap 中作为弱引用');

    // WeakMap 没有大小信息
    console.log('WeakMap 没有大小信息');
  } else {
    console.log('不是 WeakMap');
  }
}

const weakMap = new WeakMap();
const regularMap = new Map();
const obj = { id: 1 };

setupWeakReference(weakMap, obj, 'data'); // "已存储到 WeakMap 中作为弱引用"
setupWeakReference(regularMap, obj, 'data'); // "不是 WeakMap"
```

#### 参数

- `value` (`unknown`): 要检查是否为 WeakMap 的值。

#### 返回值

(`value is WeakMap<object, any>`): 如果值为 WeakMap 则返回 `true`，否则返回 `false`。
