# isJSONArray

与えられた値が有効な JSON 配列かどうかを確認します。

```typescript
const result = isJSONArray(value);
```

## 参照

### `isJSONArray(value)`

配列のすべての要素が有効な JSON 値かどうかを確認したい場合に `isJSONArray` を使用してください。有効な JSON 配列とは、すべての項目が JSON としてシリアライズ可能な値（`null`、オブジェクト、配列、文字列、数値、真偽値）のみで構成された配列です。

```typescript
import { isJSONArray } from 'es-toolkit/predicate';

// 有効な JSON 配列
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['hello', 'world'])); // true
console.log(isJSONArray([true, false, null])); // true
console.log(isJSONArray([{ name: 'John' }, { name: 'Jane' }])); // true
console.log(
  isJSONArray([
    [1, 2],
    [3, 4],
  ])
); // true (ネストされた配列)
console.log(isJSONArray([])); // true (空の配列)

// 複合的な有効な JSON 配列
const complexArray = [42, 'text', true, null, { key: 'value' }, [1, 2, 3]];
console.log(isJSONArray(complexArray)); // true
```

無効な JSON 配列と区別します。

```typescript
// 関数が含まれる配列 - 無効
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray([function () {}])); // false

// undefined が含まれる配列 - 無効
console.log(isJSONArray([1, undefined, 3])); // false

// Symbol が含まれる配列 - 無効
console.log(isJSONArray([Symbol('test')])); // false

// Date オブジェクトが含まれる配列 - 無効（JSON では文字列に変換する必要がある）
console.log(isJSONArray([new Date()])); // false

// 配列でない値
console.log(isJSONArray('not an array')); // false
console.log(isJSONArray({ 0: 'a', 1: 'b', length: 2 })); // false (配列風オブジェクト)
console.log(isJSONArray(42)); // false
console.log(isJSONArray(null)); // false
```

API レスポンスの検証やデータシリアライズ前の検証で便利です。

```typescript
// API レスポンスの検証
function processApiArray(data: unknown) {
  if (isJSONArray(data)) {
    // 安全に JSON.stringify を使用できます
    const jsonString = JSON.stringify(data);
    console.log('シリアライズされた配列:', jsonString);
    return data;
  }

  throw new Error('有効な JSON 配列ではありません');
}

// ユーザー入力データの検証
function validateUserList(input: unknown): any[] {
  if (isJSONArray(input)) {
    // TypeScript が input を any[] として型推論します
    return input;
  }

  return [];
}

// 設定配列の検証
function loadArrayConfig(config: unknown) {
  if (isJSONArray(config)) {
    return {
      isValid: true,
      items: config,
      count: config.length,
    };
  }

  return {
    isValid: false,
    items: [],
    count: 0,
  };
}

// ネストされた構造でも動作します
const nestedData = [{ users: [{ name: 'Alice' }, { name: 'Bob' }] }, { users: [{ name: 'Charlie' }] }];
console.log(isJSONArray(nestedData)); // true
```

関数を要素として持つ配列や、`TypedArray` オブジェクトのように JSON としてシリアライズできない配列に対しては `false` を返します。

```typescript
// 一般的な配列 vs JSON 配列
const regularArray = [1, 2, function () {}]; // 通常は有効な配列
const jsonArray = [1, 2, 3]; // JSON シリアライズ可能な配列

console.log(Array.isArray(regularArray)); // true (一般的な配列チェック)
console.log(isJSONArray(regularArray)); // false (JSON 配列チェック)

console.log(Array.isArray(jsonArray)); // true
console.log(isJSONArray(jsonArray)); // true

// TypedArray は JSON 配列ではありません
const typedArray = new Int32Array([1, 2, 3]);
console.log(Array.isArray(typedArray)); // false
console.log(isJSONArray(typedArray)); // false
```

#### パラメータ

- `value` (`unknown`): 有効な JSON 配列かどうかを確認する値です。

#### 戻り値

(`value is any[]`): 値が有効な JSON 配列の場合は `true`、そうでなければ `false` を返します。
