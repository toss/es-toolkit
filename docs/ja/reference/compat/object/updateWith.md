# updateWith (Lodash 互換性)

::: warning 直接代入を使用してください

この `updateWith` 関数は複雑なパス解析とカスタマイザー処理により遅く動作します。

代わりに、より高速で現代的な直接プロパティ代入またはオプショナルチェーンを使用してください。

:::

オブジェクトの指定されたパスにある値を更新関数で変更し、カスタマイザーでパスの作成を制御します。

```typescript
const updated = updateWith(obj, path, updater, customizer);
```

## 使用法

### `updateWith(obj, path, updater, customizer?)`

`update` と似ていますが、パスが存在しない場合に作成される中間オブジェクトの形状をカスタマイザー関数で制御できます。

```typescript
import { updateWith } from 'es-toolkit/compat';

// 基本動作（update と同じ）
const object = { a: [{ b: { c: 3 } }] };
updateWith(object, 'a[0].b.c', n => n * n);
// => { a: [{ b: { c: 9 } }] }

// 配列パスで更新
updateWith(object, ['a', 0, 'b', 'c'], n => n + 10);
// => { a: [{ b: { c: 13 } }] }
```

カスタマイザーを使用して作成される中間オブジェクトの形状を制御できます。

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// Object コンストラクタをカスタマイザーとして使用（配列の代わりにオブジェクトを作成）
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }
// （デフォルトの動作では { '0': ['a'] } になります）
```

カスタマイザーは作成する値、キー、オブジェクトを引数として受け取ります。

```typescript
import { updateWith } from 'es-toolkit/compat';

const customizer = (value: any, key: string, object: any) => {
  // 数値キーの場合は配列ではなくオブジェクトを作成
  if (!isNaN(Number(key))) {
    return {};
  }
};

const result = {};
updateWith(result, '[0][1]', () => 'value', customizer);
// => { '0': { '1': 'value' } }
```

パスが既に存在する場合、カスタマイザーは呼び出されません。

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = { a: { b: 1 } };
updateWith(
  object,
  'a.b',
  n => n * 2,
  () => {
    console.log('Not called'); // 呼び出されません
    return {};
  }
);
// => { a: { b: 2 } }
```

#### パラメータ

- `obj` (`T`): 変更するオブジェクトです。
- `path` (`PropertyKey | readonly PropertyKey[]`): 更新するプロパティのパスです。文字列または配列で指定できます。
- `updater` (`(oldValue: any) => any`): 既存の値を受け取って新しい値を返す関数です。
- `customizer` (`(value: any, key: string, object: T) => any`, オプション): パスが存在しない場合に作成する中間オブジェクトを返す関数です。`undefined` を返すとデフォルトの動作を使用します。

#### 戻り値

(`T`): 変更されたオブジェクトを返します。
