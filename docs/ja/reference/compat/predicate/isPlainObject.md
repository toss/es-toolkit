# isPlainObject (Lodash 互換性)

::: warning es-toolkitの [isPlainObject](../../predicate/isPlainObject.md)を使用してください

この `isPlainObject` 関数はLodash互換性のための複雑な処理により遅く動作します。

代わりにより高速で現代的な `es-toolkit` の [isPlainObject](../../predicate/isPlainObject.md) を使用してください。

:::

値がプレーンオブジェクトかどうかを確認します。

```typescript
const result = isPlainObject(object);
```

## 参照

### `isPlainObject(object)`

値がプレーンオブジェクトかどうかを確認したい場合に `isPlainObject` を使用してください。プレーンオブジェクトは `{}` リテラル、`new Object()`、または `Object.create(null)` で生成されたオブジェクトです。TypeScript で型ガードとしても動作します。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// プレーンオブジェクト
isPlainObject({}); // true
isPlainObject(new Object()); // true
isPlainObject(Object.create(null)); // true
isPlainObject({ name: 'John', age: 30 }); // true

// プレーンオブジェクトでない値
isPlainObject([]); // false (配列)
isPlainObject(new Date()); // false (Date インスタンス)
isPlainObject(new Map()); // false (Map インスタンス)
isPlainObject(new Set()); // false (Set インスタンス)
isPlainObject(/regex/); // false (正規表現)
isPlainObject(function () {}); // false (関数)
isPlainObject(null); // false
isPlainObject(undefined); // false
isPlainObject('object'); // false (文字列)
isPlainObject(42); // false (数値)
```

クラスインスタンスとプレーンオブジェクトを区別します。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('John');
const plainObj = { name: 'John' };

isPlainObject(person); // false (クラスインスタンス)
isPlainObject(plainObj); // true (プレーンオブジェクト)
```

カスタム `Symbol.toStringTag` プロパティも正しく処理します。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// 書き込み可能な Symbol.toStringTag
const obj1 = {};
obj1[Symbol.toStringTag] = 'CustomObject';
isPlainObject(obj1); // true

// 読み取り専用 Symbol.toStringTag（内蔵オブジェクト）
const date = new Date();
isPlainObject(date); // false
```

#### パラメータ

- `object` (`any`): プレーンオブジェクトかどうかを確認する値です。

#### 戻り値

(`boolean`): 値がプレーンオブジェクトの場合は `true`、そうでなければ `false` を返します。
