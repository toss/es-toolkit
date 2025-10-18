# rest (Lodash 互換性)

::: warning `es-toolkit` の `rest` を使用してください

この `rest` 関数は、デフォルト値処理やインデックス検証などの追加ロジックにより、パフォーマンスが低下する可能性があります。

代わりに、より高速で現代的な `es-toolkit` の [rest](../../function/rest.md) を使用してください。

:::

指定されたインデックスから残りの引数を配列にグループ化する関数を作成します。

```typescript
const restFunc = rest(func, start);
```

## 参照

### `rest(func, start)`

指定されたインデックスから残りの引数を配列にグループ化して関数の引数を変換したい場合は、`rest` を使用してください。可変長引数を受け取る関数を作成するのに便利です。

```typescript
import { rest } from 'es-toolkit/compat';

// 基本的な使用法 - 最後の引数を配列にグループ化
function logMessage(level, message, ...details) {
  console.log(`[${level}] ${message}`, details);
}

const restLogger = rest(logMessage, 2);
restLogger('ERROR', 'エラーが発生しました', '詳細情報 1', '詳細情報 2');
// 内部的に logMessage('ERROR', 'エラーが発生しました', ['詳細情報 1', '詳細情報 2']) として呼び出されます

// 別のインデックスの例
function process(action, target, ...args) {
  return { action, target, args };
}

const restProcess = rest(process, 1);
restProcess('update', 'user', 'name', 'John', 'age', 25);
// { action: 'update', target: ['user', 'name', 'John', 'age', 25], args: undefined }
```

関数の最後の引数を配列として受け取りたい場合に使用します。現代の JavaScript では、残余パラメータ構文(`...args`)を使用するのがより一般的です。

#### パラメータ

- `func` (`Function`): 変換する関数です。
- `start` (`number`, オプション): 配列へのグループ化を開始するインデックスです。デフォルト値は `func.length - 1` です。

#### 戻り値

(`Function`): 指定されたインデックスから残りの引数を配列にグループ化する新しい関数を返します。
