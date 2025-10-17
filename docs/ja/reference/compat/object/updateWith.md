# updateWith (Lodash 互換性)

::: warning 直接代入を使用してください

この `updateWith` 関数は複雑なパス解析とカスタマイザー処理により遅く動作します。

代わりに、より高速で現代的な直接プロパティ代入またはオプショナルチェーンを使用してください。

:::

オブジェクトの指定されたパスにある値を更新関数で変更し、カスタマイザーでパスの作成を制御します。

```typescript
const updated = updateWith(object, path, updater, customizer);
```

## インターフェース

```typescript
function updateWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown,
  customizer: (value: unknown) => unknown
): T;
```

### パラメータ

- `obj` (`T`): 変更するオブジェクト。
- `path` (`PropertyKey | readonly PropertyKey[]`): 更新するプロパティのパス。
- `updater` (`(value: unknown) => unknown`): 更新された値を生成する関数。
- `customizer` (`(value: unknown) => unknown`): 更新プロセスをカスタマイズする関数。

### 戻り値

(`T`): 変更されたオブジェクト。

## 例

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// カスタマイザー関数を使用してカスタムパス構造を作成
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }

// パス作成をカスタマイズ
updateWith(
  object,
  '[0][2]',
  () => 'b',
  value => {
    if (typeof value === 'number') {
      return [];
    }
  }
);
// => { '0': { '1': 'a', '2': 'b' } }
```
