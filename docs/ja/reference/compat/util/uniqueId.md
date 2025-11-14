# uniqueId (Lodash 互換性)

::: warning crypto.randomUUID使用推奨

一意の識別子を生成するときはcrypto.randomUUID()を使用するのがより安全で標準的な方式です。

代わりにより高速で現代的なcrypto.randomUUID()を使用してください。

:::

一意な文字列識別子を生成します。

```typescript
const result = uniqueId('contact_');
```

## 使用法

### `uniqueId(prefix?: string): string`

一意な文字列識別子を生成します。内部カウンターを増加させて一意性を保証します。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 接頭辞と一緒に一意ID生成
uniqueId('contact_'); // => 'contact_1'
uniqueId('user_'); // => 'user_2'

// 接頭辞なしで一意ID生成
uniqueId(); // => '3'
uniqueId(); // => '4'
```

連続した呼び出しごとに内部カウンターが増加します。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 各呼び出しごとに異なるID生成
const ids = Array.from({ length: 5 }, () => uniqueId('item_'));
console.log(ids);
// => ['item_1', 'item_2', 'item_3', 'item_4', 'item_5']
```

DOM要素の一意ID生成に便利です。

```typescript
import { uniqueId } from 'es-toolkit/compat';

// フォーム要素の一意ID生成
const inputId = uniqueId('input_');
const labelId = uniqueId('label_');

console.log(inputId); // => 'input_6'
console.log(labelId); // => 'label_7'
```

#### パラメータ

- `prefix` (`string`, オプション): IDの前に付く接頭辞文字列。提供しない場合は数値のみ返します。

#### 戻り値

(`string`): 一意識別子文字列。接頭辞がある場合は`接頭辞 + 番号`形式、ない場合は番号のみ返します。
