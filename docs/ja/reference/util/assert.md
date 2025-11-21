# assert

与えられた条件が真であることを表明します。条件が偽の場合、エラーをスローします。

```typescript
assert(condition, message);
```

::: info `invariant` との関係

`assert` は `invariant` 関数と完全に同じ機能を持っています。違いは名前だけです。詳細については、[`invariant`](./invariant.md) のドキュメントを参照してください。

:::

## 使用法

### `assert(condition, message)`

コード内で特定の条件が必ず満たされる必要がある場合に `assert` を使用します。条件が偽の場合、直ちにエラーをスローしてプログラムの実行を停止します。

```typescript
import { assert } from 'es-toolkit/util';

// 条件が真の場合、何もしません
assert(true, 'このメッセージは表示されません');

// 条件が偽の場合、エラーをスローします
assert(false, 'この条件は偽です'); // Error: この条件は偽です

// 値が null または undefined でないことを確認する場合
const value = getValue();
assert(value !== null && value !== undefined, '値は null または undefined であってはなりません');
// これで value が null でも undefined でもないことを確信できます

// 数値が正の数であることを確認する場合
const number = getNumber();
assert(number > 0, '数値は正の数でなければなりません');
```

エラーオブジェクトを直接渡すこともできます。

```typescript
import { assert } from 'es-toolkit/util';

// Error オブジェクトを渡す
assert(false, new Error('カスタムエラーメッセージ'));

// カスタムエラークラスを使用
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

assert(false, new ValidationError('検証に失敗しました'));
```

開発中にコードの前提を検証したり、関数の入力値が予想範囲内にあるかを確認する場合に特に便利です。

#### パラメータ

- `condition` (`unknown`): 評価する条件です。偽と評価される値の場合、エラーをスローします。
- `message` (`string | Error`): 条件が偽の場合にスローするエラーメッセージまたはエラーオブジェクトです。

#### 戻り値

(`void`): 条件が真の場合、何も返しません。

#### エラー

条件が偽と評価された場合、提供されたメッセージまたはエラーオブジェクトをスローします。
