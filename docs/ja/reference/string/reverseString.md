# reverseString

文字列を反転します。

この関数は文字列を入力として受け取り、その文字列を反転した形で返します。

## インターフェース

```typescript
function reverseString(value: string): string;
```

### パラメータ

- `value` (`string`): 反転する文字列。

### 戻り値

(`string`): 反転された文字列。

## 例

```typescript
import { reverseString } from 'es-toolkit/string';

const reversedStr1 = reverseString('hello'); // returns 'olleh'
const reversedStr2 = reverseString('PascalCase'); // returns 'esaClaP'
const reversedStr3 = reverseString('foo 😄 bar'); // returns 'rab 😄 oof'
```

## デモ

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
