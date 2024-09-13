# noop

何もしない関数です。関数が必要な場所で空欄を埋めるために使用したり、デフォルト値として使用したりできます。

## インターフェース

```typescript
function noop(): void;
```

### 戻り値

(`void`): この関数は何も返しません。

## 例

```typescript
import { noop } from 'es-toolkit/function';

interface Props {
  onChange?: () => void;
}

function MyComponent({ onChange = noop }: Props) {
  // ここでonChangeはundefinedにならないので、自由に呼び出せます。
  onChange();
}
```
