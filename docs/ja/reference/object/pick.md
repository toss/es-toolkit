# pick

選択したオブジェクトプロパティで構成される新しいオブジェクトを生成します。

この関数はオブジェクトとキーの配列を受け取り、指定されたキーに対応するプロパティのみを含む新しいオブジェクトを返します。

## インターフェース

```typescript
function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

### パラメータ

- `obj` (`T`): キーを選択するオブジェクトです。
- `keys` (`K[]`): オブジェクトから選択するキーの配列です。

### 戻り値

(`Pick<T, K>`): 指定されたキーが選択された新しいオブジェクトです。

## 例

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = pick(obj, ['a', 'c']);
// 結果は次のようになります { a: 1, c: 3 }
```

## Lodashとの互換性

`es-toolkit/compat`から`pick`関数をインポートすると、深いパスを選択することができます。

```typescript
import { pick } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = pick(obj, ['a.b.c', 'f.g']);
// 結果は次のようになります { a: { b: { c: 1 } }, 'f.g': 4 }
```
