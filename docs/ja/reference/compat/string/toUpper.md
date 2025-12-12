# toUpper (Lodash 互換性)

::: warning JavaScriptの`String.prototype.toUpperCase`を使用してください

この`toUpper`関数は文字列以外の値の処理により動作が遅くなります。

代わりに、より高速で現代的なJavaScriptの`String.prototype.toUpperCase`を使用してください。

:::

値を文字列に変換した後、大文字に変換します。

```typescript
const uppercased = toUpper(value);
```

## 使用法

### `toUpper(value?)`

値を大文字の文字列に変換したい場合は`toUpper`を使用してください。どんなタイプの値でも、まず文字列に変換してから大文字にします。

```typescript
import { toUpper } from 'es-toolkit/compat';

// 文字列を大文字に変換
toUpper('--foo-bar--');
// Returns: '--FOO-BAR--'

toUpper('Hello World');
// Returns: 'HELLO WORLD'

// 数値を変換
toUpper(123);
// Returns: '123'

// 配列を変換
toUpper([1, 2, 3]);
// Returns: '1,2,3'
```

`null`や`undefined`は空文字列として処理されます。

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper(null);
// Returns: ''

toUpper(undefined);
// Returns: ''

toUpper();
// Returns: ''
```

#### パラメータ

- `value` (`unknown`, オプション): 大文字に変換する値です。

#### 戻り値

(`string`): 大文字に変換された文字列を返します。
