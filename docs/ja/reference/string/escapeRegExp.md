# escapeRegExp

RegExpの特殊文字 `"^"`, `"$"`, `"\\"`, `"."`, `"\*"`, `"+"`, `"?"`, `"("`, `")"`, `"["`, `"]"`, `"{"`, `"}"`, および `"|"`を `str` 内でエスケープします。

## インターフェース

```typescript
function escapeRegExp(str: string): string;
```

### パラメータ

- `str` (`string`) エスケープする文字列です。

### 戻り値

(`string`): エスケープされた文字列を返します。

## Examples

```typescript
import { escapeRegExp } from 'es-toolkit/string';

escapeRegExp('[es-toolkit](https://es-toolkit.slash.page/)'); // returns '\[es-toolkit\]\(https://es-toolkit\.slash\.page/\)'
```
