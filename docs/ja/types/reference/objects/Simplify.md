# Simplify

交差型やマップ型を 1 つの平坦なオブジェクト型に展開します。型そのものは同じですが、エディタでは `A & B` ではなく `{ a: 1; b: 2 }` のように見えます。

```typescript
type Flat = Simplify<T>;
```

## 使用法

### `Simplify<T>`

交差型（`&`）をそのままにすると、エディタのツールチップに `A & B` と表示され、実際の形が分かりにくくなります。`Simplify` で包むと、最終的なプロパティを 1 つのオブジェクトに展開して表示します。`?`（省略可能）と `readonly` の表示もそのまま保持されます。

```typescript
import type { Simplify } from 'es-toolkit/types';

type A = { name: string };
type B = { readonly age?: number };

// 包まないとツールチップに 'A & B' と表示されます。
type Raw = A & B;

// Simplify で展開すると 1 つのオブジェクトとして見えます。?, readonly の表示も保持されます。
type User = Simplify<A & B>;
// => { name: string; readonly age?: number }
```

#### 型パラメータ

- `T`: 展開する型です。
