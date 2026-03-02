# camelCase

文字列をキャメルケース(Camel case)に変換します。

```typescript
const result = camelCase(str);
```

## 使用法

### `camelCase(str)`

文字列をキャメルケースに変換したいときは`camelCase`を使用します。キャメルケースは最初の単語を小文字で書き、残りの単語の最初の文字を大文字で連結する命名規則です。

```typescript
import { camelCase } from 'es-toolkit/string';

// 様々な形式の文字列をキャメルケースに変換
camelCase('hello world'); // returns 'helloWorld'
camelCase('some-hyphen-text'); // returns 'someHyphenText'
camelCase('CONSTANT_CASE'); // returns 'constantCase'
camelCase('PascalCase'); // returns 'pascalCase'
camelCase('mixed   SpAcE'); // returns 'mixedSpAcE'
```

特殊文字や空白、ハイフンのような区切り文字がある文字列をJavaScriptの変数名やオブジェクトのプロパティ名として使用しやすい形式に変換します。

```typescript
import { camelCase } from 'es-toolkit/string';

// APIレスポンスから受け取ったキーを変換
const apiKey = 'user_first_name';
const jsKey = camelCase(apiKey); // 'userFirstName'

// HTML属性をJavaScriptプロパティに変換
const cssProperty = 'background-color';
const jsProperty = camelCase(cssProperty); // 'backgroundColor'
```

Unicode文字も保持します。

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('keep unicode 😅'); // returns 'keepUnicode😅'
camelCase('한글-테스트'); // returns '한글테스트'
```

#### パラメータ

- `str` (`string`): キャメルケースに変換する文字列です。

#### 戻り値

(`string`): キャメルケースに変換された新しい文字列を返します。
