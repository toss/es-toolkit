# hash

任意の値を安定した43文字の文字列にハッシュ化します。

```typescript
const hashed = hash(value);
```

## 使用法

### `hash(value)`

キャッシュキーや変更検知トークンのように、値の短く安定した識別子が必要な場合に `hash` を使用してください。値はまず [`serialize`](./serialize.md) でシリアライズされるため、同じ構造を持つ2つの値はキーの挿入順序に関係なく常に同じハッシュになり、その結果を SHA-256 でダイジェストして Base64URL 形式でエンコードします。

`hash` は専用のエントリポイント `es-toolkit/util/hash` からのみ使用できます。メインのエントリポイントからは決して到達できないため、明示的にインポートしない限りバンドルサイズに影響しません。

```typescript
import { hash } from 'es-toolkit/util/hash';

hash({ b: 2, a: 1 }) === hash({ a: 1, b: 2 });
// true を返します

hash([1, 2, 3]);
// 'phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ' を返します

hash(new Set([3, 1, 2])) === hash(new Set([1, 2, 3]));
// true を返します

hash({ a: 1 }) === hash({ a: 2 });
// false を返します
```

Node.js ではネイティブの `node:crypto` 実装を使用し、Node.js 20.12 以降が必要です。ブラウザやエッジランタイムでは、バイト単位で同一の出力を生成する純粋な JavaScript の SHA-256 実装を使用するため、ハッシュはプラットフォームに関係なく安定しています。

`Promise`、`WeakMap`、`Blob` のようにシリアライズできない値は `TypeError` をスローします。

```typescript
hash(new WeakMap());
// TypeError: Cannot serialize WeakMap
```

::: warning セキュリティ目的には設計されていません

`hash` はキャッシュキーと変更検知のために作られています。シリアライズ形式は文字列やキーをエスケープしないため、意図的に衝突する入力を作ることができます。パスワードや署名など、セキュリティが重要な用途には使用しないでください。

:::

#### パラメータ

- `value` (`unknown`):ハッシュ化する値です。

#### 戻り値

(`string`):シリアライズされた値の SHA-256 ハッシュを Base64URL でエンコードした43文字の文字列です。

#### エラー

(`TypeError`):シリアライズできないオブジェクトが含まれている場合にスローされます。
