# cloneDeepWith (Lodash 互換性)

::: warning カスタムロジックの実装を推奨します

この `cloneDeepWith` 関数は、複雑なカスタマイザー関数と深いコピー処理により相対的に遅くなります。

代わりに、`cloneDeep` とカスタムロジックを直接実装する方法を使用してください。

:::

カスタマイザー関数を使用してオブジェクトの深いコピーを作成します。

```typescript
const cloned = cloneDeepWith(value, customizer);
```

## 参照

### `cloneDeepWith(value, customizer?)`

深いコピーの動作をカスタマイズしたい場合は、`cloneDeepWith`を使用してください。カスタマイザー関数が特定の値のコピー方法を制御します。

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

// 基本的な使用法(カスタマイザーなし)
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};
const cloned = cloneDeepWith(obj);
// Returns: { a: 1, b: { c: 2 } } (完全に新しいインスタンス)

// Dateオブジェクトの特別処理
const obj2 = {
  name: 'test',
  createdAt: new Date('2023-01-01'),
  nested: {
    updatedAt: new Date('2023-12-31'),
  },
};
const cloned2 = cloneDeepWith(obj2, value => {
  if (value instanceof Date) {
    // Dateをタイムスタンプ数値に変換
    return value.getTime();
  }
  // undefinedを返すとデフォルトの深いコピー動作を使用
});
// Returns: {
//   name: 'test',
//   createdAt: 1672531200000,
//   nested: { updatedAt: 1703980800000 }
// }

// 配列要素の変換
const arr = [1, [2, 3], { a: 4, b: [5, 6] }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value * 10;
  }
});
// Returns: [10, [20, 30], { a: 40, b: [50, 60] }]

// 関数の処理
const objWithFunc = {
  data: { count: 1 },
  increment: function () {
    this.data.count++;
  },
};
const clonedWithFunc = cloneDeepWith(objWithFunc, value => {
  if (typeof value === 'function') {
    // 関数を文字列に変換
    return value.toString();
  }
});
// Returns: {
//   data: { count: 1 },
//   increment: "function() { this.data.count++; }"
// }
```

循環参照とカスタマイザーの組み合わせ:

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
obj.b.self = obj; // 循環参照

const cloned = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value + 100;
  }
});

console.log(cloned.a); // 101
console.log(cloned.b.c); // 102
console.log(cloned.b.self === cloned); // true (循環参照が保持される)
```

#### パラメータ

- `value` (`T`): 深くコピーする値です。
- `customizer` (`function`, オプション): コピー方法を決定する関数です。`(value: any, key?: string, object?: any, stack?: Map<any, any>) => any` の形式です。

#### 戻り値

(`T`): カスタマイザーによって処理された深いコピーを返します。
