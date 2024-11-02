# startCase

文字列の各単語の先頭を大文字に変換します。

スタートケース表記法は、複数の単語で構成される識別子の各単語の先頭を大文字にし、残りの文字は小文字にして、単語をスペース( )で連結する命名規則です。例えば `Start Case` のように書きます。

## インターフェース

```typescript
function startCase(str: string): string;
```

### パラメータ

- `str` (`string`): 各単語の先頭を大文字に変換する文字列です。

### 戻り値

(`string`) 各単語の先頭が大文字に変換された文字列です。

## 例

```typescript
import { startCase } from 'es-toolkit/string';

startCase('--foo-bar--'); // 'Foo Bar' を返します
startCase('fooBar'); // 'Foo Bar' を返します
startCase('__FOO_BAR__'); // 'Foo Bar' を返します
startCase('XMLHttpRequest'); // 'Xml Http Request' を返します
startCase('_abc_123_def'); // 'Abc 123 Def' を返します
startCase('__abc__123__def__'); // 'Abc 123 Def' を返します
startCase('_-_-_-_'); // '' を返します
startCase('12abc 12ABC'); // '12 Abc 12 ABC' を返します
```

## デモ

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
