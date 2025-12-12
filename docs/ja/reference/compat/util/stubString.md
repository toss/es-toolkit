# stubString (Lodash 互換性)

::: warning `''`を直接使用してください

この`stubString`関数は単純に空文字列を返すラッパー関数で不要な抽象化です。

代わりにより高速で直接的な`''`を使用してください。

:::

常に空文字列を返します。

```typescript
const emptyString = stubString();
```

## 使用法

### `stubString()`

常に空文字列を返す関数です。デフォルト値として空文字列が必要な場合や関数型プログラミングで一貫した戻り値が必要な時に使用します。

```typescript
import { stubString } from 'es-toolkit/compat';

// 空文字列を返します
const emptyString = stubString();
console.log(emptyString); // => ''

// デフォルト値として使用します
function formatMessage(message = stubString()) {
  return message || 'デフォルトメッセージ';
}

console.log(formatMessage()); // => 'デフォルトメッセージ'
console.log(formatMessage('こんにちは')); // => 'こんにちは'

// 関数型プログラミングで使用します
const createEmpty = () => stubString();
const str = createEmpty();
console.log(str.length); // => 0
```

毎回同じ空文字列を返します。

```typescript
import { stubString } from 'es-toolkit/compat';

const str1 = stubString();
const str2 = stubString();

console.log(str1 === str2); // => true
console.log(typeof str1); // => 'string'
console.log(str1.length); // => 0
```

#### パラメータ

なし。

#### 戻り値

(`string`): 常に空文字列を返します。
