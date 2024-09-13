# upperCase

文字列を大文字表記に変換します。

大文字表記は、複数の単語で構成される識別子の各単語を大文字で書き、単語をスペース( )で連結する命名規則です。例えば、`UPPER CASE`のように書きます。

## インターフェース

```typescript
function upperCase(str: string): string;
```

### パラメータ

- `str` (`string`): 大文字に変更される文字列です。

### 戻り値

(`string`): 大文字に変換された文字列です。

## 例

```typescript
const convertedStr1 = upperCase('camelCase'); // returns 'CAMEL CASE'
const convertedStr2 = upperCase('some whitespace'); // returns 'SOME WHITESPACE'
const convertedStr3 = upperCase('hyphen-text'); // returns 'HYPHEN TEXT'
const convertedStr4 = upperCase('HTTPRequest'); // returns 'HTTP REQUEST'
```
