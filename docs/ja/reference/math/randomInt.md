# randomInt

指定された範囲内でランダムな整数を生成します。

```typescript
const randomInteger = randomInt(min, max);
```

## 参照

### `randomInt(maximum)` / `randomInt(minimum, maximum)`

ランダムな整数が必要な場合は `randomInt` を使用してください。小数点のない整数のみを返します。

```typescript
import { randomInt } from 'es-toolkit/math';

// 0以上5未満のランダムな整数を生成します。
const num1 = randomInt(5);
console.log(num1); // 例: 3

// 2以上10未満のランダムな整数を生成します。
const num2 = randomInt(2, 10);
console.log(num2); // 例: 7

// 負数範囲でも使用できます。
const num3 = randomInt(-5, -1);
console.log(num3); // 例: -3

// サイコロのシミュレーション(1-6)
const diceRoll = randomInt(1, 7);
console.log(diceRoll); // 例: 4

// 配列からランダムなインデックスを選択
const items = ['apple', 'banana', 'cherry', 'date'];
const randomIndex = randomInt(items.length);
console.log(items[randomIndex]); // 例: 'banana'
```

#### パラメータ

- `maximum` (`number`): 単一パラメータ使用時の最大値(含まない)です。0より大きくなければなりません。
- `minimum` (`number`): 最小値(含む)です。
- `maximum` (`number`): 最大値(含まない)です。最小値より大きくなければなりません。

#### 戻り値

(`number`): 指定された範囲内のランダムな整数を返します。

#### エラー

最大値が最小値より小さいか等しい場合、エラーをスローします。
