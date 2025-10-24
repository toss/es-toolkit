# upperCase

文字列をすべての文字が大文字で単語がスペースで区切られた形式に変換します。

```typescript
const result = upperCase(str);
```

## 参照

### `upperCase(str)`

文字列を大文字表記に変換したい場合は`upperCase`を使用してください。各単語を大文字に変換し、単語をスペースで連結します。camelCase、kebab-case、snake_caseなど様々な表記法の文字列を処理できます。

```typescript
import { upperCase } from 'es-toolkit/string';

// camelCaseを大文字表記に変換
upperCase('camelCase');
// 戻り値: 'CAMEL CASE'

// すでに空白がある文字列も変換
upperCase('some whitespace');
// 戻り値: 'SOME WHITESPACE'

// kebab-caseを大文字表記に変換
upperCase('hyphen-text');
// 戻り値: 'HYPHEN TEXT'

// 連続した大文字がある文字列も処理
upperCase('HTTPSRequest');
// 戻り値: 'HTTPS REQUEST'
```

様々な命名規則を統一された大文字形式に変換する際に便利です:

```typescript
// APIレスポンスの様々なキー名を統一
const apiKeys = ['user_name', 'firstName', 'email-address', 'phoneNumber'];
const upperCaseKeys = apiKeys.map(key => upperCase(key));
console.log(upperCaseKeys);
// ['USER NAME', 'FIRST NAME', 'EMAIL ADDRESS', 'PHONE NUMBER']

// ファイル名を表示する際に使用
const fileName = 'profile_image_thumbnail.jpg';
const displayName = upperCase(fileName.replace('.jpg', ''));
console.log(displayName); // 'PROFILE IMAGE THUMBNAIL'
```

#### パラメータ

- `str` (`string`): 大文字表記に変換する文字列です。

#### 戻り値

(`string`): 各単語が大文字に変換され、スペースで区切られた文字列を返します。
