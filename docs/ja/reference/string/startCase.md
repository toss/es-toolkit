# startCase

文字列の各単語の最初の文字を大文字に変換します。

```typescript
const converted = startCase(str);
```

## 使用法

### `startCase(str)`

文字列をスタートケース(各単語の最初の文字が大文字)に変換したい場合は `startCase` を使用してください。各単語の最初の文字は大文字に、残りは小文字に変換し、単語間を空白で連結します。

```typescript
import { startCase } from 'es-toolkit/string';

// 基本的な使用法
startCase('hello world'); // 'Hello World'
startCase('HELLO WORLD'); // 'Hello World'

// キャメルケースやパスカルケースの変換
startCase('fooBar'); // 'Foo Bar'
startCase('PascalCase'); // 'Pascal Case'

// ハイフンやアンダースコアで連結された単語
startCase('hello-world'); // 'Hello World'
startCase('hello_world'); // 'Hello World'
```

さまざまな区切り文字や特殊文字を含む文字列も正しく処理します。

```typescript
import { startCase } from 'es-toolkit/string';

// 複数の区切り文字が含まれる場合
startCase('--foo-bar--'); // 'Foo Bar'
startCase('__FOO_BAR__'); // 'Foo Bar'

// 連続した大文字と数字の処理
startCase('XMLHttpRequest'); // 'Xml Http Request'
startCase('_abc_123_def'); // 'Abc 123 Def'

// 空文字や意味のない区切り文字のみの場合
startCase('_-_-_-_'); // ''
startCase('12abc 12ABC'); // '12 Abc 12 Abc'
```

#### パラメータ

- `str` (`string`): スタートケースに変換する文字列です。

#### 戻り値

(`string`): 各単語の最初の文字が大文字に変換され、空白で連結された新しい文字列を返します。

## デモ

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
