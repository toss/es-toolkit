# lowerCase

文字列を小文字表記法に変換します。

```typescript
const result = lowerCase(str);
```

## 使用法

### `lowerCase(str)`

文字列を小文字表記法に変換したい場合は `lowerCase` を使用してください。小文字表記法は、すべての単語を小文字で書き、単語の間をスペースで区切る命名規則です。

```typescript
import { lowerCase } from 'es-toolkit/string';

// 様々な形式の文字列を小文字表記法に変換
lowerCase('Hello World'); // returns 'hello world'
lowerCase('camelCase'); // returns 'camel case'
lowerCase('some-kebab-case'); // returns 'some kebab case'
lowerCase('PascalCase'); // returns 'pascal case'
lowerCase('SCREAMING_SNAKE_CASE'); // returns 'screaming snake case'
```

ユーザーに表示するテキストやタイトルを作成する際に便利です。

```typescript
import { lowerCase } from 'es-toolkit/string';

// ユーザーインターフェーステキストを生成
const fieldName = 'firstName';
const label = lowerCase(fieldName); // 'first name'

// API キーをユーザーフレンドリーなテキストに変換
const apiKeys = ['userEmail', 'phoneNumber', 'birthDate'];
const labels = apiKeys.map(key => lowerCase(key));
// returns ['user email', 'phone number', 'birth date']
```

設定やオプション名を表示する際にも活用できます。

```typescript
import { lowerCase } from 'es-toolkit/string';

// 設定メニューを表示
const settings = {
  enableNotifications: true,
  darkModeEnabled: false,
  autoSaveInterval: 300,
};

for (const [key, value] of Object.entries(settings)) {
  const displayName = lowerCase(key);
  console.log(`${displayName}: ${value}`);
}
// 出力:
// enable notifications: true
// dark mode enabled: false
// auto save interval: 300
```

特殊文字やスペースがある文字列も適切に処理します。

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('HTTPSConnection'); // returns 'https connection'
lowerCase('user_profile-settings'); // returns 'user profile settings'
lowerCase('  mixed   CASE   text  '); // returns 'mixed case text'
```

#### パラメータ

- `str` (`string`): 小文字表記法に変換する文字列です。

#### 戻り値

(`string`): 小文字表記法に変換された新しい文字列を返します。
