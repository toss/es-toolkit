# stripColor

文字列から ANSI 色/スタイルコードを除去します。

```typescript
import { color, stripColor } from 'es-toolkit/color';

const colored = color.red('hello');
stripColor(colored);
// Returns: 'hello'
```

## 使い方

### `stripColor(text)`

色が適用された文字列から ANSI エスケープコードを除去し、純粋なテキストのみを返します。ログをファイルに保存したり、文字列の長さを正確に測定する際に便利です。

```typescript
import { color, stripColor } from 'es-toolkit/color';

const message = color.bold(color.red('エラー発生'));

// ファイルに保存する際に ANSI コードを除去
fs.writeFileSync('log.txt', stripColor(message));

// 文字列の長さを測定
const visibleLength = stripColor(message).length;
```

基本色、256色、RGB など、このライブラリが生成する SGR（Select Graphic Rendition）シーケンスのみを除去します。カーソル移動、OSC ハイパーリンクなど、他の ANSI シーケンスは除去しません。

#### パラメータ

- `text` (`string`): ANSI コードが含まれている可能性のある文字列です。

#### 戻り値

(`string`): ANSI コードが除去された文字列を返します。
