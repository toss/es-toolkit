# toMerged

ターゲットオブジェクトのコピーにソースオブジェクトを深くマージした新しいオブジェクトを返します。

```typescript
const result = toMerged(target, source);
```

## 使用法

### `toMerged(target, source)`

2つのオブジェクトを深くマージするが元のオブジェクトを修正したくない時に`toMerged`を使用してください。[merge](./merge.md)とは異なり、元の`target`オブジェクトは修正されず、新しいオブジェクトが返されます。

```typescript
import { toMerged } from 'es-toolkit/object';

// 基本的なオブジェクトマージ
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
// resultは{ a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }になります
// targetはそのまま{ a: 1, b: { x: 1, y: 2 } }で維持されます

// 配列もマージされます
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
const arrayResult = toMerged(arrayTarget, arraySource);
// arrayResultは{ a: [3, 2], b: { x: 1, y: 2 } }になります
// arrayTargetは変更されません

// null値も適切に処理します
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
const nullResult = toMerged(nullTarget, nullSource);
// nullResultは{ a: [1, 2, 3] }になります
```

`undefined`値は既存の値を上書きしません。

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
const result = toMerged(target, source);
// resultは{ a: 1, b: 2, c: 3 }になります (bは上書きされません)
```

#### パラメータ

- `target` (`T extends Record<PropertyKey, any>`): マージされるターゲットオブジェクトです。このオブジェクトは修正されません。
- `source` (`S extends Record<PropertyKey, any>`): ターゲットオブジェクトにマージするソースオブジェクトです。

#### 戻り値

(`MergeDeep<T, S>`): ターゲットオブジェクトとソースオブジェクトがマージされた新しいオブジェクトを返します。

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
