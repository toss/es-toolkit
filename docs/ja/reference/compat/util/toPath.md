# toPath (Lodash 互換性)

深いキー文字列をパス配列に変換します。

```typescript
const path = toPath(deepKey);
```

## 参照

### `toPath(deepKey)`

深いキー文字列をパス配列に変換します。ドット記法とブラケット記法の両方をサポートします。

```typescript
import { toPath } from 'es-toolkit/compat';

// ドット記法
toPath('a.b.c');
// Returns: ['a', 'b', 'c']

// ブラケット記法
toPath('a[b][c]');
// Returns: ['a', 'b', 'c']

// 混合記法
toPath('a.b[c].d');
// Returns: ['a', 'b', 'c', 'd']

// 引用符で囲まれたキー
toPath('a["b.c"].d');
// Returns: ['a', 'b.c', 'd']
```

先頭のドットや空のキーも処理します。

```typescript
import { toPath } from 'es-toolkit/compat';

// 先頭にドットがある場合
toPath('.a.b.c');
// Returns: ['', 'a', 'b', 'c']

// 空の文字列
toPath('');
// Returns: []

// 複雑なパス
toPath('.a[b].c.d[e]["f.g"].h');
// Returns: ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```

#### パラメータ

- `deepKey` (`any`): パス配列に変換する深いキー文字列です。

#### 戻り値

(`string[]`): パスの各部分からなる文字列配列を返します。
