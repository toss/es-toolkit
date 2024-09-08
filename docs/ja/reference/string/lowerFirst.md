# lowerFirst

文字列の最初の文字を小文字に変換します。

## インターフェース

```typescript
function lowerFirst(str: string): string;
```

### パラメータ

- `str` (`string`) - 変更される文字列。

### 戻り値

(`string`): - 変換された文字列。

## 例

```typescript
const convertedStr1 = lowerCase('fred'); // returns 'fred'
const convertedStr2 = lowerCase('Fred'); // returns 'fred'
const convertedStr3 = lowerCase('FRED'); // returns 'fRED'
```
