# omit

オブジェクトから指定したキーを取り除くデータラストな演算子を作成します。

```typescript
const result = pipe(obj, omit(keys));
```

## 使用法

`omit` は、入力オブジェクトから指定した `keys` を取り除いた新しいオブジェクトを返します。

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### パラメータ

- `keys` (`readonly K[]`): 新しいオブジェクトから除外するキーです。

#### 戻り値

(`(obj: T) => Omit<T, K>`): オブジェクト `T` を、除外したキーを持たない新しいオブジェクトに変換するデータラストな演算子です。
