# update (Lodash 互換性)

::: warning 直接代入を使用してください

この `update` 関数は複雑なパス解析とネストされたオブジェクト作成ロジックにより遅く動作します。

代わりに、より高速で現代的な直接プロパティ代入またはオプショナルチェーンを使用してください。

:::

オブジェクトの指定されたパスにある値を更新関数で変更します。

```typescript
const updated = update(obj, path, updater);
```

## 参照

### `update(obj, path, updater)`

ネストされたオブジェクトの特定のパスにある値を関数で変換したい場合に `update` を使用してください。パスが存在しない場合は自動的に作成されます。

```typescript
import { update } from 'es-toolkit/compat';

// ネストされたプロパティ値を変換
const object = { a: [{ b: { c: 3 } }] };
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 配列パスで更新
update(object, ['a', 0, 'b', 'c'], n => (n as number) + 10);
// => { a: [{ b: { c: 13 } }] }
```

パスが存在しない場合、必要なネストされた構造が自動的に作成されます。

```typescript
import { update } from 'es-toolkit/compat';

// 空のオブジェクトにネストされた構造を作成
update({}, 'a.b.c', () => 'hello');
// => { a: { b: { c: 'hello' } } }

// 配列も自動作成されます
update({}, 'a.b[0]', () => 'value');
// => { a: { b: ['value'] } }
```

既存の値に基づいて新しい値を計算できます。

```typescript
import { update } from 'es-toolkit/compat';

const stats = { score: 100 };
update(stats, 'score', score => score * 1.1); // 10% 増加
// => { score: 110 }
```

#### パラメータ

- `obj` (`object`): 変更するオブジェクトです。
- `path` (`PropertyKey | PropertyKey[]`): 更新するプロパティのパスです。文字列または配列で指定できます。
- `updater` (`(value: any) => any`): 既存の値を受け取って新しい値を返す関数です。

#### 戻り値

(`any`): 変更されたオブジェクトを返します。
