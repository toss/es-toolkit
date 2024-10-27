# toMerged

`source`が持つ値を`target`オブジェクトにマージします。

この関数は深いマージを実行し、ネストされたオブジェクトや配列も再帰的にマージされます。

- `source`と`target`のプロパティが両方ともオブジェクトまたは配列の場合、2つのオブジェクトと配列はマージされます。
- `source`のプロパティが`undefined`の場合、`target`のプロパティは上書きされません。

[merge](./merge.md)とは異なり、この関数は`target`オブジェクトを変更しません。

## インターフェース

```typescript
function toMerged<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(target: T, source: S): T & S;
```

### パラメータ

- `target` (`T`): `source`オブジェクトのプロパティをマージする対象のオブジェクト。
- `source` (`S`): `target`オブジェクトにプロパティをマージするオブジェクト。

### 戻り値

(`T & S`): `source`と`target`オブジェクトのプロパティがマージされた新しいオブジェクト

## 例

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
// 戻り値: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = toMerged(target, source);
console.log(result);
// 戻り値: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = toMerged(target, source);
console.log(result);
// 戻り値: { a: [1, 2, 3] }
```

## デモ

::: sandpack

```ts index.ts
import { toMerged } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
```

:::
