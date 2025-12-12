# rest

特定のインデックスからのパラメータを配列にまとめて関数に渡す新しい関数を作成します。

```typescript
const restFunc = rest(func, startIndex);
```

## 使用法

### `rest(func, startIndex?)`

関数の残りのパラメータを配列にまとめて渡したい場合は `rest` を使用します。特定のインデックス以前のパラメータは個別に渡され、それ以降のパラメータは配列にまとめて渡されます。

可変長パラメータを受け取る関数を作成したり、既存の関数のパラメータ処理方法を変更したりする際に便利です。

```typescript
import { rest } from 'es-toolkit/function';

// 基本的な使用法 (最後のパラメータから配列にまとめる)
function sum(a: number, b: number, numbers: number[]) {
  return a + b + numbers.reduce((sum, n) => sum + n, 0);
}

const restSum = rest(sum); // startIndex はデフォルトで func.length - 1 (2)
console.log(restSum(1, 2, 3, 4, 5)); // 1 + 2 + (3 + 4 + 5) = 15
// sum 関数は [1, 2, [3, 4, 5]] として呼び出されます

// 別のインデックスから配列にまとめる
function logMessage(level: string, messages: string[]) {
  console.log(`[${level}] ${messages.join(' ')}`);
}

const restLog = rest(logMessage, 1); // 1番目のインデックスから配列にまとめる
restLog('INFO', 'Application', 'started', 'successfully');
// logMessage('INFO', ['Application', 'started', 'successfully']) の形式で呼び出されます

// 実用的な例: 最初のパラメータは個別に、残りは配列として
function format(template: string, values: any[]) {
  return values.reduce((result, value, index) => {
    return result.replace(`{${index}}`, value);
  }, template);
}

const restFormat = rest(format, 1);
console.log(restFormat('Hello {0}, welcome to {1}!', 'John', 'our site'));
// 'Hello John, welcome to our site!'
```

パラメータが不足している場合の処理も自動的に行われます。

```typescript
import { rest } from 'es-toolkit/function';

function greet(greeting: string, name: string, extras: string[]) {
  const extraText = extras.length > 0 ? ` ${extras.join(' ')}` : '';
  return `${greeting} ${name}!${extraText}`;
}

const restGreet = rest(greet);

console.log(restGreet('Hello', 'Alice', 'Have a great day!'));
// 'Hello Alice! Have a great day!'

console.log(restGreet('Hi', 'Bob'));
// 'Hi Bob!' (extras は空の配列になります)

console.log(restGreet('Hey'));
// 'Hey undefined!' (name は undefined、extras は空の配列)
```

#### パラメータ

- `func` (`F`): パラメータ処理方法を変更する関数です。
- `startIndex` (`number`, オプション): 配列にまとめ始めるインデックスです。デフォルトは `func.length - 1` で、最後のパラメータから配列にまとめます。

#### 戻り値

(`(...args: any[]) => ReturnType<F>`): 特定のインデックスからのパラメータを配列にまとめて元の関数に渡す新しい関数を返します。
