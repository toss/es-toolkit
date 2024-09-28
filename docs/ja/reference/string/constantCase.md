# constantCase

文字列を定数ケースに変換します。

定数ケースは、各単語が大文字で書かれ、アンダースコア（`_`）で区切られる命名規則です。たとえば、`CONSTANT_CASE`。

## インターフェース

```typescript
function constantCase(str: string): string;
```

### パラメータ

- `str` (`string`): 定数ケースに変更される文字列。

### 戻り値

(`string`): 定数ケースに変換された文字列。

## 例

```typescript
const convertedStr1 = constantCase('camelCase') // returns 'CAMEL_CASE'
const convertedStr2 = constantCase('some whitespace') // returns 'SOME_WHITESPACE'
const convertedStr3 = constantCase('hyphen-text') // returns 'HYPHEN_TEXT'
const convertedStr4 = constantCase('HTTPRequest') // returns 'HTTP_REQUEST'
```