# inRange

値が指定された範囲内にあるかを確認します。

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

## 使用法

### `inRange(value, maximum)`

値が0から最大値未満の範囲内にあるかを確認したい場合は `inRange` を使用してください。最小値は自動的に0になります。

```typescript
import { inRange } from 'es-toolkit/math';

// 0から5未満の範囲で確認します
const result1 = inRange(3, 5); // result1はtrueになります (0 <= 3 < 5)
const result2 = inRange(5, 5); // result2はfalseになります (5は5未満ではない)
const result3 = inRange(-1, 5); // result3はfalseになります (-1 < 0)
```

#### パラメータ

- `value` (`number`): 確認する値です。
- `maximum` (`number`): 範囲の最大値(含まない)です。

#### 戻り値

(`boolean`): 値が0以上最大値未満の範囲内にある場合は `true`、そうでない場合は `false` を返します。

### `inRange(value, minimum, maximum)`

値が指定された最小値と最大値の範囲内にあるかを確認したい場合は `inRange` を使用してください。

```typescript
import { inRange } from 'es-toolkit/math';

// 最小値と最大値の範囲で確認します
const result1 = inRange(3, 2, 5); // result1はtrueになります (2 <= 3 < 5)
const result2 = inRange(1, 2, 5); // result2はfalseになります (1 < 2)
const result3 = inRange(5, 2, 5); // result3はfalseになります (5は5未満ではない)

// 負数範囲でも使用できます
const result4 = inRange(-3, -5, -1); // result4はtrueになります (-5 <= -3 < -1)
```

#### パラメータ

- `value` (`number`): 確認する値です。
- `minimum` (`number`): 範囲の最小値(含む)です。
- `maximum` (`number`): 範囲の最大値(含まない)です。

#### 戻り値

(`boolean`): 値が指定された範囲内にある場合は `true`、そうでない場合は `false` を返します。

#### エラー

最小値が最大値より大きいか等しい場合、エラーをスローします。
