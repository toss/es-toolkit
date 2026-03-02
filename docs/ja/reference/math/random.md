# random

指定された範囲内でランダムな数値を生成します。生成される数値は小数点を含む数値です。

```typescript
const randomNumber = random(min, max);
```

## 使用法

### `random(maximum)` / `random(minimum, maximum)`

ランダムな数値が必要な場合は `random` を使用してください。小数点がある数値を生成します。

```typescript
import { random } from 'es-toolkit/math';

// 0以上5未満のランダムな小数を生成します。
const num1 = random(5);
console.log(num1); // 例: 2.718281828

// 2以上10未満のランダムな小数を生成します。
const num2 = random(2, 10);
console.log(num2); // 例: 7.158765432

// 負数範囲でも使用できます。
const num3 = random(-5, -1);
console.log(num3); // 例: -3.842134567

// 小数範囲も可能です。
const num4 = random(1.5, 2.5);
console.log(num4); // 例: 1.923456789
```

範囲が正しくない場合はエラーをスローします。

```typescript
import { random } from 'es-toolkit/math';

// 最大値が0以下の場合はエラーが発生します。
try {
  random(0);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}

// 最小値が最大値より大きいか等しい場合はエラーが発生します。
try {
  random(5, 3);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}
```

#### パラメータ

- `maximum` (`number`): 単一パラメータ使用時の最大値(含まない)です。0より大きくなければなりません。
- `minimum` (`number`): 最小値(含む)です。
- `maximum` (`number`): 最大値(含まない)です。最小値より大きくなければなりません。

#### 戻り値

(`number`): 指定された範囲内のランダムな小数を返します。

#### エラー

最大値が最小値より小さいか等しい場合、エラーをスローします。
