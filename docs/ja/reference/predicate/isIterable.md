# isIterable

値がイテラブル（iterable）かどうかを確認します。

```typescript
const result = isIterable(value);
```

## 使用法

### `isIterable(value)`

値がイテラブルプロトコルを実装しているか、つまり `Symbol.iterator` メソッドを持っているかを確認したい場合は `isIterable` を使用してください。配列、文字列、`Set`、`Map`、TypedArray、ジェネレーターはイテラブルです。プレーンオブジェクトや `null`、`undefined` はイテラブルではありません。

```typescript
import { isIterable } from 'es-toolkit/predicate';

// イテラブルな値
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable('abc')); // true
console.log(isIterable(new Set([1, 2, 3]))); // true
console.log(isIterable(new Map())); // true

// イテラブルではない値
console.log(isIterable({ a: 1 })); // false
console.log(isIterable(123)); // false
console.log(isIterable(null)); // false
```

TypeScript では型ガードとしても使用できます。

```typescript
function collect(value: unknown): unknown[] {
  // この分岐の中では `value` は `Iterable<unknown>` に絞り込まれます
  if (isIterable(value)) {
    return [...value];
  }
  return [];
}
```

#### パラメータ

- `value` (`unknown`): 確認する値です。

#### 戻り値

(`value is Iterable<unknown>`): 値がイテラブルであれば `true`、そうでなければ `false` を返します。
