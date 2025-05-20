# overArgs

::: info
この関数は互換性のための `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と全く同じように動作](../../../compatibility.md)します。
:::

`overArgs` は、対象関数 (`func`) を呼び出す際に渡される引数たちを、事前に指定された変換仕様 (`transformsArgs`) に従って処理し、新しい関数を生成します。これらの変換仕様は、引数が元の `func` に渡される前に、各引数に個別に適用されます。

`transformsArgs` は個別引数として提供されるか、ネストされた配列形式で提供されることがあり、関数内部でフラット化処理された後、各要素が変換仕様として使用されます。

各変換仕様（`value`）は以下のように解釈され、対応する引数に適用される変換関数に変換されます：

- `function`: 対応する引数に直接適用される関数として使用されます。
- `null` または `undefined`: 対応する引数は変更されずにそのまま渡されます（即ち `identity`）。
- 長さ 2 の `Array`、`[path, value]`: 対応する引数がオブジェクトであると仮定し、`property(path)` で得られた値が `value` と等しいか確認する述語関数に変換されます（`matchesProperty(path, value)` を使用）。
- `object` (配列以外): 対応する引数がオブジェクトであると仮定し、オブジェクトのプロパティと一致するか確認する述語関数に変換されます（`matches(object)` を使用）。
- `string`、`number`、`boolean`、`symbol`: 対応する引数がオブジェクトであると仮定し、その値をプロパティパス/キーとして使用して値にアクセスする関数に変換されます（`property(path/key)` を使用）。`boolean` 値は文字列 `'true'` または `'false'` に変換されて使用されます。
- その他タイプ: 対応する引数は変更されずにそのまま渡されます（即ち `identity`）。

変換は新しい関数の最初の `n` 個の引数に適用されます。ここで `n` はフラット化された変換仕様の数です。変換数より多い引数は変更されずに元の関数に渡されます。

## インターフェース

```typescript
function overArgs<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  ...transformsArgs: Array<OverArgsTransformArg>
): (...args: any[]) => ReturnType<TFunc>; // 返される関数の引数型は any[] に単純化されます
```

### パラメータ

- func (TFunc extends (...args: any[]) => any): 変換された引数で呼び出される対象関数です。
- transformsArgs (Array<OverArgsTransformArg>): 引数に適用される変換仕様です。個別引数として、またはネストされた配列で提供できます。各仕様のタイプは上記の通りです。

### 戻り値

- (...args: any[]) => ReturnType<TFunc>: 인수에 변환을 적용한 새로운 함수를 반환해요.

## 例

```typescript
import { overArgs } from 'es-toolkit/compat';

function fn(...args) {
  return args;
}

const squareAndCube = (a, b) => `Square: ${a}, Cube: ${b}`;
const processNumbers = overArgs(
  squareAndCube,
  n => n * n,
  n => n * n * n
);

console.log(processNumbers(2, 3));
// => Square: 4, Cube: 27 (2 は 2*2=4 に、3 は 3*3*3=27 に変換されて squareAndCube に渡されます)

const formatUserInfo = (name, age) => `Name: ${name}, Age: ${age}`;
const processUserObject = overArgs(formatUserInfo, 'name', 'age');

console.log(processUserObject({ name: 'Alice', age: 30, city: 'Seoul' }, { name: 'Bob', age: 25, city: 'Busan' }));
// => Name: Alice, Age: 25 (最初のオブジェクトの 'name' と 2番目のオブジェクトの 'age' が抽出されて formatUserInfo に渡されます)

const checkAndGet = (isMatch, value) => `Match: ${isMatch}, Value: ${value}`;
const processObjectMatch = overArgs(checkAndGet, { id: 1 }, 'name');

console.log(processObjectMatch({ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }));
// => Match: true, Value: Item B ({ id: 1, name: 'Item A' } は { id: 1 } と一致するため true; { id: 2, name: 'Item B' } から 'name' を抽出)

const checkPropertyValue = isMatch => `Property matches: ${isMatch}`;
const processArrayMatch = overArgs(checkPropertyValue, ['status', 'active']);

console.log(processArrayMatch({ status: 'active', type: 'user' }));
// => Property matches: true ({ status: 'active', type: 'user' } の 'status' プロパティが 'active' と等しいため true)
console.log(processArrayMatch({ status: 'inactive', type: 'admin' }));
// => Property matches: false ({ status: 'inactive', type: 'admin' } の 'status' プロパティが 'active' と異なるため false)

const processBooleanKeys = overArgs(fn, true, false);
const objWithBooleanKeys = { true: 'Enabled', false: 'Disabled' };

console.log(processBooleanKeys(objWithBooleanKeys, objWithBooleanKeys));
// => [Enabled, Disabled] (各引数から 'true' および 'false' プロパティ値を抽出)

const processNested = overArgs(fn, [s => s.toUpperCase()], ['length', o => o.value]);

console.log(processNested('hello', 'world', { value: 123 }));
// overArgs は transformsArgs をフラット化: [s=>s.toUpperCase(), 'length', o => o.value]
// 最初の引数 'hello' に s=>s.toUpperCase() を適用 -> 'HELLO'
// 2番目の引数 'world' に 'length' (property('length')) を適用 -> 5
// 3番目の引数 { value: 123 } に o=>o.value を適用 -> 123
// fn('HELLO', 5, 123) を呼び出し
// => [HELLO, 5, 123]
```
