# cond (Lodash 互換性)

::: warning if-else文やswitch文を使用してください

この`cond`関数は複雑なiteratee処理、配列変換、関数検証などにより動作が遅くなります。

代わりにより高速で明確なif-else文やswitch文を使用してください。

:::

条件と関数のペアの配列を受け取り、条件を順序に確認して最初に真となる条件に対応する関数を実行する関数を作成します。

```typescript
const conditionFunction = cond(pairs);
```

## 参照

### `cond(pairs)`

複数の条件を順序に確認しながら最初に真となる条件に対応する関数を実行したい時に`cond`を使用してください。複雑な条件分岐ロジックを関数型で表現する際に役立ちます。

```typescript
import { cond } from 'es-toolkit/compat';

// 基本的な使用法
const getValue = cond([
  [x => x > 10, x => 'big'],
  [x => x > 5, x => 'medium'],
  [x => x > 0, x => 'small'],
  [() => true, () => 'zero or negative'],
]);

console.log(getValue(15)); // "big"
console.log(getValue(8)); // "medium"
console.log(getValue(3)); // "small"
console.log(getValue(-1)); // "zero or negative"
```

オブジェクトパターンマッチングにも活用できます。

```typescript
import { cond } from 'es-toolkit/compat';

const processUser = cond([
  [user => user.role === 'admin', user => `管理者: ${user.name}`],
  [user => user.role === 'user', user => `ユーザー: ${user.name}`],
  [user => user.role === 'guest', user => `ゲスト: ${user.name}`],
  [() => true, () => '不明な役割'],
]);

console.log(processUser({ name: '田中太郎', role: 'admin' })); // "管理者: 田中太郎"
console.log(processUser({ name: '佐藤花子', role: 'user' })); // "ユーザー: 佐藤花子"
```

最初に真となる条件のみが実行され、すべての条件が偽の場合は`undefined`を返します。

```typescript
import { cond } from 'es-toolkit/compat';

const checkValue = cond([
  [x => x > 10, x => 'greater than 10'],
  [x => x < 5, x => 'less than 5'],
]);

console.log(checkValue(15)); // "greater than 10"
console.log(checkValue(3)); // "less than 5"
console.log(checkValue(7)); // undefined (条件に合致しません)
```

#### パラメータ

- `pairs` (`Array<[predicate, func]>`): 条件関数と実行する関数のペアからなる配列です。

#### 戻り値

(`(...args: any[]) => unknown`): 条件を確認して最初に真となる条件に対応する関数を実行する新しい関数を返します。
