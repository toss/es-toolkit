# conforms (Lodash互換性)

条件関数を持つオブジェクトを受け取り、別のオブジェクトがすべての条件を満たすかどうかを確認する関数を作成します。

```typescript
const checker = conforms(predicates);
```

## 参照

### `conforms(source)`

複数のプロパティに対する条件を一度に確認したい場合は`conforms`を使用してください。この関数は検証関数を生成し、後で複数のオブジェクトを検査する際に便利です。

```typescript
import { conforms } from 'es-toolkit/compat';

// 条件関数の定義
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const isString = s => typeof s === 'string';

// 複数の条件を含む検証関数の生成
const validator = conforms({
  a: isPositive,
  b: isEven,
  c: isString,
});

// オブジェクトの検証
validator({ a: 2, b: 4, c: 'hello' }); // true (すべての条件を満たす)
validator({ a: -1, b: 4, c: 'hello' }); // false (aが正数ではない)
validator({ a: 2, b: 3, c: 'hello' }); // false (bが偶数ではない)
validator({ a: 2, b: 4, c: 123 }); // false (cが文字列ではない)

// 配列フィルタリングでの使用
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
// [{ age: 25, score: 80, name: 'Alice' }, { age: 30, score: 75, name: 'Charlie' }]
```

#### パラメータ

- `source` (`Record<PropertyKey, (value: any) => boolean>`): プロパティ別の条件関数を持つオブジェクトです。

#### 戻り値

(`(object: Record<PropertyKey, any>) => boolean`): 与えられたオブジェクトがすべての条件を満たすかどうかを確認する関数を返します。
