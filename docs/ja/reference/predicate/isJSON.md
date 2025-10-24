# isJSON

与えられた値が有効な JSON 文字列かどうかを確認します。

```typescript
const result = isJSON(value);
```

## 参照

### `isJSON(value)`

文字列が有効な JSON 形式かどうかを確認したい場合に `isJSON` を使用してください。この関数は `JSON.parse()` でパースできる文字列かどうかを検査します。JSON 仕様に従い、オブジェクト、配列、文字列、数値、真偽値、`null` を表現するすべての文字列が有効です。

```typescript
import { isJSON } from 'es-toolkit/predicate';

// 有効な JSON 文字列
console.log(isJSON('{"name":"John","age":30}')); // true
console.log(isJSON('[1,2,3]')); // true
console.log(isJSON('"hello world"')); // true
console.log(isJSON('42')); // true
console.log(isJSON('true')); // true
console.log(isJSON('false')); // true
console.log(isJSON('null')); // true

// 無効な JSON 文字列
console.log(isJSON('undefined')); // false
console.log(isJSON('function() {}')); // false
console.log(isJSON('{name: "John"}')); // false (キーに引用符がない)
console.log(isJSON("{'name': 'John'}")); // false (シングルクォートを使用)
console.log(isJSON('{}')); // true (空のオブジェクトは有効)
console.log(isJSON('[]')); // true (空の配列は有効)
```

文字列でない値はすべて `false` を返します。

```typescript
// 文字列でない値
console.log(isJSON({ name: 'John' })); // false
console.log(isJSON([1, 2, 3])); // false
console.log(isJSON(42)); // false
console.log(isJSON(true)); // false
console.log(isJSON(null)); // false
console.log(isJSON(undefined)); // false
```

API レスポンスやユーザー入力の検証で便利です。

```typescript
// API レスポンスの検証
function processApiResponse(response: unknown) {
  if (isJSON(response)) {
    try {
      const data = JSON.parse(response);
      console.log('パースされたデータ:', data);
      return data;
    } catch (error) {
      // isJSON が true を返したので、ここは実行されません
      console.error('パース失敗:', error);
    }
  }

  console.log('有効な JSON 文字列ではありません');
  return null;
}

// ユーザー入力の検証
function validateJsonInput(input: unknown): string | null {
  if (isJSON(input)) {
    // TypeScript が input を string として型推論します
    return input;
  }

  throw new Error('入力値は有効な JSON 文字列である必要があります');
}

// 設定ファイルの検証
function loadConfig(configString: unknown) {
  if (isJSON(configString)) {
    const config = JSON.parse(configString);
    return {
      isValid: true,
      config,
      error: null,
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Invalid JSON format',
  };
}
```

複雑な JSON 構造も正確に検出します。

```typescript
const complexJson = `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1
  }
}`;

console.log(isJSON(complexJson)); // true

// 不正な形式
console.log(isJSON('{ "name": "John", }')); // false (trailing comma)
console.log(isJSON('{ name: "John" }')); // false (unquoted key)
console.log(isJSON("{ 'name': 'John' }")); // false (single quotes)
```

#### パラメータ

- `value` (`unknown`): 有効な JSON 文字列かどうかを確認する値です。

#### 戻り値

(`value is string`): 値が有効な JSON 文字列の場合は `true`、そうでなければ `false` を返します。
