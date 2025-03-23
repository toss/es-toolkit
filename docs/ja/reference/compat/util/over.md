# over

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられたイテレータ（iteratees）を引数と共に呼び出し、その結果を配列として返す関数を生成します。

以下のような様々なタイプのイテレータを使用できます：

- **関数**: 各関数は同じ引数で呼び出され、結果が収集されます。
- **プロパティ名**: 各プロパティ名は、提供されたオブジェクトから値を抽出するために使用されます。
- **オブジェクト**: 各オブジェクトは、提供されたオブジェクトがそのプロパティと一致するかを確認するために使用されます。
- **プロパティ-値ペア**: 各ペアは、提供されたオブジェクトの特定のプロパティが値と一致するかを確認します。

## インターフェース

```typescript
// 関数イテレータを使用
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];

// プロパティ-値ペアを使用
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];

// オブジェクトマッチャーを使用
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];

// プロパティアクセサを使用
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### パラメータ

- `iteratees`: 呼び出すイテレータです。以下の形式が可能です：
  - **関数の配列**: 各関数は同じ引数で呼び出されます。
  - **プロパティ-値ペアの配列**: 各ペアは、指定されたプロパティが与えられた値と一致するかを確認します。
  - **オブジェクトの配列**: 各オブジェクトは、提供されたオブジェクトが一致するかを確認するために使用されます。
  - **プロパティキーの配列**: 各プロパティキーは、提供されたオブジェクトから値にアクセスするために使用されます。

::: info nullish値の処理
イテレータ配列に `null` や `undefined` 値が含まれている場合、実行時には恒等関数（identity function）として処理されます。ただし、適切な型定義がない場合、TypeScriptの型エラーが発生します。この動作は、lodashの機能と完全に一致するように意図的に実装されています。
:::

### 戻り値

引数が与えられた時に、すべてのイテレータをその引数で呼び出し、結果の配列を返す関数です。

## 例

### 関数イテレータの使用

```typescript
import { over } from 'es-toolkit/compat';

// 標準関数の使用
const func = over([Math.max, Math.min]);
console.log(func(1, 2, 3, 4)); // => [4, 1]

// カスタム関数の使用
const greet = name => `Hello, ${name}!`;
const shout = name => `HEY, ${name.toUpperCase()}!!!`;
const greeter = over([greet, shout]);
console.log(greeter('world')); // => ['Hello, world!', 'HEY, WORLD!!!']

// thisバインディングの使用
const obj = {
  a: 1,
  b: 2,
  func: over([
    function () {
      return this.a;
    },
    function () {
      return this.b;
    },
  ]),
};
console.log(obj.func()); // => [1, 2]
```

### プロパティアクセサの使用

```typescript
import { over } from 'es-toolkit/compat';

// オブジェクトからプロパティにアクセス
const prop = over(['a', 'b']);
console.log(prop({ a: 1, b: 2 })); // => [1, 2]

// 数値プロパティも動作します
const items = ['apple', 'banana', 'cherry'];
const getItems = over([0, 2]);
console.log(getItems(items)); // => ['apple', 'cherry']
```

### オブジェクトマッチャーの使用

```typescript
import { over } from 'es-toolkit/compat';

// オブジェクトがパターンと一致するか確認
const matcher = over([{ a: 1 }, { b: 2 }]);
console.log(matcher({ a: 1, b: 2 })); // => [true, false]
console.log(matcher({ a: 1, b: 1 })); // => [true, false]

// 空のオブジェクトはすべてに一致します
const alwaysTrue = over([{}]);
console.log(alwaysTrue({ a: 1 })); // => [true]
```

### プロパティ-値ペアの使用

```typescript
import { over } from 'es-toolkit/compat';

// プロパティが値と一致するか確認
const matchProp = over([
  ['a', 1],
  ['b', 2],
]);
console.log(matchProp({ a: 1, b: 2 })); // => [true, true]
console.log(matchProp({ a: 2, b: 1 })); // => [false, false]
```

### エッジケース

```typescript
import { over } from 'es-toolkit/compat';

// 空のイテレータ配列
const emptyFunc = over([]);
console.log(emptyFunc(1, 2, 3)); // => []

// nullまたはundefined値（恒等関数として処理）
// 注意：型アサーションなしではTypeScriptエラーが発生します
const nullFunc = over([null, undefined]);
console.log(nullFunc('a', 'b', 'c')); // => ['a', 'a']
```
