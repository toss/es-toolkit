# setWith (Lodash 互換性)

::: warning 直接代入を使用してください

この `setWith` 関数は内部的に `updateWith` 関数を呼び出し、複雑なパス処理とカスタマイザーロジックにより遅く動作します。

代わりに、より高速で現代的な直接代入や分割代入を使用してください。

:::

カスタマイザー関数でオブジェクトの作成方法を制御しながら、指定されたパスに値を設定します。

```typescript
const result = setWith(obj, path, value, customizer);
```

## 使用法

### `setWith(object, path, value, customizer)`

オブジェクトの特定のパスに値を設定し、カスタマイザー関数で中間に作成されるオブジェクトのタイプを制御したい場合は、`setWith` を使用してください。カスタマイザーが `undefined` を返すと、デフォルトのロジック(配列インデックスなら配列、それ以外はオブジェクト)が使用されます。

```typescript
import { setWith } from 'es-toolkit/compat';

// 基本的な使い方(カスタマイザーなし)
const obj1 = {};
setWith(obj1, 'a.b.c', 4);
console.log(obj1);
// 結果: { a: { b: { c: 4 } } }

// 配列の作成を強制するカスタマイザー
const obj2 = {};
setWith(obj2, '[0][1]', 'value', () => []);
console.log(obj2);
// 結果: { '0': [undefined, 'value'] }

// 特定条件でのみカスタマイズ
const obj3 = {};
setWith(obj3, 'a[0].b.c', 'nested', (value, key) => {
  // 数値キー(配列インデックス)の場合のみ空オブジェクトを返す
  return typeof key === 'string' && /^\d+$/.test(key) ? {} : undefined;
});
console.log(obj3);
// 結果: { a: { '0': { b: { c: 'nested' } } } }

// Object コンストラクタをカスタマイザーとして使用
const obj4 = {};
setWith(obj4, 'x[0].y', 42, Object);
console.log(obj4);
// 結果: { x: { '0': { y: 42 } } }

// 複雑なカスタマイザーロジック
const obj5 = {};
setWith(obj5, 'data.items[0].props.config', 'value', (value, key, object) => {
  console.log('Creating:', key, 'in', object);

  // 特定のキーでは Map を使用
  if (key === 'props') {
    return new Map();
  }

  // 数値キーなら配列
  if (typeof key === 'string' && /^\d+$/.test(key)) {
    return [];
  }

  // デフォルトは通常のオブジェクト
  return {};
});

// WeakMap を中間オブジェクトとして使用
const obj6 = {};
setWith(obj6, 'cache.user.profile', 'data', (value, key) => {
  if (key === 'cache') {
    return new WeakMap();
  }
  return undefined; // デフォルトの動作を使用
});
```

カスタマイザー関数は3つのパラメータを受け取ります。

```typescript
import { setWith } from 'es-toolkit/compat';

const obj = {};
setWith(obj, 'a.b[0].c', 'value', (nsValue, key, nsObject) => {
  console.log('nsValue:', nsValue); // 現在の値(通常は undefined)
  console.log('key:', key); // 作成するキー
  console.log('nsObject:', nsObject); // 親オブジェクト

  // 特定の条件に応じて異なるオブジェクトタイプを返す
  return key === 'b' ? [] : {};
});
```

#### パラメータ

- `object` (`T`): 値を設定するオブジェクト。
- `path` (`PropertyPath`): 値を設定するプロパティのパス。
- `value` (`any`): 設定する値。
- `customizer` (`(nsValue: any, key: string, nsObject: T) => any`, オプション): 中間オブジェクトの作成をカスタマイズする関数。

#### 戻り値

(`T | R`): 変更されたオブジェクトを返します。
