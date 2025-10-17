# upperFirst

文字列の最初の文字を大文字に変換します。

```typescript
const result = upperFirst(str);
```

## 参照

### `upperFirst(str)`

文字列の最初の文字だけを大文字にし、残りの文字をそのまま維持したい場合は`upperFirst`を使用してください。文章の始まりを大文字にしたり、名前を整理したりする際に便利です。

```typescript
import { upperFirst } from 'es-toolkit/string';

// 小文字で始まる文字列の最初の文字を大文字にする
upperFirst('fred');
// 戻り値: 'Fred'

// すでに最初の文字が大文字の場合はそのまま維持
upperFirst('Fred');
// 戻り値: 'Fred'

// すべての文字が大文字の場合もそのまま維持
upperFirst('FRED');
// 戻り値: 'FRED'
```

さまざまな状況で活用できます:

```typescript
// ユーザー名を整理する際
const userName = 'john';
const displayName = upperFirst(userName);
console.log(displayName); // 'John'

// 文章の最初の文字を大文字にする際
const sentence = 'hello world';
const capitalizedSentence = upperFirst(sentence);
console.log(capitalizedSentence); // 'Hello world'

// 複数の名前を処理する際
const names = ['alice', 'bob', 'charlie'];
const capitalizedNames = names.map(name => upperFirst(name));
console.log(capitalizedNames); // ['Alice', 'Bob', 'Charlie']

// camelCase文字列の最初の文字を大文字にする際
const camelCase = 'firstName';
const pascalCase = upperFirst(camelCase);
console.log(pascalCase); // 'FirstName'
```

#### パラメータ

- `str` (`string`): 最初の文字を大文字にする文字列です。

#### 戻り値

(`string`): 最初の文字が大文字に変換された文字列を返します。
