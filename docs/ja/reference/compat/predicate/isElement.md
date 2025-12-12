# isElement (Lodash互換性)

::: warning `instanceof HTMLElement`を使用してください

この`isElement`関数は構造的検査により正確性が低下し、動作が遅くなります。

代わりに、より正確で現代的な`instanceof HTMLElement`または`element.nodeType === 1`検査を使用してください。

:::

値がDOM要素かどうかを確認します。

```typescript
const result = isElement(value);
```

## 使用法

### `isElement(value)`

指定された値がDOM要素かどうかを確認したい場合は`isElement`を使用してください。この関数は構造的に確認するため、結果が完全に正確でない場合があります。

```typescript
import { isElement } from 'es-toolkit/compat';

// DOM要素
исElement(document.body); // true
isElement(document.createElement('div')); // true
isElement(document.querySelector('p')); // true (要素が存在する場合)

// DOM要素でない値
isElement('<body>'); // false
isElement({}); // false
isElement(null); // false
isElement(undefined); // false

// テキストノードや他のノードタイプ
isElement(document.createTextNode('text')); // false
isElement(document.createComment('comment')); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値がDOM要素として認識される場合は`true`、そうでない場合は`false`を返します。
