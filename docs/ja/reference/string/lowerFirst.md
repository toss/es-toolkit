# lowerFirst

文字列の最初の文字を小文字に変換します。

```typescript
const result = lowerFirst(str);
```

## 使用法

### `lowerFirst(str)`

文字列の最初の文字だけを小文字にしたい場合は `lowerFirst` を使用してください。残りの文字はそのまま保持されます。変数名やプロパティ名をキャメルケースにする際に便利です。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 基本的な使い方
lowerFirst('Hello'); // returns 'hello'
lowerFirst('WORLD'); // returns 'wORLD'
lowerFirst('JavaScript'); // returns 'javaScript'
```

空文字列や1文字の文字列も正しく処理します。

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst(''); // returns ''
lowerFirst('A'); // returns 'a'
lowerFirst('a'); // returns 'a'
```

キャメルケース変換に活用できます。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// クラス名をインスタンス変数名に変換
const className = 'UserService';
const instanceName = lowerFirst(className); // 'userService'

// 定数名をキャメルケースに変換
const constantName = 'API_BASE_URL';
const camelCase = lowerFirst(constantName.toLowerCase().replace(/_(.)/g, (_, letter) => letter.toUpperCase()));
// 結果的に 'apiBaseUrl'
```

APIレスポンスやデータ変換でも使用できます。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// データベースのカラム名をJavaScriptのプロパティ名に変換
const dbColumns = ['UserId', 'FirstName', 'LastName', 'EmailAddress'];
const jsProperties = dbColumns.map(column => lowerFirst(column));
// returns ['userId', 'firstName', 'lastName', 'emailAddress']

// 関数名生成
function createGetter(propertyName: string): string {
  return `get${propertyName}`;
}

function createSetter(propertyName: string): string {
  return `set${propertyName}`;
}

const property = lowerFirst('UserName'); // 'userName'
const getter = createGetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'getUserName'
const setter = createSetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'setUserName'
```

#### パラメータ

- `str` (`string`): 最初の文字を小文字に変換する文字列です。

#### 戻り値

(`string`): 最初の文字が小文字に変換された新しい文字列を返します。
