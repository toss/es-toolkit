# mergeWith

`source`が持つ値を`target`オブジェクトにマージします。

プロパティをどのようにマージするかを指定するために、`merge`関数引数を定義してください。`merge`関数引数は`target`オブジェクトに設定される値を返す必要があります。

`undefined`を返す場合、デフォルトで2つの値を深くマージします。深いマージでは、ネストされたオブジェクトや配列を次のように再帰的にマージします：

- `source`と`target`のプロパティが両方ともオブジェクトまたは配列の場合、2つのオブジェクトと配列はマージされます。
- `source`のプロパティが`undefined`の場合、`target`のプロパティは上書きされません。

この関数は`target`オブジェクトを変更します。

## インターフェース

```typescript
function mergeWith<T, S>(
  target: T,
  source: S,
  merge: (targetValue: any, sourceValue: any, key: string, target: T, source: S) => any
): T & S;
```

### パラメータ

- `target` (`T`): `source`オブジェクトが持つプロパティをマージするオブジェクト。このオブジェクトは関数によって変更されます。
- `source` (`S`): `target`オブジェクトにプロパティをマージするオブジェクト。
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): 2つの値をどのようにマージするかを定義する関数。以下の引数で呼び出されます：
  - `targetValue`: `target`オブジェクトが持つ値。
  - `sourceValue`: `source`オブジェクトが持つ値。
  - `key`: マージされているプロパティ名。
  - `target`: `target`オブジェクト。
  - `source`: `source`オブジェクト。

### 戻り値

(`T & S`): `source`オブジェクトが持つプロパティがマージされた`target`オブジェクト。

## 例

```typescript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
// 戻り値: { a: 1, b: 5, c: 4 }

const target = { a: [1], b: [2] };
const source = { a: [3], b: [4] };

const result = mergeWith(target, source, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 戻り値: { a: [1, 3], b: [2, 4] })
```

## デモ

::: sandpack

```ts index.ts
import { mergeWith } from 'es-toolkit';

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
console.log(result);
```

:::
