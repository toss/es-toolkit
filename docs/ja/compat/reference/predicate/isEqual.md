# isEqual (Lodash互換性)

::: warning `es-toolkit`の[isEqual](../../predicate/isEqual.md)を使用してください
この`isEqual`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isEqual](../../predicate/isEqual.md)を使用してください。
:::

二つの値が同じかどうかを深く比較して確認します。

```typescript
const result = isEqual(value1, value2);
```

## 使用法

### `isEqual(a, b)`

二つの値が同じかどうかを深く比較して確認したい場合は`isEqual`を使用してください。Date、RegExp、オブジェクト、配列などの複雑な型も内容まで比較します。

```typescript
import { isEqual } from 'es-toolkit/compat';

// 基本型の比較
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// オブジェクトの深い比較
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
isEqual({ a: 1 }, { a: 1, b: undefined }); // false

// 配列の深い比較
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, [2, 3]], [1, [2, 3]]); // true

// Dateオブジェクトの比較
isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
isEqual(new Date('2020-01-01'), new Date('2020-01-02')); // false

// RegExpオブジェクトの比較
isEqual(/abc/g, /abc/g); // true
isEqual(/abc/g, /abc/i); // false
```

ネストされたオブジェクトや配列も再帰的に比較します。

```typescript
import { isEqual } from 'es-toolkit/compat';

const obj1 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

const obj2 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

isEqual(obj1, obj2); // true
```

#### パラメータ

- `a` (`unknown`): 比較する最初の値です。
- `b` (`unknown`): 比較する2番目の値です。

#### 戻り値

(`boolean`): 二つの値が同じ場合は`true`、異なる場合は`false`を返します。
