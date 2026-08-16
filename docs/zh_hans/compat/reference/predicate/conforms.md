# conforms (Lodash 兼容性)

接收一个包含条件函数的对象，创建一个函数来检查其他对象是否满足所有条件。

```typescript
const checker = conforms(predicates);
```

## 用法

### `conforms(source)`

当您需要一次性检查多个属性的条件时，请使用 `conforms`。此函数生成一个验证函数，在后续检查多个对象时非常有用。

```typescript
import { conforms } from 'es-toolkit/compat';

// 定义条件函数
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const isString = s => typeof s === 'string';

// 创建包含多个条件的验证函数
const validator = conforms({
  a: isPositive,
  b: isEven,
  c: isString,
});

// 验证对象
validator({ a: 2, b: 4, c: 'hello' }); // true (满足所有条件)
validator({ a: -1, b: 4, c: 'hello' }); // false (a 不是正数)
validator({ a: 2, b: 3, c: 'hello' }); // false (b 不是偶数)
validator({ a: 2, b: 4, c: 123 }); // false (c 不是字符串)

// 在数组过滤中使用
const users = [
  { age: 25, score: 80, name: 'Alice' },
  { age: 17, score: 95, name: 'Bob' },
  { age: 30, score: 75, name: 'Charlie' },
];

const adultHighScorer = conforms({
  age: n => n >= 18,
  score: n => n >= 80,
});

const filteredUsers = users.filter(adultHighScorer);
// [{ age: 25, score: 80, name: 'Alice' }]
```

#### 参数

- `source` (`Record<PropertyKey, (value: any) => boolean>`): 包含各属性条件函数的对象。

#### 返回值

(`(object: Record<PropertyKey, any>) => boolean`): 返回一个函数，用于检查给定对象是否满足所有条件。
