# deepFreeze

递归冻结对象及其中嵌套的所有对象和数组，使它们无法被修改。

```typescript
const frozen = deepFreeze(obj);
```

## 用法

### `deepFreeze(obj)`

当您想让对象完全不可变时，请使用 `deepFreeze`。`Object.freeze` 只会冻结对象的顶层属性，嵌套对象仍然可以被修改。`deepFreeze` 会递归冻结所有嵌套的对象和数组，让任何层级的值都无法被更改。

对象会被就地冻结，并原样返回相同的引用。已经冻结的对象会被跳过，因此即使存在循环引用也能安全处理。

```typescript
import { deepFreeze } from 'es-toolkit/object';

// 嵌套对象也会被冻结
const user = deepFreeze({ name: 'Alex', settings: { theme: 'dark' } });
user.settings.theme = 'light'; // 严格模式下抛出 TypeError
// user.settings 仍然是 { theme: 'dark' }

// 数组及其中的对象也会被冻结
const config = deepFreeze({ tags: ['admin', 'user'] });
config.tags.push('guest'); // 严格模式下抛出 TypeError
```

#### 参数

- `obj` (`T`): 要深度冻结的对象。

#### 返回值

(`T`): 返回同一个对象，其自身及所有嵌套的对象和数组都已被冻结。
