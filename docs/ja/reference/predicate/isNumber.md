# isNumber

与えられた値が数値型かどうかを確認します。

```typescript
const result = isNumber(value);
```

## 使用法

### `isNumber(value)`

値が数値かどうかを確認したい場合に `isNumber` を使用してください。

```typescript
import { isNumber } from 'es-toolkit';

// 基本的な数値の確認
isNumber(123); // true
isNumber(3.14); // true
isNumber(NaN); // true
isNumber(Infinity); // true

// 他の型との区別
isNumber('123'); // false
isNumber(true); // false
isNumber(null); // false
isNumber(undefined); // false
```

TypeScript で型ガードとして使用する場合に特に便利です。

```typescript
import { isNumber } from 'es-toolkit';

function processValue(value: unknown) {
  if (isNumber(value)) {
    // value は number に型が絞り込まれます
    console.log(value * 2);
  } else {
    console.log('数値ではありません');
  }
}
```

#### パラメータ

- `value` (`unknown`): 数値型かどうかを確認する値です。

#### 戻り値

(`value is number`): 値が数値の場合は `true`、そうでなければ `false` を返します。
