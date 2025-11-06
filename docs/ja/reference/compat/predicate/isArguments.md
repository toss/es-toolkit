# isArguments (Lodash互換性)

値がargumentsオブジェクトかどうかを確認します。

```typescript
const result = isArguments(value);
```

## 使用法

### `isArguments(value)`

指定された値が関数のargumentsオブジェクトかどうかを確認したい場合は`isArguments`を使用してください。この関数はTypeScriptでタイプガードとしても動作し、値の型を`IArguments`に絞り込みます。

```typescript
import { isArguments } from 'es-toolkit/compat';

// 通常の関数で
function normalFunction() {
  return isArguments(arguments); // true
}

// 厳密モードで
function strictFunction() {
  'use strict';
  return isArguments(arguments); // true
}

// argumentsではない値
isArguments([1, 2, 3]); // false
isArguments({ 0: 'a', 1: 'b', length: 2 }); // false
isArguments(null); // false
isArguments(undefined); // false

// 実際の使用例
function example() {
  if (isArguments(arguments)) {
    console.log('This is an arguments object');
    console.log('Length:', arguments.length);
  }
}
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値がargumentsオブジェクトの場合は`true`、そうでない場合は`false`を返します。
