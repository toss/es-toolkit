# sortKeys

キーがソートされた新しいオブジェクトを作成します。

```typescript
const sorted = sortKeys(object, compare?);
```

## 使い方

### `sortKeys(object, compare?)`

オブジェクトのキーを一定の順序にソートしたい場合に`sortKeys`を使用します。デフォルトではキーがアルファベット順にソートされるため、シリアライズ、比較、表示などの用途に便利です。

```typescript
import { sortKeys } from 'es-toolkit/object';

const sorted = sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

カスタム比較関数を渡して、異なるソート方式を使用することもできます。

```typescript
// 逆アルファベット順にソートします
const reversed = sortKeys({ a: 1, b: 2, c: 3 }, (a, b) => b.localeCompare(a));
// { c: 3, b: 2, a: 1 }
```

値はネストされたオブジェクトや配列を含め、そのまま保持されます。

```typescript
const obj = { z: [1, 2], a: { nested: true }, m: 'hello' };
const sorted = sortKeys(obj);
// { a: { nested: true }, m: 'hello', z: [1, 2] }
```

#### パラメータ

- `object` (`T`): キーをソートするオブジェクトです。
- `compare` (`(a: string, b: string) => number`, オプション): キーのソートに使用するカスタム比較関数です。デフォルトはアルファベット順です。

#### 戻り値

(`T`): キーがソートされた新しいオブジェクトを返します。
