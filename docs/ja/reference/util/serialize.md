# serialize

任意の値を安定した文字列にシリアライズします。

```typescript
const serialized = serialize(value);
```

## 使用法

### `serialize(value)`

ハッシュ化、キャッシュキー、変更検知など、値の安定した文字列表現が必要な場合に `serialize` を使用してください。同じ構造を持つ2つの値は、常に同じ文字列にシリアライズされます。プレーンオブジェクトのキー、`Map` のキー、`Set` の値はソートされるため、出力は挿入順序に依存しません。

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// '{a:1,b:2}' を返します

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// true を返します

serialize([1, 2n, 'a', { k: 1 }]);
// "[1,2n,'a',{k:1}]" を返します

serialize(new Set([3, 1, 2]));
// 'Set[1,2,3]' を返します

serialize(
  new Map([
    ['b', 2],
    ['a', 1],
  ])
);
// 'Map{a:1,b:2}' を返します

serialize(new Date(0));
// 'Date(1970-01-01T00:00:00.000Z)' を返します

serialize(new Uint8Array([1, 2, 3]));
// 'Uint8Array[1,2,3]' を返します
```

クラスのインスタンスはクラス名と共にシリアライズされます。インスタンスに `toJSON` メソッドがある場合は、`toJSON` の結果がシリアライズされます。

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// "User{name:'Alice'}" を返します
```

循環参照は `#ref{n}` 形式のバックリファレンスとしてシリアライズされます。`n` はオブジェクトが最初に訪問された順序です。

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// '{self:#ref0}' を返します
```

`Promise`、`WeakMap`、`Blob` のように意味のあるシリアライズができないオブジェクトは `TypeError` をスローします。

```typescript
serialize(new WeakMap());
// TypeError: Cannot serialize WeakMap
```

::: warning セキュリティ目的には設計されていません

`serialize` は文字列やキーをエスケープしないため、異なる値が同じ文字列にシリアライズされるように意図的に作ることができます。キャッシュキーや変更検知に使用し、セキュリティが重要な用途には使用しないでください。

:::

#### パラメータ

- `value` (`unknown`):シリアライズする値です。

#### 戻り値

(`string`):シリアライズされた文字列です。

#### エラー

(`TypeError`):`Promise`、`WeakMap`、`WeakSet`、`Blob`、`DataView` のようにシリアライズできないオブジェクトが含まれている場合にスローされます。
