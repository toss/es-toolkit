# pick

オブジェクトから指定したキーだけを残すデータラストな演算子を作成します。

```typescript
const result = pipe(obj, pick(keys));
```

## 使用法

`pick` は、入力オブジェクトから指定した `keys` だけを含む新しいオブジェクトを返します。入力に存在しないキーはスキップされます。

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### パラメータ

- `keys` (`readonly K[]`): 新しいオブジェクトにコピーするキーです。

#### 戻り値

(`(obj: T) => Pick<T, K>`): オブジェクト `T` を、選んだキーだけを持つ新しいオブジェクトに変換するデータラストな演算子です。
