# isRegExp

与えられた値が `RegExp` インスタンスかどうかを確認します。

```typescript
const result = isRegExp(value);
```

## 使用法

### `isRegExp(value)`

値が `RegExp` インスタンスかどうかを確認したい場合は `isRegExp` を使用してください。正規表現オブジェクトを通常の文字列や他のオブジェクトと区別する際に便利です。

```typescript
import { isRegExp } from 'es-toolkit/predicate';

// RegExp インスタンス
const regex1 = /abc/;
const regex2 = new RegExp('abc');
const regex3 = new RegExp('\\d+', 'g');

console.log(isRegExp(regex1)); // true
console.log(isRegExp(regex2)); // true
console.log(isRegExp(regex3)); // true

// RegExp でない値
console.log(isRegExp('/abc/')); // false (文字列)
console.log(isRegExp('abc')); // false
console.log(isRegExp({})); // false
console.log(isRegExp(null)); // false
console.log(isRegExp(undefined)); // false
```

正規表現パターンの検証や文字列処理に便利です:

```typescript
// 動的パターン検証
function validatePattern(pattern: unknown, text: string) {
  if (isRegExp(pattern)) {
    // TypeScript が pattern を RegExp として推論
    return pattern.test(text);
  }

  // 文字列パターンを正規表現に変換
  if (typeof pattern === 'string') {
    const regex = new RegExp(pattern);
    return regex.test(text);
  }

  return false;
}

// 使用例
console.log(validatePattern(/hello/, 'hello world')); // true
console.log(validatePattern('\\d+', '123')); // true
console.log(validatePattern('invalid', 'text')); // false

// フォーム検証での活用
function createValidator(rule: unknown) {
  if (isRegExp(rule)) {
    return (value: string) => rule.test(value);
  }

  // 他のルールタイプ...
  return () => false;
}

// メール検証器を作成
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = createValidator(emailRegex);

console.log(emailValidator('test@example.com')); // true
console.log(emailValidator('invalid-email')); // false
```

条件付き文字列処理での使用:

```typescript
// テキスト処理ユーティリティ
function processText(input: string, processor: unknown) {
  if (isRegExp(processor)) {
    // 正規表現でマッチする部分を抽出
    const matches = input.match(processor);
    return matches ? matches : [];
  }

  // 他のプロセッサータイプ...
  return [input];
}

// 数字を抽出
const numberRegex = /\d+/g;
const numbers = processText('価格: 1000円, 割引: 200円', numberRegex);
console.log(numbers); // ['1000', '200']

// URL を抽出
const urlRegex = /https?:\/\/[^\s]+/g;
const urls = processText('サイト: https://example.com 参考', urlRegex);
console.log(urls); // ['https://example.com']

// 設定ベースのテキスト検証
class TextValidator {
  private rules: Array<{ name: string; rule: unknown }> = [];

  addRule(name: string, rule: unknown) {
    this.rules.push({ name, rule });
  }

  validate(text: string) {
    const results: Array<{ rule: string; passed: boolean }> = [];

    for (const { name, rule } of this.rules) {
      if (isRegExp(rule)) {
        results.push({
          rule: name,
          passed: rule.test(text),
        });
      } else {
        results.push({
          rule: name,
          passed: false,
        });
      }
    }

    return results;
  }
}

// 使用例
const validator = new TextValidator();
validator.addRule('英字のみ', /^[a-zA-Z]+$/);
validator.addRule('数字を含む', /\d/);
validator.addRule('特殊文字禁止', /^[^!@#$%^&*()]+$/);

console.log(validator.validate('Hello123'));
// [
//   { rule: '英字のみ', passed: false },
//   { rule: '数字を含む', passed: true },
//   { rule: '特殊文字禁止', passed: true }
// ]
```

文字列と正規表現を区別する:

```typescript
// 検索機能での活用
function searchText(content: string, query: unknown) {
  if (isRegExp(query)) {
    // 正規表現検索 - 高度なパターンマッチング
    const matches = content.match(query);
    return matches ? matches.length : 0;
  }

  if (typeof query === 'string') {
    // 通常の文字列検索
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    return matches ? matches.length : 0;
  }

  return 0;
}

// 使用例
const text = 'Hello world! Hello everyone!';

console.log(searchText(text, /hello/gi)); // 2 (正規表現)
console.log(searchText(text, 'Hello')); // 2 (文字列、エスケープ済み)
console.log(searchText(text, /h.llo/i)); // 2 (パターンマッチング)

// 動的フィルタリング
function createFilter(patterns: unknown[]) {
  const regexPatterns = patterns.filter(isRegExp);

  return (text: string) => {
    return regexPatterns.some(pattern => pattern.test(text));
  };
}

// スパムフィルターの例
const spamPatterns = [
  /\b(広告|宣伝)\b/,
  /\d{3}-\d{4}-\d{4}/, // 電話番号パターン
  'invalid', // RegExp ではない、フィルターから除外
  /\$\d+/, // 価格パターン
];

const spamFilter = createFilter(spamPatterns);
console.log(spamFilter('緊急広告です!')); // true
console.log(spamFilter('こんにちは')); // false
```

正規表現のフラグとプロパティを活用:

```typescript
// RegExp プロパティを確認
function analyzeRegex(value: unknown) {
  if (isRegExp(value)) {
    return {
      source: value.source,
      flags: value.flags,
      global: value.global,
      ignoreCase: value.ignoreCase,
      multiline: value.multiline,
      unicode: value.unicode,
      sticky: value.sticky,
    };
  }

  return null;
}

// 使用例
const regex = /hello/gim;
const analysis = analyzeRegex(regex);
console.log(analysis);
// {
//   source: 'hello',
//   flags: 'gim',
//   global: true,
//   ignoreCase: true,
//   multiline: true,
//   unicode: false,
//   sticky: false
// }

// 正規表現を複製
function cloneRegex(value: unknown) {
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags);
  }

  return null;
}

const originalRegex = /test/gi;
const clonedRegex = cloneRegex(originalRegex);
console.log(clonedRegex?.test('TEST')); // true
```

#### パラメータ

- `value` (`unknown`): RegExp インスタンスかどうかを確認する値です。

#### 戻り値

(`value is RegExp`): 値が RegExp インスタンスの場合は `true`、それ以外の場合は `false` を返します。
