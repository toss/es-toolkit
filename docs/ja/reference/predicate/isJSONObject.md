# isJSONObject

与えられた値が有効な JSON オブジェクトかどうかを確認します。

```typescript
const result = isJSONObject(value);
```

## 参照

### `isJSONObject(value)`

オブジェクトのすべてのキーが文字列で、すべての値が有効な JSON 値かどうかを確認したい場合に `isJSONObject` を使用してください。有効な JSON オブジェクトとは、文字列キーと JSON としてシリアライズ可能な値（`null`、オブジェクト、配列、文字列、数値、真偽値）のみで構成されたプレーンオブジェクトです。

```typescript
import { isJSONObject } from 'es-toolkit/predicate';

// 有効な JSON オブジェクト
console.log(isJSONObject({ name: 'John', age: 30 })); // true
console.log(isJSONObject({ active: true, score: null })); // true
console.log(isJSONObject({})); // true (空のオブジェクト)

// ネストされた構造も検証します
const nested = {
  user: {
    name: 'Alice',
    preferences: {
      theme: 'dark',
      notifications: true,
    },
  },
  data: [1, 2, 3],
  timestamp: null,
};
console.log(isJSONObject(nested)); // true

// 複合的な有効な JSON オブジェクト
const complex = {
  id: 42,
  title: 'Example',
  published: true,
  tags: ['javascript', 'tutorial'],
  author: {
    name: 'Developer',
    email: 'dev@example.com',
  },
  metadata: null,
};
console.log(isJSONObject(complex)); // true
```

関数、`Symbol`、`Date` オブジェクト、`undefined` のような JSON としてシリアライズできない値やクラスインスタンスが含まれる無効な JSON オブジェクトを正確に区別します。

```typescript
// 関数が含まれるオブジェクト - 無効
console.log(isJSONObject({ name: 'John', greet: () => {} })); // false
console.log(isJSONObject({ method: function () {} })); // false

// undefined が含まれるオブジェクト - 無効
console.log(isJSONObject({ name: 'John', age: undefined })); // false

// Symbol キーまたは値が含まれるオブジェクト - 無効
console.log(isJSONObject({ [Symbol('key')]: 'value' })); // false
console.log(isJSONObject({ name: Symbol('name') })); // false

// Date、RegExp などのオブジェクト - 無効
console.log(isJSONObject({ created: new Date() })); // false
console.log(isJSONObject({ pattern: /test/ })); // false

// クラスインスタンス - 無効
class Person {
  constructor(public name: string) {}
}
console.log(isJSONObject(new Person('John'))); // false

// オブジェクトでない値
console.log(isJSONObject('not an object')); // false
console.log(isJSONObject(42)); // false
console.log(isJSONObject([1, 2, 3])); // false
console.log(isJSONObject(null)); // false
```

`JSON.stringify` を安全に使用できるかどうかを検証するために使用できます。

```typescript
// API レスポンスの検証
function processApiResponse(data: unknown) {
  if (isJSONObject(data)) {
    // 安全に JSON.stringify を使用できます
    const jsonString = JSON.stringify(data);
    console.log('シリアライズされたオブジェクト:', jsonString);

    // TypeScript が data を Record<string, any> として型推論します
    return data;
  }

  throw new Error('有効な JSON オブジェクトではありません');
}

// 設定オブジェクトの検証
function loadConfig(config: unknown) {
  if (isJSONObject(config)) {
    return {
      isValid: true,
      config,
      keys: Object.keys(config),
    };
  }

  return {
    isValid: false,
    config: {},
    keys: [],
  };
}

// ユーザー入力データの検証
function validateUserData(input: unknown): Record<string, any> {
  if (isJSONObject(input)) {
    // すべてのプロパティが JSON シリアライズ可能であることを保証します
    return input;
  }

  throw new Error('ユーザーデータは有効な JSON オブジェクトである必要があります');
}

// ネストされたオブジェクトの検証
function validateNestedConfig(data: unknown) {
  if (isJSONObject(data)) {
    // ネストされたすべてのオブジェクトと配列も JSON の妥当性が保証されます
    console.log('設定が完全に JSON 互換です');
    return data;
  }

  return null;
}
```

`isJSONObject` は他のオブジェクトチェック関数とは異なる目的を持ちます。`isPlainObject` はプレーンオブジェクトかどうかを確認しますが、`isJSONObject` は JSON としてシリアライズできるオブジェクトかどうかを確認します。

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

const objectWithFunction = {
  name: 'John',
  greet: function () {
    return 'Hello';
  },
};

const plainJsonObject = {
  name: 'John',
  age: 30,
};

// プレーンオブジェクト vs JSON オブジェクト
console.log(isPlainObject(objectWithFunction)); // true (プレーンオブジェクト)
console.log(isJSONObject(objectWithFunction)); // false (関数が含まれるため JSON オブジェクトではない)

console.log(isPlainObject(plainJsonObject)); // true
console.log(isJSONObject(plainJsonObject)); // true

// 組み込みオブジェクト
console.log(isPlainObject(new Date())); // false
console.log(isJSONObject(new Date())); // false

// 配列
console.log(isPlainObject([])); // false
console.log(isJSONObject([])); // false (配列は JSON 値ですが JSON "オブジェクト" ではありません)
```

#### パラメータ

- `value` (`unknown`): 有効な JSON オブジェクトかどうかを確認する値です。

#### 戻り値

(`value is Record<string, any>`): 値が有効な JSON オブジェクトの場合は `true`、そうでなければ `false` を返します。
