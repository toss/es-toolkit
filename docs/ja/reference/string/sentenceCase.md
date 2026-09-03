# sentenceCase

文字列をセンテンスケース(Sentence case)に変換します。

```typescript
const result = sentenceCase(str);
```

## 使用法

### `sentenceCase(str)`

文字列をセンテンスケースに変換したいときは`sentenceCase`を使用します。センテンスケースは最初の単語の最初の文字だけを大文字で書き、残りの文字はすべて小文字にして、単語間を空白で連結する命名規則です。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 様々な形式の文字列をセンテンスケースに変換
sentenceCase('hello world'); // returns 'Hello world'
sentenceCase('some-hyphen-text'); // returns 'Some hyphen text'
sentenceCase('CONSTANT_CASE'); // returns 'Constant case'
sentenceCase('PascalCase'); // returns 'Pascal case'
sentenceCase('mixed   SpAcE'); // returns 'Mixed sp ac e'
```

プロパティ名や enum の値、設定キーのような識別子を、人が読みやすいラベルやメッセージとして使用しやすい形式に変換します。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// プロパティ名をフォームのラベルに変換
const fieldName = 'user_first_name';
const label = sentenceCase(fieldName); // 'User first name'

// 定数名を画面に表示するテキストに変換
const errorCode = 'MAX_RETRY_COUNT';
const message = sentenceCase(errorCode); // 'Max retry count'
```

Unicode文字も保持します。

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('keep unicode 😅'); // returns 'Keep unicode 😅'
sentenceCase('한글-테스트'); // returns '한글 테스트'
```

#### パラメータ

- `str` (`string`): センテンスケースに変換する文字列です。

#### 戻り値

(`string`): センテンスケースに変換された新しい文字列を返します。
