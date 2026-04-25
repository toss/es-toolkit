# mergeWith (Lodash 互換性)

::: warning `es-toolkit`の`mergeWith`を使用してください

この `mergeWith` 関数は、複雑な型チェック、循環参照処理、特殊オブジェクト処理により相対的に遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`mergeWith`](../../object/mergeWith.md)を使用してください。

:::

カスタマイザー関数でマージ方法を制御しながら、複数のオブジェクトを深くマージします。

```typescript
const result = mergeWith(target, ...sources, customizer);
```

## 使用法

### `mergeWith(object, ...sources, customizer)`

ターゲットオブジェクトに1つ以上のソースオブジェクトを深くマージしますが、カスタマイザー関数でマージ方法を制御します。カスタマイザー関数が`undefined`を返す場合、デフォルトのマージロジックが使用されます。配列の連結や特別なマージルールが必要な場合に便利です。

```typescript
import { mergeWith } from 'es-toolkit/compat';

// 数値を加算
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = mergeWith(obj1, obj2, (objValue, srcValue) => {
  if (typeof objValue === 'number' && typeof srcValue === 'number') {
    return objValue + srcValue;
  }
});
// 結果: { a: 1, b: 5, c: 4 }

// 配列を連結
const arr1 = { items: [1, 2] };
const arr2 = { items: [3, 4] };
const merged = mergeWith(arr1, arr2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 結果: { items: [1, 2, 3, 4] }

// 文字列を連結
const str1 = { message: 'Hello' };
const str2 = { message: 'World' };
const combined = mergeWith(str1, str2, (objValue, srcValue, key) => {
  if (key === 'message' && typeof objValue === 'string') {
    return objValue + ' ' + srcValue;
  }
});
// 結果: { message: 'Hello World' }

// 複数のソースオブジェクトとカスタマイザー
const base = { scores: [80] };
const quiz1 = { scores: [90] };
const quiz2 = { scores: [85] };
const final = mergeWith(base, quiz1, quiz2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 結果: { scores: [80, 90, 85] }
```

カスタマイザー関数は様々なパラメータを受け取ります。

```typescript
import { mergeWith } from 'es-toolkit/compat';

const customizer = (objValue, srcValue, key, object, source, stack) => {
  console.log('マージ中:', key, objValue, '->', srcValue);

  // 特定のキーに対してのみカスタマイズ
  if (key === 'specialField') {
    return `${objValue}_${srcValue}`;
  }

  // undefinedを返すとデフォルトのマージロジックを使用
  return undefined;
};
```

#### パラメータ

- `object` (`any`): マージ先となるターゲットオブジェクトです。このオブジェクトは変更されます。
- `...sources` (`any[]`): マージするソースオブジェクトです。
- `customizer` (`MergeWithCustomizer`): 値の割り当てをカスタマイズする関数です。形式: `(objValue, srcValue, key, object, source, stack) => any`。

#### 戻り値

(`any`): マージされたターゲットオブジェクトを返します。
