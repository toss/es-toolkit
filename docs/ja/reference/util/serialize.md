# serialize

値を文字列にシリアライズします。

```typescript
const serialized = serialize(value);
```

## 使用法

### `serialize(value)`

値を文字列に変換したい場合は `serialize` を使用してください。組み込みの `JSON.stringify()` と異なり、`Map` や `Set`、`Date`、`RegExp` のような組み込みオブジェクトや、`BigInt` のような値もシリアライズできます。

`{ a: 1, b: 2 }` と `{ b: 2, a: 1 }` のように同じ構造を持つ値は、常に同じ安定した文字列にシリアライズされます。

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// "{'a':1,'b':2}" を返します

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// true を返します

serialize([1, 2n, 'a', { k: 1 }]);
// "[1,2n,'a',{'k':1}]" を返します

serialize(new Set([3, 1, 2]));
// 'Set[1,2,3]' を返します

serialize(
  new Map([
    ['b', 2],
    ['a', 1],
  ])
);
// "Map{'a':1,'b':2}" を返します

serialize(new Date(0));
// "Date('1970-01-01T00:00:00.000Z')" を返します

serialize(new Uint8Array([1, 2, 3]));
// 'Uint8Array[1,2,3]' を返します
```

各型は次のようにシリアライズされます。

| 型                             | 入力                            | 結果                                 |
| ------------------------------ | ------------------------------- | ------------------------------------ |
| 文字列                         | `'abc'`                         | `"'abc'"`                            |
| 数値                           | `123`                           | `"123"`                              |
|                                | `-0`                            | `"0"`                                |
|                                | `NaN`                           | `"NaN"`                              |
|                                | `Infinity`                      | `"Infinity"`                         |
| 真偽値                         | `true`                          | `"true"`                             |
| `undefined`                    | `undefined`                     | `"undefined"`                        |
| `null`                         | `null`                          | `"null"`                             |
| `BigInt`                       | `123n`                          | `"123n"`                             |
| シンボル                       | `Symbol('a')`                   | `"Symbol('a')"`                      |
| オブジェクト                   | `{ a: 1 }`                      | `"{'a':1}"`                          |
| 配列                           | `[1, 'a']`                      | `"[1,'a']"`                          |
| 関数                           | `function sum(a, b) {}`         | `"sum:function sum(a, b) {}"`        |
| ネイティブ関数                 | `Math.max`                      | `"max:[native]"`                     |
| `Date`                         | `new Date(0)`                   | `"Date('1970-01-01T00:00:00.000Z')"` |
| `RegExp`                       | `/ab+c/gi`                      | `"RegExp(/ab+c/gi)"`                 |
| `Set`                          | `new Set([3, 1, 2])`            | `"Set[1,2,3]"`                       |
| `Map`                          | `new Map([['a', 1]])`           | `"Map{'a':1}"`                       |
| TypedArray                     | `new Uint8Array([1, 2, 3])`     | `"Uint8Array[1,2,3]"`                |
|                                | `new BigInt64Array([1n, 2n])`   | `"BigInt64Array[1n,2n]"`             |
| `ArrayBuffer`                  | `new Uint8Array([1, 2]).buffer` | `"ArrayBuffer[1,2]"`                 |
| `Error`                        | `new TypeError('boom')`         | `"Error(TypeError: 'boom')"`         |
| `entries()` を持つオブジェクト | `new URLSearchParams('a=1')`    | `"URLSearchParams{'a':'1'}"`         |

クラスのインスタンスはクラス名と共にシリアライズされます。インスタンスに `toJSON` メソッドがある場合は、`toJSON` の結果がシリアライズされます。

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// "User{'name':'Alice'}" を返します
```

関数は `名前:ソース` の形式でシリアライズされます。コードのフォーマットによって結果が変わらないように、ソースの改行とその前後の空白は削除されます。ソースを確認できないネイティブ関数は `名前:[native]` としてシリアライズされます。

```typescript
function sum(a, b) {
  return a + b;
}
serialize(sum);
// 'sum:function sum(a, b) {return a + b;}' を返します

serialize(Math.max);
// 'max:[native]' を返します
```

循環参照は `#ref{n}` 形式のバックリファレンスとしてシリアライズされます。`n` はオブジェクトが最初に訪問された順序です。

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// "{'self':#ref0}" を返します
```

`Promise`、`WeakMap`、`Blob` のように意味のあるシリアライズができないオブジェクトは `TypeError` をスローします。

```typescript
serialize(new WeakMap());
// TypeError: Cannot serialize WeakMap
```

::: warning セキュリティが重要な用途には使用しないでください

`serialize` はパフォーマンスのために文字列やキーをエスケープしません。そのため、異なる値が同じ文字列にシリアライズされるように悪意のある入力を作ることができます。一般的な用途のキャッシュキーや変更検知に使用し、セキュリティが重要な場面では使用しないでください。

:::

#### パラメータ

- `value` (`unknown`):シリアライズする値です。

#### 戻り値

(`string`):シリアライズされた文字列です。

#### エラー

(`TypeError`):`Promise`、`WeakMap`、`WeakSet`、`Blob`、`DataView` のようにシリアライズできないオブジェクトが含まれている場合にエラーが発生します。
