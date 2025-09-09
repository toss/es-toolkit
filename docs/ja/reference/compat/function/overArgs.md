# overArgs

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::
`func` 関数の引数を変換関数で変換して呼び出す新しい関数を生成します。

変換関数は以下の形式を取ることができます：

- 値を受け取って返す関数
- 各引数からプロパティ値を取得するプロパティ名（文字列）
- 引数がオブジェクトのプロパティと一致するかを確認するオブジェクト
- 引数のプロパティが値と一致するかを確認する [プロパティ, 値] 配列

変換関数が `null` や `undefined` の場合は、[identity](../../function/identity.md) 関数が代わりに使用されます。
提供された変換関数の数だけ引数が変換されます。

## インターフェース

```typescript
function overArgs<F extends (...args: any[]) => any, T extends Array<any>>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数を変換して渡す関数。
- `transforms` (`T`): 引数を変換する関数の配列。

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 引数を変換してから `func` に渡す新しい関数を返します。

### エラー

`func` が関数でない場合は TypeError をスローします。

## 例

```typescript
import { overArgs } from 'es-toolkit/compat';

// With function transforms
function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

const func = overArgs((x, y) => [x, y], [doubled, square]);

func(5, 3);
// => [10, 9]

func(10, 5);
// => [20, 25]

// With property shorthand
const user = { name: 'John', age: 30 };
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);

getUserInfo(user, user);
// => "John is 30 years old"

// Only transform specific arguments
const partial = overArgs((a, b, c) => [a, b, c], [doubled]);

partial(5, 3, 2);
// => [10, 3, 2]
```
