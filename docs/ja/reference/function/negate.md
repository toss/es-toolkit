# negate

真偽を返す関数 `func` の実行結果を反対に変更します。

## インターフェース

```typescript
function negate<F extends (...args: any[]) => boolean>(func: F): F;
```

### パラメータ

- `func` (`F extends (...args: any[]) => boolean`): 戻り値を反対に変更する関数。

### 戻り値

- (`F`): 戻り値が反対に変更された関数。

## 例

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // 'false' を返す
negate(() => false)(); // 'true' を返す
```
