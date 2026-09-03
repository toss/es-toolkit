# sentenceCase

文字列をセンテンスケースに変換します。

```typescript
const converted = sentenceCase(str);
```

## 使用法

### `sentenceCase(str)`

文字列をセンテンスケースに変換したい場合は `sentenceCase` を使用してください。センテンスケースは、最初の単語の最初の文字だけを大文字にし、残りの文字はすべて小文字にして、単語間を空白で連結する表記法です。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 基本的な使用法
sentenceCase('hello world'); // 'Hello world'
sentenceCase('HELLO WORLD'); // 'Hello world'

// キャメルケースやパスカルケースの変換
sentenceCase('fooBar'); // 'Foo bar'
sentenceCase('PascalCase'); // 'Pascal case'

// ハイフンやアンダースコアで連結された単語
sentenceCase('hello-world'); // 'Hello world'
sentenceCase('hello_world'); // 'Hello world'
```

フィールド名や enum の値などの識別子を、人が読みやすいラベルに変換するときに便利です。

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('firstName'); // 'First name'
sentenceCase('MAX_RETRY_COUNT'); // 'Max retry count'
sentenceCase('user-profile-settings'); // 'User profile settings'
```

さまざまな区切り文字や特殊文字を含む文字列も正しく処理します。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 複数の区切り文字が含まれる場合
sentenceCase('--foo-bar--'); // 'Foo bar'
sentenceCase('__FOO_BAR__'); // 'Foo bar'

// 連続した大文字と数字の処理
sentenceCase('XMLHttpRequest'); // 'Xml http request'
sentenceCase('_abc_123_def'); // 'Abc 123 def'

// 空文字や意味のない区切り文字のみの場合
sentenceCase('_-_-_-_'); // ''
sentenceCase('12abc 12ABC'); // '12 abc 12 abc'
```

#### パラメータ

- `str` (`string`): センテンスケースに変換する文字列です。

#### 戻り値

(`string`): 最初の単語の最初の文字が大文字に、残りが小文字に変換され、空白で連結された新しい文字列を返します。

## 使用例

::: sandpack

```ts index.ts
import { sentenceCase } from 'es-toolkit/string';

console.log(sentenceCase('sentenceCase'));
```

:::
