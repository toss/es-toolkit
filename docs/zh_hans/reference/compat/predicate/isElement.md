# isElement (Lodash 兼容性)

::: warning 请使用 `instanceof HTMLElement`

这个 `isElement` 函数由于结构性检查导致准确性较低且性能较慢。

建议使用更准确、更现代的 `instanceof HTMLElement` 或 `element.nodeType === 1` 检查。

:::

检查值是否为 DOM 元素。

```typescript
const result = isElement(value);
```

## 参考

### `isElement(value)`

当需要检查给定值是否为 DOM 元素时使用 `isElement`。由于此函数使用结构性检查，结果可能不完全准确。

```typescript
import { isElement } from 'es-toolkit/compat';

// DOM 元素
isElement(document.body); // true
isElement(document.createElement('div')); // true
isElement(document.querySelector('p')); // true (如果元素存在)

// 非 DOM 元素的值
isElement('<body>'); // false
isElement({}); // false
isElement(null); // false
isElement(undefined); // false

// 文本节点或其他节点类型
isElement(document.createTextNode('text')); // false
isElement(document.createComment('comment')); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值看起来像 DOM 元素则返回 `true`，否则返回 `false`。