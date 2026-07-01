# deepFreeze

深度冻结对象，使其和所有嵌套的对象都不可变。

与 `Object.freeze` 只冻结对象的直接属性不同，
`deepFreeze` 递归地冻结所有嵌套的对象和数组。

## 签名

```typescript
function deepFreeze<T>(obj: T): T;
```

### 参数

- `obj` (`T`): 要深度冻结的对象。

### 返回值

(`T`): 深度冻结后的对象。

## 示例

```typescript
import { deepFreeze } from 'es-toolkit/object';

const frozen = deepFreeze({ user: { name: 'Alex', age: 20 } });

frozen.user = {}; // 严格模式下抛出 TypeError
frozen.user.age = 22; // 严格模式下抛出 TypeError
```
