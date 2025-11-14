# reverseString

文字列を反転します。

```typescript
const reversed = reverseString(value);
```

## 使用法

### `reverseString(value)`

文字列の文字順序を反転したいときは `reverseString` を使用してください。Unicode文字と絵文字も正しく処理します。

```typescript
import { reverseString } from 'es-toolkit/string';

// 基本的な文字列反転
reverseString('hello'); // 'olleh'
reverseString('world'); // 'dlrow'

// 大文字小文字が混在した文字列
reverseString('PascalCase'); // 'esaClacsaP'

// 空白を含む文字列
reverseString('hello world'); // 'dlrow olleh'
```

絵文字と特殊文字も正確に処理します。

```typescript
import { reverseString } from 'es-toolkit/string';

// 絵文字を含む文字列
reverseString('foo 😄 bar'); // 'rab 😄 oof'
reverseString('안녕하세요'); // '요세하녕안'

// 数字と特殊文字
reverseString('12345'); // '54321'
reverseString('a-b-c'); // 'c-b-a'
```

#### パラメータ

- `value` (`string`): 反転する文字列です。

#### 戻り値

(`string`): 文字順序が反転した新しい文字列を返します。

## デモ

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
