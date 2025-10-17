# create (Lodash 兼容性)

::: warning 请使用 `Object.create`

这个 `create` 函数由于复杂的属性处理逻辑而相对较慢。

请改用更快、更现代的 `Object.create`。

:::

创建一个继承给定原型的新对象。

```typescript
const obj = create(prototype, properties);
```

## 参考

### `create(prototype, properties?)`

当您想要基于原型创建新对象时,请使用 `create`。您也可以选择添加属性。

```typescript
import { create } from 'es-toolkit/compat';

// 基本用法
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });
john.greet(); // "Hello, my name is John"

// 检查方法继承
console.log('greet' in john); // true
console.log(john.hasOwnProperty('greet')); // false (继承的属性)
console.log(john.hasOwnProperty('name')); // true (自有属性)

// 复杂的原型
const animal = {
  type: 'animal',
  makeSound() {
    console.log('Some generic sound');
  },
};

const dog = create(animal, {
  breed: 'Golden Retriever',
  name: 'Buddy',
  makeSound() {
    console.log('Woof!');
  },
});

console.log(dog.type); // 'animal' (继承的)
console.log(dog.breed); // 'Golden Retriever' (自有属性)
dog.makeSound(); // 'Woof!' (覆盖的方法)

// null原型
const cleanObj = create(null, { data: 'value' });
console.log(cleanObj.toString); // undefined (没有Object.prototype方法)

// 继承空对象
const empty = create({});
console.log(Object.getPrototypeOf(empty)); // {} (空对象)
```

只有可枚举的字符串键才会被复制。

```typescript
import { create } from 'es-toolkit/compat';

const proto = { inherited: true };
const props = {
  visible: 'yes',
  [Symbol('hidden')]: 'no', // Symbol键不会被复制
};

// 添加不可枚举属性
Object.defineProperty(props, 'hidden', {
  value: 'secret',
  enumerable: false,
});

const obj = create(proto, props);
console.log(obj.visible); // 'yes'
console.log(obj.hidden); // undefined (不可枚举)
console.log(obj[Symbol('hidden')]); // undefined (Symbol键)
console.log(obj.inherited); // true (继承的)
```

#### 参数

- `prototype` (`T extends object`): 要继承的原型对象。
- `properties` (`U extends object`, 可选): 要添加到新对象的属性。

#### 返回值

(`T & U`): 返回一个继承原型并具有指定属性的新对象。
