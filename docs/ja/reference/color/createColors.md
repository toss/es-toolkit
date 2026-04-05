# createColors

色の有効化を直接制御できるファクトリ関数です。

```typescript
import { createColors } from 'es-toolkit/color';

const c = createColors(true); // 常に色を有効化
const noColor = createColors(false); // 常に無効化
```

## 使い方

### `createColors(enabled?)`

引数なしで呼び出すと環境を自動検出します。`true`/`false` を渡すと強制的に有効化/無効化します。

```typescript
import { createColors } from 'es-toolkit/color';

// テスト環境で色を強制無効化
const c = createColors(false);
c.red('hello'); // 'hello' (ANSIコードなしで返される)

// ロギングライブラリで色を強制有効化
const log = createColors(true);
log.green('成功'); // '\x1b[32m成功\x1b[39m'
```

### いつ使うのか？

- **テスト**: 色を無効化して ANSI コードなしの純粋な文字列を比較したい場合
- **ライブラリ開発**: ユーザーが色オプションを制御できるようにする場合
- **条件付き色**: 特定の条件でのみ色を適用したい場合

```typescript
import { createColors } from 'es-toolkit/color';

function createLogger(useColor: boolean) {
  const c = createColors(useColor);

  return {
    info: (msg: string) => console.log(c.blue(msg)),
    error: (msg: string) => console.error(c.red(msg)),
  };
}
```

#### パラメータ

- `enabled` (`boolean`, 省略可): 色の有効化の可否です。省略すると環境を自動検出します。

#### 戻り値

(`Colors`): すべての色、スタイル、拡張色関数を含むオブジェクトを返します。
