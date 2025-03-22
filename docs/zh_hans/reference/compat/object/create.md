# create

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个从原型对象继承的对象。如果给定了一个属性对象，它的自身可枚举的字符串键属性将被分配给创建的对象。

## 签名

```typescript
function create<T extends object, U extends object>(prototype: T, properties?: U): T & U;
```

### 参数

- `prototype` (`T extends object`): 要继承的对象。
- `properties` (`U extends object`, 可选): 要分配给对象的属性。

### 返回值

(`T & U`): 返回创建的新对象。

## 示例

```typescript
import { create } from 'es-toolkit/compat';

const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });

john.greet(); // 输出: Hello, my name is John
```
