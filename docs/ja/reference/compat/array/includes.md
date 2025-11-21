# includes (Lodash 互換性)

::: warning `Array.prototype.includes`を使用してください

この`includes`関数は、オブジェクトの走査とSameValueZero比較処理により、動作が遅くなります。配列の場合、JavaScriptのネイティブ`Array.prototype.includes`メソッドの方が高速で標準化されています。

代わりに、より高速でモダンな`Array.prototype.includes`を使用してください。

:::

配列、オブジェクト、または文字列に特定の値が含まれているかを確認します。

```typescript
const hasValue = includes(collection, target, fromIndex);
```

## 使用法

### `includes(collection, target, fromIndex)`

配列、オブジェクト、文字列に特定の値が存在するかを確認したい場合は`includes`を使用してください。SameValueZero方式で値を比較します。

```typescript
import { includes } from 'es-toolkit/compat';

// 配列で値を検索
includes([1, 2, 3], 2);
// Returns: true

// オブジェクトの値から検索
includes({ a: 1, b: 'a', c: NaN }, 'a');
// Returns: true

// 文字列で部分文字列を検索
includes('hello world', 'world');
// Returns: true
```

特定のインデックスから検索を開始できます。

```typescript
import { includes } from 'es-toolkit/compat';

// インデックス2から検索
includes([1, 2, 3, 2], 2, 2);
// Returns: true (インデックス3にあります)

// 負のインデックスは末尾から計算
includes([1, 2, 3], 2, -2);
// Returns: true
```

`null`または`undefined`は常に`false`を返します。

```typescript
import { includes } from 'es-toolkit/compat';

includes(null, 1); // false
includes(undefined, 1); // false
```

文字列で部分文字列を検索することもできます。

```typescript
import { includes } from 'es-toolkit/compat';

// 最初から検索
includes('hello', 'e');
// Returns: true

// 特定の位置から検索
includes('hello', 'e', 2);
// Returns: false (インデックス2以降に'e'はありません)
```

`NaN`値も正しく見つけることができます。

```typescript
import { includes } from 'es-toolkit/compat';

includes([1, 2, NaN], NaN);
// Returns: true

includes({ a: 1, b: NaN }, NaN);
// Returns: true
```

#### パラメータ

- `collection` (`Array | Record<string, any> | string | null | undefined`): 検索する配列、オブジェクト、または文字列です。
- `target` (`any`): 見つける値です。
- `fromIndex` (`number`, 選択): 検索を開始するインデックスです。負の値は末尾から計算します。デフォルトは`0`です。

#### 戻り値

(`boolean`): 値が存在する場合は`true`、そうでない場合は`false`を返します。
