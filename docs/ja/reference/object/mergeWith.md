# mergeWith

カスタムマージ関数を使用してソースオブジェクトをターゲットオブジェクトに深くマージしてターゲットオブジェクトを修正します。

```typescript
const result = mergeWith(target, source, mergeFunction);
```

## 参照

### `mergeWith(target, source, merge)`

2つのオブジェクトをマージする際、各プロパティに対してカスタムマージロジックを適用したい時に`mergeWith`を使用してください。マージ関数が`undefined`を返すと、デフォルトの深いマージロジックを使用します。

```typescript
import { mergeWith } from 'es-toolkit/object';

// 数値の値を加算してマージ
const target = { a: 1, b: 2, c: { x: 10 } };
const source = { b: 3, c: { x: 20, y: 30 }, d: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue, key) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue; // 数値は加算
  }
  // undefinedを返すとデフォルトのマージロジックを使用
});
// resultとtargetの両方が{ a: 1, b: 5, c: { x: 30, y: 30 }, d: 4 }になります

// 配列を連結してマージ
const arrayTarget = { items: [1, 2], metadata: { count: 2 } };
const arraySource = { items: [3, 4], metadata: { count: 2 } };

mergeWith(arrayTarget, arraySource, (targetValue, sourceValue) => {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    return targetValue.concat(sourceValue);
  }
});
// arrayTargetは{ items: [1, 2, 3, 4], metadata: { count: 2 } }になります

// キーに応じて異なるマージロジックを適用
const config = { timeout: 1000, retries: 3, features: { featureA: true } };
const updates = { timeout: 2000, retries: 5, features: { featureB: false } };

mergeWith(config, updates, (targetValue, sourceValue, key) => {
  if (key === 'timeout') {
    return Math.max(targetValue, sourceValue); // timeoutは大きい値を選択
  }
  if (key === 'retries') {
    return Math.min(targetValue, sourceValue); // retriesは小さい値を選択
  }
  // 他のプロパティはデフォルトのマージロジックを使用
});
// configは{ timeout: 2000, retries: 3, features: { featureA: true, featureB: false } }になります
```

#### パラメータ

- `target` (`T extends Record<PropertyKey, any>`): ソースオブジェクトをマージするターゲットオブジェクトです。このオブジェクトが修正されます。
- `source` (`S extends Record<PropertyKey, any>`): ターゲットオブジェクトにマージするソースオブジェクトです。
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): カスタムマージ関数です。
  - `targetValue`: ターゲットオブジェクトの現在の値
  - `sourceValue`: ソースオブジェクトの値
  - `key`: マージ中のプロパティのキー
  - `target`: ターゲットオブジェクト
  - `source`: ソースオブジェクト

#### 戻り値

(`T & S`): ソースオブジェクトがマージされたターゲットオブジェクトを返します。

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
