# isFunction

与えられた値が関数かどうかを確認します。

```typescript
const result = isFunction(value);
```

## 参照

### `isFunction(value)`

値が関数かどうかを確認したい場合に `isFunction` を使用してください。一般的な関数、非同期関数、ジェネレーター関数、コンストラクタ関数など、すべての種類の関数を検出できます。

```typescript
import { isFunction } from 'es-toolkit/predicate';

// 一般的な関数
console.log(isFunction(function() {})); // true
console.log(isFunction(() => {})); // true
console.log(isFunction(Array.prototype.slice)); // true

// 非同期関数
console.log(isFunction(async function() {})); // true
console.log(isFunction(async () => {})); // true

// ジェネレーター関数
console.log(isFunction(function* () {})); // true

// コンストラクタ関数
console.log(isFunction(Array)); // true
console.log(isFunction(Date)); // true
console.log(isFunction(RegExp)); // true
console.log(isFunction(Promise)); // true
```

組み込み JavaScript 関数とクラスも検出します。

```typescript
// 組み込みコンストラクタ
console.log(isFunction(Object)); // true
console.log(isFunction(String)); // true
console.log(isFunction(Number)); // true
console.log(isFunction(Boolean)); // true

// 型付き配列コンストラクタ
console.log(isFunction(Int8Array)); // true
console.log(isFunction(Uint8Array)); // true
console.log(isFunction(Float32Array)); // true

// Proxy と Reflect
console.log(isFunction(Proxy)); // true
console.log(isFunction(Reflect.get)); // true
```

関数でない値と区別します。

```typescript
// 関数でないもの
console.log(isFunction({})); // false
console.log(isFunction([])); // false
console.log(isFunction('text')); // false
console.log(isFunction(42)); // false
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false

// 関数のように見えても関数でないもの
console.log(isFunction({ call: function() {} })); // false
```

コールバック関数の検証や動的な関数呼び出しで便利です。

```typescript
// コールバック関数の検証
function processData(data: any[], callback?: unknown) {
  const result = data.map(item => item * 2);

  if (isFunction(callback)) {
    // callback が関数であることが確実なので、安全に呼び出せます
    callback(result);
  }

  return result;
}

// 動的な関数実行
function executeIfFunction(fn: unknown, ...args: any[]) {
  if (isFunction(fn)) {
    return fn(...args);
  }

  console.log('与えられた値は関数ではありません');
  return null;
}

// メソッドチェーンでの関数確認
const utils = {
  data: [1, 2, 3],
  process(fn: unknown) {
    if (isFunction(fn)) {
      this.data = this.data.map(fn);
    }
    return this;
  }
};
```

#### パラメータ

- `value` (`unknown`): 関数かどうかを確認する値です。

#### 戻り値

(`value is (...args: any[]) => any`): 値が関数の場合は `true`、そうでなければ `false` を返します。
