# invariant

与えられた条件が真であることを断言します。条件が偽の場合、エラーを投げます。

```typescript
invariant(condition, message);
```

## 参照

### `invariant(condition, message)`

コードで特定の条件が必ず満たされなければならない場合に `invariant` を使用してください。条件が偽の場合、即座にエラーを投げてプログラムの実行を中断します。

```typescript
import { invariant } from 'es-toolkit/util';

// 条件が真の場合、何もしません
invariant(true, 'このメッセージは表示されません');

// 条件が偽の場合、エラーを投げます
invariant(false, 'この条件は偽です'); // Error: この条件は偽です

// 値が null や undefined でないことを確認する場合
const value = getValue();
invariant(value !== null && value !== undefined, '値は null や undefined であってはなりません');
// これで value が null や undefined でないことを確信できます

// 数値が正であることを確認する場合
const number = getNumber();
invariant(number > 0, '数値は正でなければなりません');
```

エラーオブジェクトを直接渡すこともできます。

```typescript
import { invariant } from 'es-toolkit/util';

// Error オブジェクトを渡す
invariant(false, new Error('カスタムエラーメッセージ'));

// カスタムエラークラスを使用
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

invariant(false, new ValidationError('検証に失敗しました'));
```

開発中にコードの仮定を検証したり、関数の入力値が期待される範囲にあることを確認する際に特に便利です。

#### パラメータ

- `condition` (`unknown`): 評価する条件です。偽と評価される値の場合、エラーを投げます。
- `message` (`string | Error`): 条件が偽の場合に投げるエラーメッセージまたはエラーオブジェクトです。

#### 戻り値

(`void`): 条件が真の場合、何も返しません。

#### エラー

条件が偽と評価された場合、提供されたメッセージまたはエラーオブジェクトを投げます。
