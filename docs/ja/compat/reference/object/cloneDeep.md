# cloneDeep (Lodash 互換性)

::: warning `es-toolkit`の`cloneDeep`を使用してください

この `cloneDeep` 関数は、特殊なオブジェクトタイプを処理する複雑なロジックにより相対的に遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [cloneDeep](../../object/cloneDeep.md) を使用してください。

:::

オブジェクトの深いコピーを作成します。

```typescript
const cloned = cloneDeep(value);
```

## 使用法

### `cloneDeep(value)`

値の深いコピーを作成したい場合は、`cloneDeep`を使用してください。ネストされたオブジェクトと配列を完全に新しいインスタンスとしてコピーします。

```typescript
import { cloneDeep } from 'es-toolkit/compat';

// 原始値のコピー
const num = 42;
const clonedNum = cloneDeep(num);
// Returns: 42 (同じ値)

// 配列の深いコピー
const arr = [1, [2, 3], { a: 4 }];
const clonedArr = cloneDeep(arr);
clonedArr[1][0] = 99;
console.log(arr[1][0]); // 2 (元の値は変更されない)
console.log(clonedArr[1][0]); // 99

// オブジェクトの深いコピー
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};
const clonedObj = cloneDeep(obj);
clonedObj.b.d.e = 99;
console.log(obj.b.d.e); // 3 (元の値は変更されない)
console.log(clonedObj.b.d.e); // 99

// Dateオブジェクトの深いコピー
const date = new Date('2023-01-01');
const clonedDate = cloneDeep(date);
// Returns: new Date('2023-01-01') (新しいDateインスタンス)

// 複雑なネスト構造
const complex = {
  arr: [1, { nested: true }],
  map: new Map([['key', { value: 1 }]]),
  set: new Set([{ item: 1 }]),
  date: new Date(),
};
const clonedComplex = cloneDeep(complex);
// すべてのネストされたオブジェクトが完全に新しいインスタンスとしてコピーされる
```

循環参照も正しく処理されます。

```typescript
import { cloneDeep } from 'es-toolkit/compat';

const obj = { a: 1 };
obj.self = obj; // 循環参照

const cloned = cloneDeep(obj);
console.log(cloned !== obj); // true
console.log(cloned.self === cloned); // true (循環参照が保持される)
```

#### パラメータ

- `value` (`T`): 深くコピーする値です。

#### 戻り値

(`T`): 深くコピーされた値を返します。
