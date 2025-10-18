# isPrimitive

与えられた値がJavaScriptの原始値であるかを確認します。

```typescript
const result = isPrimitive(value);
```

## 参照

### `isPrimitive(value)`

値がJavaScriptの原始値であるかを確認したい場合は、`isPrimitive`を使用してください。JavaScriptの原始値は`null`、`undefined`、文字列、数値、真偽値、シンボル、`BigInt`を含みます。オブジェクトや関数などの参照型と区別する際に便利です。

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

// 原始値
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(Symbol('test'))); // true
console.log(isPrimitive(123n)); // true

// 参照型（原始値ではない）
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
console.log(isPrimitive(new Date())); // false
console.log(isPrimitive(new Map())); // false
console.log(isPrimitive(new Set())); // false
console.log(isPrimitive(() => {})); // false
console.log(isPrimitive(/regex/)); // false
```

深いコピーのロジックを実装する際に便利です。

```typescript
// 原始値とオブジェクトを異なる方法で処理
function deepClone(value: any): any {
  if (isPrimitive(value)) {
    // 原始値はそのまま返す
    return value;
  }

  // オブジェクトの複製ロジックを実行
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const result: any = {};
  for (const key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

// 値の比較で使用
function isEqual(a: unknown, b: unknown): boolean {
  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  // 複雑なオブジェクト比較ロジック...
  return false;
}

// ログでの安全な文字列変換
function safeLog(value: unknown) {
  if (isPrimitive(value)) {
    console.log('原始値:', value);
  } else {
    console.log('オブジェクト:', typeof value, Object.prototype.toString.call(value));
  }
}
```

型ガードとして活用して安全にコードを書くことができます。

```typescript
function processValue(input: unknown) {
  if (isPrimitive(input)) {
    // TypeScriptがinputを原始型として推論
    console.log('原始値の型:', typeof input);
    console.log('原始値:', input);
    return input;
  }

  // ここでinputはオブジェクト型として推論される
  console.log('オブジェクト型です');
  return null;
}

// APIレスポンスの検証
function validateApiResponse(data: unknown) {
  if (isPrimitive(data)) {
    return {
      type: 'primitive',
      value: data,
      serializable: true,
    };
  }

  return {
    type: 'object',
    value: data,
    serializable: false, // 追加の検証が必要
  };
}

// 設定値の処理
function normalizeConfigValue(value: unknown) {
  if (isPrimitive(value)) {
    // 原始値は安全に文字列に変換可能
    return String(value);
  }

  // オブジェクトはJSONとしてシリアライズ
  try {
    return JSON.stringify(value);
  } catch {
    return '[複雑なオブジェクト]';
  }
}
```

`String`、`Number`、`Boolean`のようなラッパーオブジェクトと原始値を区別できます。

```typescript
// ラッパーオブジェクトは原始値ではない
console.log(isPrimitive(new String('hello'))); // false
console.log(isPrimitive(new Number(42))); // false
console.log(isPrimitive(new Boolean(true))); // false

// しかし実際の原始値はtrue
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true

// valueOf()で原始値を抽出可能
const strObj = new String('hello');
console.log(isPrimitive(strObj.valueOf())); // true
```

#### パラメータ

- `value` (`unknown`): JavaScript原始値であるかを確認する値です。

#### 戻り値

(`value is null | undefined | string | number | boolean | symbol | bigint`): 値が原始値の場合は`true`、そうでない場合は`false`を返します。
