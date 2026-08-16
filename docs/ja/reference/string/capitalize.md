# capitalize

文字列の最初の文字を大文字に変換し、残りの文字は小文字に変換します。

```typescript
const result = capitalize(str);
```

## 使用法

### `capitalize(str)`

文字列の最初の文字だけを大文字にして、残りを小文字に統一したいときは`capitalize`を使用します。名前やタイトルを正規化するときに便利です。

```typescript
import { capitalize } from 'es-toolkit/string';

// 基本的な使い方
capitalize('hello'); // returns 'Hello'
capitalize('WORLD'); // returns 'World'
capitalize('javaScript'); // returns 'Javascript'
```

空文字列や1文字の文字列も正しく処理します。

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize(''); // returns ''
capitalize('a'); // returns 'A'
capitalize('A'); // returns 'A'
```

ユーザー入力を正規化したり、タイトルを作成するときに活用できます。

```typescript
import { capitalize } from 'es-toolkit/string';

// ユーザー名を正規化
const userName = 'john DOE';
const formattedName = userName.split(' ').map(capitalize).join(' ');
// returns 'John Doe'

// タイトルを作成
const title = capitalize('welcome to our website');
// returns 'Welcome to our website'
```

#### パラメータ

- `str` (`string`): 最初の文字を大文字に変換する文字列です。

#### 戻り値

(`string`): 最初の文字は大文字、残りは小文字に変換された新しい文字列を返します。
