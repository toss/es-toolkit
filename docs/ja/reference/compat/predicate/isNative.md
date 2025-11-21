# isNative (Lodash 互換性)

値がJavaScript エンジンのネイティブ関数かどうかを確認します。

```typescript
const result = isNative(value);
```

## 使用法

### `isNative(value)`

与えられた値がJavaScript エンジンで実装されたネイティブ関数かどうかを確認する際に `isNative` を使用してください。ブラウザやNode.jsで提供される内蔵関数を区別することができます。

```typescript
import { isNative } from 'es-toolkit/compat';

// ネイティブ関数
isNative(Array.prototype.push); // true
isNative(Object.keys); // true
isNative(Math.max); // true
isNative(JSON.parse); // true
isNative(console.log); // true（ブラウザ/Node.js環境で）

// ユーザー定義関数
isNative(function () {}); // false
isNative(() => {}); // false
isNative(function customFunction() {}); // false

// ライブラリ関数
isNative(require('lodash').map); // false
isNative(require('es-toolkit').chunk); // false

// 関数でない値
isNative({}); // false
isNative([]); // false
isNative('function'); // false
isNative(123); // false
isNative(null); // false

// バインドされた関数
const boundFunction = Array.prototype.push.bind([]);
isNative(boundFunction); // true（バインドされた関数はネイティブです）

// メソッド
const obj = { method: Array.prototype.push };
isNative(obj.method); // true（依然としてネイティブ関数）
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値がネイティブ関数と見える場合は `true`、そうでなければ `false` を返します。
