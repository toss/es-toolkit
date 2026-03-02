# extendWith (Lodash 互換性)

::: warning 代わりに `Object.assign()` とカスタム関数を使用してください

この `extendWith` 関数は、プロトタイプチェーンから継承されたプロパティの処理とカスタムマージロジックにより、複雑で遅く動作します。

代わりに、より高速で現代的な `Object.assign()` とカスタム関数を使用してください。

:::

オブジェクトの固有プロパティと継承されたプロパティをカスタム関数で処理して、他のオブジェクトにコピーします。

```typescript
const result = extendWith(object, source, customizer);
```

## 使用法

### `extendWith(object, ...sources, customizer)`

オブジェクトのプロパティをカスタムロジックでマージする場合は `extendWith` を使用してください。`extend` と似ていますが、各プロパティをどのようにマージするかを自分で決定できます。この関数は `assignInWith` のエイリアスです。

```typescript
import { extendWith } from 'es-toolkit/compat';

// カスタムマージロジックでプロパティをコピー
const target = { a: 1, b: 2 };
extendWith(target, { b: 3, c: 4 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 戻り値: { a: 1, b: 2, c: 4 }

// 配列を連結するカスタムマージ
const obj1 = { a: [1, 2] };
const obj2 = { a: [3, 4], b: [5, 6] };
extendWith(obj1, obj2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 戻り値: { a: [1, 2, 3, 4], b: [5, 6] }
```

複数のソースオブジェクトを使用できます。

```typescript
import { extendWith } from 'es-toolkit/compat';

extendWith({ a: 1 }, { b: 2 }, { c: 3 }, (objValue, srcValue) => srcValue * 2);
// 戻り値: { a: 1, b: 4, c: 6 }
```

#### パラメータ

- `object` (`any`): プロパティをコピーされるターゲットオブジェクトです。
- `...sources` (`any[]`): プロパティを提供するソースオブジェクトです。
- `customizer` (`function`): 各プロパティに割り当てる値を決定する関数です。`(objValue, srcValue, key, object, source)` を受け取ります。

#### 戻り値

(`any`): プロパティがコピーされたオブジェクトを返します。最初の引数である `object` が変更されます。
