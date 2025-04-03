# update

::: info
この関数は互換性のために`es-toolkit/compat`でのみ利用可能です。代替のネイティブJavaScript APIが存在するか、まだ完全に最適化されていません。

`es-toolkit/compat`からインポートする場合、この関数はlodashと全く同じように動作し、同じ機能を提供します。
:::

指定されたパスのオブジェクトの値をアップデーター関数を使用して更新します。パスの一部が存在しない場合は自動的に作成されます。

## インターフェース

```typescript
function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T;
```

### パラメータ

- `obj` (`T`): 修正するオブジェクトです。
- `path` (`PropertyKey | readonly PropertyKey[]`): 更新するプロパティのパスです。
- `updater` (`(value: unknown) => unknown`): 更新された値を生成する関数です。

### 戻り値

(`T`): 修正されたオブジェクトです。

## 例

```typescript
import { update } from 'es-toolkit/compat/object/update';

const object = { a: [{ b: { c: 3 } }] };

// パスにある値を更新する
update(object, 'a[0].b.c', n => (n as number) + 1);
// => { a: [{ b: { c: 4 } }] }

// 存在しないパスを更新すると自動的に作成される
update(object, 'x.y.z', () => 'created');
// => { a: [{ b: { c: 3 } }], x: { y: { z: 'created' } } }
```
