# trim

文字列から前後の空白や指定された文字を削除します。

## インターフェース

```typescript
function trim(str: string, chars?: string | string[]): string;
```

### パラメータ

- `str` (`string`): 文字をトリムする文字列。
- `chars` (`string | string[]`): 文字列から削除する文字。単一の文字または文字の配列で指定します。

### 戻り値

(`string`): 指定された文字が削除された後の結果の文字列。

## 例

```typescript
trim('  hello  '); // "hello"
trim('--hello--', '-'); // "hello"
trim('##hello##', ['#', 'o']); // "hell"
```
