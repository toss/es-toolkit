# create (Lodash 互換性)

::: warning `Object.create`を使用してください

この `create` 関数は、複雑なプロパティ処理ロジックにより相対的に遅くなります。

代わりに、より高速で現代的な `Object.create` を使用してください。

:::

与えられたプロトタイプを継承する新しいオブジェクトを作成します。

```typescript
const obj = create(prototype, properties);
```

## 参照

### `create(prototype, properties?)`

プロトタイプに基づいて新しいオブジェクトを作成したい場合は、`create`を使用してください。オプションでプロパティを追加することもできます。

```typescript
import { create } from 'es-toolkit/compat';

// 基本的な使用法
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });
john.greet(); // "Hello, my name is John"

// メソッド継承の確認
console.log('greet' in john); // true
console.log(john.hasOwnProperty('greet')); // false (継承されたプロパティ)
console.log(john.hasOwnProperty('name')); // true (固有のプロパティ)

// 複雑なプロトタイプ
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

console.log(dog.type); // 'animal' (継承された)
console.log(dog.breed); // 'Golden Retriever' (固有のプロパティ)
dog.makeSound(); // 'Woof!' (オーバーライドされたメソッド)

// nullプロトタイプ
const cleanObj = create(null, { data: 'value' });
console.log(cleanObj.toString); // undefined (Object.prototypeメソッドがない)

// 空のオブジェクトの継承
const empty = create({});
console.log(Object.getPrototypeOf(empty)); // {} (空のオブジェクト)
```

プロパティには、列挙可能な文字列キーのみがコピーされます。

```typescript
import { create } from 'es-toolkit/compat';

const proto = { inherited: true };
const props = {
  visible: 'yes',
  [Symbol('hidden')]: 'no', // Symbolキーはコピーされない
};

// 列挙不可能なプロパティを追加
Object.defineProperty(props, 'hidden', {
  value: 'secret',
  enumerable: false,
});

const obj = create(proto, props);
console.log(obj.visible); // 'yes'
console.log(obj.hidden); // undefined (列挙不可能)
console.log(obj[Symbol('hidden')]); // undefined (Symbolキー)
console.log(obj.inherited); // true (継承された)
```

#### パラメータ

- `prototype` (`T extends object`): 継承するプロトタイプオブジェクトです。
- `properties` (`U extends object`, オプション): 新しいオブジェクトに追加するプロパティです。

#### 戻り値

(`T & U`): プロトタイプを継承し、指定されたプロパティを持つ新しいオブジェクトを返します。
