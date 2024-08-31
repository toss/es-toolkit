# deburr

文字列を変換し、特殊文字やアクセント記号をその ASCII 等価文字に置き換えます。例えば、`"Crème brûlée"`は`"Creme brulee"`になります。

## インターフェース

```typescript
function deburr(str: string): string;
```

### パラメータ

- `str` (`string`): デバリングする入力文字列。

### 戻り値

(`string`): 特殊文字が ASCII 等価文字に置き換えられたデバリングされた文字列。

## 例

```typescript
import { deburr } from 'es-toolkit/string';

deburr('déjà vu'); // 'deja vu'を返します
deburr('Æthelred'); // 'Aethelred'を返します
deburr('München'); // 'Munchen'を返します
deburr('Crème brûlée'); // 'Creme brulee'を返します
```
