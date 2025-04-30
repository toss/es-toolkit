# trimEnd

文字列末尾の空白または指定された文字を削除します。

`chars` が文字列の場合、それは単一の文字である必要があります。複数の文字を削除するには、1文字の文字列の配列を提供してください。

## インターフェース

```typescript
function trimEnd(str: string, chars?: string | string[]): string;
```

### パラメータ

- `str` (`string`): 末尾の文字が削除される文字列。
- `chars` (`string | string[]`): 文字列の末尾から削除する文字。

### 戻り値

(`string`): 指定された末尾の文字が削除された後の結果の文字列。

## 例

```typescript
const trimmedStr1 = trimEnd('hello---', '-'); // returns 'hello'
const trimmedStr2 = trimEnd('123000', '0'); // returns '123'
const trimmedStr3 = trimEnd('abcabcabc', 'c'); // returns 'abcabcab'
const trimmedStr4 = trimEnd('trimmedxxx', 'x'); // returns 'trimmed'
```
