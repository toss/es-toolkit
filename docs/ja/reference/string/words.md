# words

文字列を単語単位で分割し、配列として返します。

```typescript
const result = words(str);
```

## 使用法

### `words(str)`

文字列を個別の単語に分割したい場合は`words`を使用してください。camelCase、kebab-case、空白、句読点などを基準に単語を分割し、絵文字とUnicode文字も正しく認識します。さまざまな命名規則の文字列を処理する際に便利です。

```typescript
import { words } from 'es-toolkit/string';

// 句読点と空白で区切られた文字列を単語に分割
words('fred, barney, & pebbles');
// 戻り値: ['fred', 'barney', 'pebbles']

// camelCaseと連続した大文字を正しく分割
words('camelCaseHTTPRequest🚀');
// 戻り値: ['camel', 'Case', 'HTTP', 'Request', '🚀']

// Unicode文字と数字も処理
words('Lunedì 18 Set');
// 戻り値: ['Lunedì', '18', 'Set']
```

さまざまな状況で文字列を単語に分割する際に活用できます:

```typescript
// 変数名を単語に分割して他の命名規則に変換
const variableName = 'getUserProfile';
const wordList = words(variableName);
console.log(wordList); // ['get', 'User', 'Profile']

// snake_caseを単語に分割
const snakeCase = 'user_profile_data';
const snakeWords = words(snakeCase);
console.log(snakeWords); // ['user', 'profile', 'data']

// kebab-caseを単語に分割
const kebabCase = 'user-profile-data';
const kebabWords = words(kebabCase);
console.log(kebabWords); // ['user', 'profile', 'data']

// 複雑な文字列も処理
const complex = 'XMLHttpRequest2.0_parser-v1.2';
const complexWords = words(complex);
console.log(complexWords); // ['XML', 'Http', 'Request', '2', '0', 'parser', 'v', '1', '2']
```

#### パラメータ

- `str` (`string`): 単語に分割する文字列です。

#### 戻り値

(`string[]`): 文字列を単語単位で分割した配列を返します。
