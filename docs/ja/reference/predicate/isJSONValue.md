# isJSONValue

与えられた値が有効な JSON 値かどうかを確認します。

```typescript
const result = isJSONValue(value);
```

## 使用法

### `isJSONValue(value)`

値が JSON としてシリアライズ可能な有効な値かどうかを確認したい場合に `isJSONValue` を使用してください。JSON 仕様に従い、有効な値は `null`、オブジェクト、配列、文字列、数値、真偽値です。この関数は他の JSON 関連型ガードの基礎となる関数です。

```typescript
import { isJSONValue } from 'es-toolkit/predicate';

// プリミティブな JSON 値
console.log(isJSONValue(null)); // true
console.log(isJSONValue('hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(false)); // true

// オブジェクトと配列（内部の値もすべて有効である必要があります）
console.log(isJSONValue({ name: 'John', age: 30 })); // true
console.log(isJSONValue([1, 2, 3, 'text'])); // true
console.log(isJSONValue([])); // true (空の配列)
console.log(isJSONValue({})); // true (空のオブジェクト)

// ネストされた構造
const complexData = {
  user: {
    name: 'Alice',
    active: true,
    scores: [95, 87, 92],
  },
  metadata: null,
};
console.log(isJSONValue(complexData)); // true
```

JSON としてシリアライズできない値を正確に区別します。関数、`undefined`、`Symbol`、クラスインスタンスなどは JSON 仕様でサポートされていない型なので `false` を返します。

```typescript
// undefined は JSON でサポートされていません
console.log(isJSONValue(undefined)); // false

// 関数は JSON としてシリアライズできません
console.log(isJSONValue(() => {})); // false
console.log(isJSONValue(function () {})); // false

// Symbol は JSON でサポートされていません
console.log(isJSONValue(Symbol('test'))); // false

// Date オブジェクトは JSON では文字列に変換する必要があります
console.log(isJSONValue(new Date())); // false

// RegExp オブジェクトも JSON でサポートされていません
console.log(isJSONValue(/pattern/)); // false

// 関数や undefined が含まれるオブジェクト/配列
console.log(isJSONValue({ name: 'John', greet: () => {} })); // false
console.log(isJSONValue([1, 2, undefined])); // false

// BigInt は JSON でサポートされていません
console.log(isJSONValue(BigInt(123))); // false
```

JSON シリアライズ前のデータ検証で便利です。

```typescript
// 安全な JSON シリアライズ
function safeJsonStringify(data: unknown): string | null {
  if (isJSONValue(data)) {
    // data が有効な JSON 値であることが保証されます
    return JSON.stringify(data);
  }

  console.warn('データが JSON シリアライズ可能ではありません');
  return null;
}

// API リクエストデータの検証
function sendApiRequest(data: unknown) {
  if (isJSONValue(data)) {
    const jsonPayload = JSON.stringify(data);
    // API リクエストの送信
    console.log('送信するデータ:', jsonPayload);
    return fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonPayload,
    });
  }

  throw new Error('API データは JSON シリアライズ可能である必要があります');
}

// localStorage への保存前の検証
function saveToStorage(key: string, value: unknown) {
  if (isJSONValue(value)) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  console.error('localStorage に保存できないデータ型です');
  return false;
}

// 設定ファイルの検証
function validateConfig(config: unknown) {
  if (isJSONValue(config)) {
    return {
      isValid: true,
      config,
      serialized: JSON.stringify(config),
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Config must be a valid JSON value',
  };
}
```

他の型ガードと組み合わせて使用できます。

```typescript
// 具体的な JSON 型の確認
function processJsonData(data: unknown) {
  if (!isJSONValue(data)) {
    throw new Error('Invalid JSON value');
  }

  // これで data が有効な JSON 値であることが保証されます
  if (isJSONObject(data)) {
    console.log('JSON オブジェクトです:', Object.keys(data));
  } else if (isJSONArray(data)) {
    console.log('JSON 配列です:', data.length, '個の項目');
  } else {
    console.log('プリミティブな JSON 値です:', typeof data, data);
  }
}

// ネストされたデータの検証
const testData = {
  valid: { name: 'test', values: [1, 2, 3] },
  invalid: { name: 'test', callback: () => {} },
};

console.log(isJSONValue(testData.valid)); // true
console.log(isJSONValue(testData.invalid)); // false
```

エッジケース:

```typescript
// 特殊な数値
console.log(isJSONValue(Infinity)); // false (JSON では null に変換されます)
console.log(isJSONValue(-Infinity)); // false
console.log(isJSONValue(NaN)); // false (JSON では null に変換されます)

// 空の値
console.log(isJSONValue('')); // true (空の文字列)
console.log(isJSONValue(0)); // true
console.log(isJSONValue(false)); // true

// プロトタイプを持つオブジェクト
const obj = Object.create({ inherited: 'value' });
obj.own = 'property';
console.log(isJSONValue(obj)); // true (プレーンオブジェクトとして扱われます)
```

#### パラメータ

- `value` (`unknown`): 有効な JSON 値かどうかを確認する値です。

#### 戻り値

(`value is Record<string, any> | any[] | string | number | boolean | null`): 値が有効な JSON 値の場合は `true`、そうでなければ `false` を返します。
