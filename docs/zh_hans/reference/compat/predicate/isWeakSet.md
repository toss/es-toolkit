# isWeakSet (Lodash 兼容性)

::: warning 使用 `instanceof` 运算符
这个 `isWeakSet` 函数是 Lodash 兼容性的函数，但是简单的类型检查。

请使用更简单且现代的 `value instanceof WeakSet`。
:::

检查值是否为 WeakSet。

```typescript
const result = isWeakSet(value);
```

## 参考

### `isWeakSet(value)`

当您想类型安全地检查值是否为 WeakSet 时使用 `isWeakSet`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet 检查
const weakSet = new WeakSet();
isWeakSet(weakSet); // true

// 其他类型返回 false
isWeakSet(new Set()); // false
isWeakSet(new Map()); // false
isWeakSet(new WeakMap()); // false
isWeakSet([]); // false
isWeakSet({}); // false
isWeakSet('weakset'); // false
isWeakSet(123); // false
isWeakSet(null); // false
isWeakSet(undefined); // false
```

也与其他类似的集合进行区分。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet vs Set
const obj = {};
const weakSet = new WeakSet([obj]);
const set = new Set([obj]);

isWeakSet(weakSet); // true
isWeakSet(set); // false

// WeakSet vs WeakMap
isWeakSet(new WeakSet()); // true
isWeakSet(new WeakMap()); // false

// WeakSet vs 数组
isWeakSet(new WeakSet()); // true
isWeakSet([]); // false
```

在利用 WeakSet 的特殊属性时很有用。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

function addWeakReference(collection: unknown, item: object) {
  if (isWeakSet(collection)) {
    // WeakSet 只能存储对象，并维护弱引用
    collection.add(item);
    console.log('已存储到 WeakSet 中作为弱引用');

    // WeakSet 没有大小信息且不可迭代
    console.log('WeakSet 没有大小信息且不可迭代');
  } else {
    console.log('不是 WeakSet');
  }
}

const weakSet = new WeakSet();
const regularSet = new Set();
const obj = { id: 1 };

addWeakReference(weakSet, obj); // "已存储到 WeakSet 中作为弱引用"
addWeakReference(regularSet, obj); // "不是 WeakSet"
```

对于防止内存泄漏的对象跟踪很有用。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// DOM 元素跟踪示例
function trackDOMElement(tracker: unknown, element: Element) {
  if (isWeakSet(tracker)) {
    // 当 DOM 元素被删除时，WeakSet 中也会自动删除
    tracker.add(element);
    console.log('开始跟踪 DOM 元素');

    // 稍后检查跟踪状态
    if (tracker.has(element)) {
      console.log('此元素正在被跟踪');
    }
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 WeakSet 的值。

#### 返回值

(`value is WeakSet<object>`): 如果值为 WeakSet 则返回 `true`，否则返回 `false`。
