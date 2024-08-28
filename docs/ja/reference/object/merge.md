# merge

`source`が持つ値を`target`オブジェクトにマージします。

この関数は深いマージを実行し、ネストされたオブジェクトや配列も再帰的にマージされます。

- `source`と`target`のプロパティが両方ともオブジェクトまたは配列の場合、2つのオブジェクトと配列はマージされます。
- `source`のプロパティが`undefined`の場合、`target`のプロパティは上書きされません。

[toMerged](./toMerged.md)とは異なり、この関数は`target`オブジェクトを変更します。

## インターフェース

```typescript
function merge<T, S>(target: T, source: S): T & S;
```

### パラメータ

- `target` (`T`): `source`オブジェクトのプロパティをマージするオブジェクト。このオブジェクトは関数によって変更されます。
- `source` (`S`): `target`オブジェクトにプロパティをマージするオブジェクト。

### 戻り値

(`T & S`): `source`オブジェクトのプロパティがマージされた`target`オブジェクト。

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

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 271 bytes (97.8% smaller)           | 1,952,436 times (3.65× faster)      |
| es-toolkit/compat | 4,381 bytes (64.9% smaller)         | 706,558 times (1.32× faster)        |
| lodash-es         | 12,483 bytes                        | 533,484 times                       |
