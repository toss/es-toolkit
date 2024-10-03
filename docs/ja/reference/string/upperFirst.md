# upperFirst

文字列の最初の文字を大文字に変更します。

## インターフェース

```typescript
function upperFirst(str: string): string;
```

### パラメータ

- `str` (`string`) - 変更する文字列ます。

### 戻り値

(`string`): - 変換された文字列ます。

## 例

```typescript
import { upperFirst } from 'es-toolkit/string';

upperFirst('fred'); // returns 'Fred'
upperFirst('Fred'); // returns 'Fred'
upperFirst('FRED'); // returns 'FRED'
```
