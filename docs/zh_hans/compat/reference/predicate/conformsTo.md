# conformsTo (Lodash 兼容性)

检查对象是否满足给定的所有条件函数。

```typescript
const result = conformsTo(target, source);
```

## 用法

### `conformsTo(target, source)`

当您需要检查对象的属性是否都满足指定条件时，请使用 `conformsTo`。对每个属性应用相应的条件函数并确认结果。

```typescript
import { conformsTo } from 'es-toolkit/compat';

// 基本用法
const object = { a: 1, b: 2 };
const conditions = {
  a: n => n > 0,
  b: n => n > 1,
};

conformsTo(object, conditions); // true (满足所有条件)

// 多种条件
const user = { name: 'Alice', age: 25, active: true };
const userValidation = {
  name: s => typeof s === 'string' && s.length > 0,
  age: n => typeof n === 'number' && n >= 18,
  active: b => typeof b === 'boolean',
};

conformsTo(user, userValidation); // true

// 不满足条件的情况
const invalidUser = { name: '', age: 15, active: 'yes' };
conformsTo(invalidUser, userValidation); // false

// 部分条件检查
const partialConditions = {
  age: n => n >= 21,
};
conformsTo(user, partialConditions); // true (仅检查 age)

// 缺少属性的情况
const incompleteObject = { a: 1 }; // 没有 b 属性
const strictConditions = {
  a: n => n > 0,
  b: n => n > 0,
};
conformsTo(incompleteObject, strictConditions); // false (没有 b 属性)
```

#### 参数

- `target` (`Record<PropertyKey, any>`): 要检查的对象。
- `source` (`Record<PropertyKey, (value: any) => boolean>`): 包含各属性条件函数的对象。

#### 返回值

(`boolean`): 如果对象满足所有条件则返回 `true`，否则返回 `false`。
