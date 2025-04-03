# updateWith

::: info
この関数は互換性のために`es-toolkit/compat`でのみ利用可能です。代替のネイティブJavaScript APIが存在するか、まだ完全に最適化されていません。

`es-toolkit/compat`からインポートする場合、この関数はlodashと全く同じように動作し、同じ機能を提供します。
:::

指定されたパスのオブジェクトの値をアップデーター関数とカスタマイザーを使用して更新します。パスの一部が存在しない場合はカスタマイザー関数に基づいて作成されます。

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

- `obj` (`T`): 修正するオブジェクトです。
- `path` (`PropertyKey | readonly PropertyKey[]`): 更新するプロパティのパスです。
- `updater` (`(value: unknown) => unknown`): 更新された値を生成する関数です。
- `customizer` (`(value: unknown) => unknown`): 更新プロセスをカスタマイズする関数です。

### 戻り値

(`T`): 修正されたオブジェクトです。

## 例

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = { a: [{ b: { c: 3 } }] };

// カスタマイザー関数を使用してカスタムパス構造を作成する
updateWith(object, '[0].a.b.c', n => (n as number) + 1, customizer);
// => { '0': { a: { b: { c: 4 } } }, a: [{ b: { c: 3 } }] }

function customizer(value: unknown) {
  if (value == null) {
    return {};
  }
  return value;
}
```
