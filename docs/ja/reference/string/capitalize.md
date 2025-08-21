# capitalize

文字列の最初の文字を大文字に変換し、残りの文字を小文字に変換します。

## インターフェース

```typescript
function capitalize<T extends string>(str: T): Capitalize<T>;
```

### パラメータ

`str` (`T`): 変換する文字列。

### 戻り値

(`Capitalize<T>`): 最初の文字が大文字で、それ以降が小文字に変換された文字列。

## 例

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize('fred'); // 'Fred' を返します
capitalize('FRED'); // 'Fred' を返します
```
