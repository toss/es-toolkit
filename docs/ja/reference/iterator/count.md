# count (`Iterator`)

イテレータを消費して、生成される要素の数を返します。

```typescript
const total = count(source);
```

## 使用法

### `count(source)`

遅延評価のパイプラインが生成する要素の数を、要素を集めずに知りたいときに `count` を使用してください。`source.toArray().length` と違って、配列を確保せずに数えます。これは終端操作です。すべての要素を取り出すため、無限イテレータに対して使用してはいけません。

```typescript
import { count } from 'es-toolkit/iterator';

// イテレータの要素を数えます。
count([1, 2, 3].values());
// 結果: 3

// 遅延評価のチェーンの後に残る要素を数えます。
count([1, 2, 3, 4, 5].values().filter(x => x % 2 === 1));
// 結果: 3
```

#### パラメータ

- `source` (`Iterator<T>`): 数える対象のイテレータです。

#### 戻り値

(`number`): `source` が生成する要素の数です。
