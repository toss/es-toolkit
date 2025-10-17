# update (Lodash 互換性)

::: warning 直接代入を使用してください

この `update` 関数は複雑なパス解析とネストされたオブジェクト作成ロジックにより遅く動作します。

代わりに、より高速で現代的な直接プロパティ代入またはオプショナルチェーンを使用してください。

:::

オブジェクトの指定されたパスにある値を更新関数で変更します。

```typescript
const updated = update(object, path, updater);
```

## インターフェース

```typescript
function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T;
```

### パラメータ

- `obj` (`T`): 変更するオブジェクト。
- `path` (`PropertyKey | readonly PropertyKey[]`): 更新するプロパティのパス。
- `updater` (`(value: unknown) => unknown`): 更新された値を生成する関数。

### 戻り値

(`T`): 変更されたオブジェクト。

## 例

```typescript
import { update } from 'es-toolkit/compat';

const object = { a: [{ b: { c: 3 } }] };

// 更新関数を使用して値を更新
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// パスが存在しない場合は値を作成
update({}, 'a.b[0]', () => 'c');
// => { a: { b: ['c'] } }
```
