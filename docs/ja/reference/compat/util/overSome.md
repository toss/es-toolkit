# overSome (Lodash互換性)

::: warning `Array.some`を使用してください

この`overSome`関数は、条件関数を変換して検査する過程で追加のオーバーヘッドが発生します。

代わりに、より高速で現代的な`Array.some`メソッドを使用してください。

:::

条件関数のうち一つでも真と評価される値を返すかどうかを確認する関数を作成します。

```typescript
const anyValidator = overSome(predicates);
```

## 使用法

### `overSome(...predicates)`

複数の条件関数を受け取って与えられた値が条件のうち一つでも満たすかどうかを確認する関数を生成します。柔軟な条件検査や代替検証に便利です。

```typescript
import { overSome } from 'es-toolkit/compat';

// 文字列または数値かどうかを確認します
const isStringOrNumber = overSome([value => typeof value === 'string', value => typeof value === 'number']);

isStringOrNumber('hello'); // => true
isStringOrNumber(42); // => true
isStringOrNumber(true); // => false

// 複数の条件のうち一つでも満たすかどうかを確認します
const hasValidProperty = overSome([
  obj => obj.name && obj.name.length > 0,
  obj => obj.email && obj.email.includes('@'),
  obj => obj.phone && obj.phone.length >= 10,
]);

hasValidProperty({ name: 'John' }); // => true
hasValidProperty({ email: 'john@example.com' }); // => true
hasValidProperty({ phone: '1234567890' }); // => true
hasValidProperty({ age: 30 }); // => false
```

オブジェクトのプロパティも検査できます。

```typescript
import { overSome } from 'es-toolkit/compat';

// 複数の条件のうち一つでもマッチするかどうかを確認します
const matchesAnyCondition = overSome([
  'isActive', // isActiveプロパティが真と評価されるか
  { role: 'admin' }, // roleが'admin'か
  ['status', 'vip'], // statusが'vip'か
]);

matchesAnyCondition({ isActive: true }); // => true
matchesAnyCondition({ role: 'admin' }); // => true
matchesAnyCondition({ status: 'vip' }); // => true
matchesAnyCondition({ role: 'user', status: 'normal' }); // => false
```

#### パラメータ

- `...predicates` (`Array<Function | string | object | Array>`): 検査する条件関数です。関数、プロパティ名、オブジェクト、プロパティ-値ペアなどになります。

#### 戻り値

(`(...args: any[]) => boolean`): 条件のうち一つでも満たせば`true`、すべて満たさなければ`false`を返す関数を返します。
