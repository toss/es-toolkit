# stripAnsi

文字列からすべての ANSI 色/スタイルコードを除去します。

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const colored = color.red('hello');
stripAnsi(colored);
// Returns: 'hello'
```

## 使い方

### `stripAnsi(text)`

色が適用された文字列から ANSI エスケープコードを除去し、純粋なテキストのみを返します。ログをファイルに保存したり、文字列の長さを正確に測定する際に便利です。

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const message = color.bold(color.red('エラー発生'));

// ファイルに保存する際に ANSI コードを除去
fs.writeFileSync('log.txt', stripAnsi(message));

// 文字列の長さを測定
const visibleLength = stripAnsi(message).length;
```

基本色、256色、RGB など、このライブラリが生成するすべての SGR（Select Graphic Rendition）シーケンスを除去します。

#### パラメータ

- `text` (`string`): ANSI コードが含まれている可能性のある文字列です。

#### 戻り値

(`string`): ANSI コードが除去された文字列を返します。
