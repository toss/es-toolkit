# merge

ソースオブジェクトをターゲットオブジェクトに深くマージしてターゲットオブジェクトを修正します。

```typescript
const result = merge(target, source);
```

## 使用法

### `merge(target, source)`

2つのオブジェクトを深くマージしたい時に`merge`を使用してください。ネストされたオブジェクトと配列も再帰的にマージされます。[toMerged](./toMerged.md)とは異なり、元の`target`オブジェクトが修正されます。

```typescript
import { merge } from 'es-toolkit/object';

// 基本的なオブジェクトマージ
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// resultとtargetの両方が{ a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }になります

// 配列もマージされます
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
merge(arrayTarget, arraySource);
// arrayTargetは{ a: [3, 2], b: { x: 1, y: 2 } }になります

// null値も適切に処理します
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
merge(nullTarget, nullSource);
// nullTargetは{ a: [1, 2, 3] }になります
```

`undefined`値は既存の値を上書きしません。

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
merge(target, source);
// targetは{ a: 1, b: 2, c: 3 }になります (bは上書きされません)
```

#### パラメータ

- `target` (`T extends Record<PropertyKey, any>`): ソースオブジェクトをマージするターゲットオブジェクトです。このオブジェクトが修正されます。
- `source` (`S extends Record<PropertyKey, any>`): ターゲットオブジェクトにマージするソースオブジェクトです。

#### 戻り値

(`MergeDeep<T, S>`): ソースオブジェクトがマージされたターゲットオブジェクトを返します。

## 例

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
// 戻り値: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = merge(target, source);
console.log(result);
// 戻り値: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = merge(target, source);
console.log(result);
// 戻り値: { a: [1, 2, 3] }
```

## デモ

::: sandpack

```ts index.ts
import { merge } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
```

:::

## パフォーマンス比較

|                   | [バンドルサイズ](../../bundle-size.md) | [ランタイムパフォーマンス](../../performance.md) |
| ----------------- | -------------------------------------- | ------------------------------------------------ |
| es-toolkit        | 271 bytes (97.8% smaller)              | 1,952,436 times (3.65× faster)                   |
| es-toolkit/compat | 4,381 bytes (64.9% smaller)            | 706,558 times (1.32× faster)                     |
| lodash-es         | 12,483 bytes                           | 533,484 times                                    |
