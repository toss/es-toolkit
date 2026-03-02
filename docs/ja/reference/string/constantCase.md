# constantCase

文字列を定数ケースに変換します。

```typescript
const result = constantCase(str);
```

## 使用法

### `constantCase(str)`

文字列を定数ケースに変換したいときは`constantCase`を使用します。定数ケースはすべての文字を大文字で書き、単語の間をアンダースコア(`_`)で区切る命名規則です。

```typescript
import { constantCase } from 'es-toolkit/string';

// 様々な形式の文字列を定数ケースに変換
constantCase('hello world'); // returns 'HELLO_WORLD'
constantCase('camelCase'); // returns 'CAMEL_CASE'
constantCase('some-kebab-case'); // returns 'SOME_KEBAB_CASE'
constantCase('PascalCase'); // returns 'PASCAL_CASE'
constantCase('snake_case'); // returns 'SNAKE_CASE'
```

JavaScriptや他のプログラミング言語で定数を定義するときによく使用される命名規則です。

```typescript
import { constantCase } from 'es-toolkit/string';

// 環境変数名を生成
const configKey = 'api base url';
const envVar = constantCase(configKey); // 'API_BASE_URL'

// 定数名を生成
const settingName = 'maximum retry count';
const constantName = constantCase(settingName); // 'MAXIMUM_RETRY_COUNT'
```

空白や特殊文字が含まれる文字列も適切に処理します。

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('HTTP Request'); // returns 'HTTP_REQUEST'
constantCase('user-agent-string'); // returns 'USER_AGENT_STRING'
constantCase('  multiple   spaces  '); // returns 'MULTIPLE_SPACES'
```

#### パラメータ

- `str` (`string`): 定数ケースに変換する文字列です。

#### 戻り値

(`string`): 定数ケースに変換された新しい文字列を返します。
