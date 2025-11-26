# isString

与えられた値が文字列かどうかを確認します。

```typescript
const result = isString(value);
```

## 使用法

### `isString(value)`

値が文字列かどうかを確認したい場合は `isString` を使用してください。文字列タイプを他のプリミティブ型やオブジェクトと区別する際に便利です。

```typescript
import { isString } from 'es-toolkit/predicate';

// 文字列の値
console.log(isString('hello')); // true
console.log(isString('')); // true
console.log(isString('123')); // true
console.log(isString('true')); // true

// 文字列でない値
console.log(isString(123)); // false
console.log(isString(true)); // false
console.log(isString(null)); // false
console.log(isString(undefined)); // false
console.log(isString([])); // false
console.log(isString({})); // false
console.log(isString(new String('hello'))); // false (String オブジェクト)
```

データ検証や型安全な文字列処理に便利です:

```typescript
// 安全な文字列操作
function processText(input: unknown): string {
  if (isString(input)) {
    // TypeScript が input を string として推論
    return input.trim().toLowerCase();
  }

  // 他のタイプを文字列に変換
  return String(input);
}

// 使用例
console.log(processText('  HELLO  ')); // 'hello'
console.log(processText(123)); // '123'
console.log(processText(true)); // 'true'
console.log(processText(null)); // 'null'

// フォームデータの検証
function validateForm(data: Record<string, unknown>) {
  const errors: string[] = [];

  if (!isString(data.name) || data.name.length === 0) {
    errors.push('名前は必須入力項目です');
  }

  if (!isString(data.email) || !data.email.includes('@')) {
    errors.push('有効なメールアドレスを入力してください');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// 使用例
console.log(validateForm({ name: 'John', email: 'john@example.com' }));
// { isValid: true, errors: [] }

console.log(validateForm({ name: 123, email: 'invalid-email' }));
// { isValid: false, errors: ['名前は必須入力項目です', '有効なメールアドレスを入力してください'] }
```

#### パラメータ

- `value` (`unknown`): 文字列かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が文字列の場合は `true`、それ以外の場合は `false` を返します。
