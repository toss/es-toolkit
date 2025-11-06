# overEvery (Lodash互換性)

::: warning `Array.every`を使用してください

この`overEvery`関数は、条件関数を変換して検査する過程で追加のオーバーヘッドが発生します。

代わりに、より高速で現代的な`Array.every`メソッドを使用してください。

:::

すべての条件関数が真と評価される値を返すかどうかを確認する関数を作成します。

```typescript
const allValidator = overEvery(predicates);
```

## 使用法

### `overEvery(...predicates)`

複数の条件関数を受け取って与えられた値がすべての条件を満たすかどうかを確認する関数を生成します。複合条件検査やデータ検証に便利です。

```typescript
import { overEvery } from 'es-toolkit/compat';

// 文字列の条件を検査します
const isValidString = overEvery([
  value => typeof value === 'string',
  value => value.length > 3,
  value => value.includes('o'),
]);

isValidString('hello'); // => true
isValidString('hi'); // => false (長さが3以下)
isValidString('test'); // => false ('o'がない)

// 数値範囲を検査します
const isInRange = overEvery([
  num => num >= 0,
  num => num <= 100,
  num => num % 1 === 0, // 整数かどうかを確認
]);

isInRange(50); // => true
isInRange(-5); // => false (0未満)
isInRange(150); // => false (100超過)
isInRange(50.5); // => false (整数ではない)
```

オブジェクトのプロパティも検査できます。

```typescript
import { overEvery } from 'es-toolkit/compat';

// オブジェクトのプロパティを検査します
const isValidUser = overEvery([
  'name', // nameプロパティが真と評価されるか
  { age: 30 }, // ageが30か
  ['active', true], // activeがtrueか
]);

isValidUser({ name: 'John', age: 30, active: true }); // => true
isValidUser({ name: '', age: 30, active: true }); // => false (nameが空文字列)
isValidUser({ name: 'John', age: 25, active: true }); // => false (ageが異なる)
```

#### パラメータ

- `...predicates` (`Array<Function | string | object | Array>`): 検査する条件関数です。関数、プロパティ名、オブジェクト、プロパティ-値ペアなどになります。

#### 戻り値

(`(...args: any[]) => boolean`): すべての条件を満たせば`true`、一つでも満たさなければ`false`を返す関数を返します。
