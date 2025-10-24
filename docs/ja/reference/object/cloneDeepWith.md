# cloneDeepWith

与えられた値をカスタム関数を通じてディープコピーします。

```typescript
const customCloned = cloneDeepWith(obj, cloneValue);
```

## 参照

### `cloneDeepWith(obj, cloneValue)`

オブジェクトや配列をディープコピーする際、特定の値についてはカスタム方式でコピーしたい時に`cloneDeepWith`を使用してください。カスタム関数`cloneValue`が値を返すとその値を使用し、`undefined`を返すとデフォルトの方式でコピーします。

```typescript
import { cloneDeepWith } from 'es-toolkit/object';

// 数値を2倍にしてコピー
const obj = { a: 1, b: { c: 2, d: 'text' } };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // undefinedを返すとデフォルトの方式でコピー
});
console.log(clonedObj); // { a: 2, b: { c: 4, d: 'text' } }

// 配列のすべての要素に1を加えてコピー
const arr = [1, [2, 3], { num: 4 }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value + 1;
  }
});
console.log(clonedArr); // [2, [3, 4], { num: 5 }]
```

カスタム関数には現在の値、キー、元のオブジェクト、内部スタック情報がパラメータとして提供されます。

```typescript
const data = {
  user: { name: 'Alice', age: 30 },
  settings: { theme: 'dark', lang: 'ko' },
};

const result = cloneDeepWith(data, (value, key, obj, stack) => {
  // 'user'オブジェクトは特別な方式でコピー
  if (key === 'user' && typeof value === 'object') {
    return { ...value, cloned: true };
  }

  // 文字列にprefixを追加
  if (typeof value === 'string') {
    return `cloned_${value}`;
  }
});

console.log(result);
// {
//   user: { name: 'cloned_Alice', age: 30, cloned: true },
//   settings: { theme: 'cloned_dark', lang: 'cloned_ko' }
// }
```

カスタム関数を使用すると、オブジェクトをコピーする方法を自由に設定できます。例えば、次のように`Date`オブジェクトを1年後の時点にコピーできます。

```typescript
const data = {
  created: new Date('2023-01-01'),
  updated: new Date('2023-12-31'),
  name: 'Document',
};

const cloned = cloneDeepWith(data, value => {
  // Dateオブジェクトは時間を1年後に設定
  if (value instanceof Date) {
    const newDate = new Date(value);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
});

console.log(cloned.created.getFullYear()); // 2024
console.log(cloned.updated.getFullYear()); // 2024
```

#### パラメータ

- `obj` (`T`): ディープコピーする値です。
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`): カスタムコピー関数です。コピーする値を返すか、デフォルトの方式を使用するには`undefined`を返してください。
  - `value`: 現在コピーされている値です。
  - `key`: 現在コピーされている値のプロパティ名です。
  - `obj`: コピーする元のオブジェクトです。
  - `stack`: 循環参照を処理するための内部スタックです。

#### 戻り値

(`T`): カスタム関数を通じて処理されたディープコピーです。
