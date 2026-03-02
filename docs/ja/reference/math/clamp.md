# clamp

数値を指定された範囲内に固定します。

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

## 使用法

### `clamp(value, maximum)`

数値を与えられた最大値以下に制限したい場合は`clamp`を使用してください。値が最大値を超える場合は最大値に固定され、そうでない場合は元の値を返します。

```typescript
import { clamp } from 'es-toolkit/math';

// 最大値で制限
const result1 = clamp(10, 5); // result1 は 5 になります (10が最大値5に制限される)
const result2 = clamp(3, 5); // result2 は 3 になります (5より小さいのでそのまま)
```

#### パラメータ

- `value` (`number`): 固定する数値です。
- `maximum` (`number`): 最大値です。

#### 戻り値

(`number`): 最大値以下に固定された数値を返します。

### `clamp(value, minimum, maximum)`

数値を与えられた最小値と最大値の範囲内に固定したい場合は`clamp`を使用してください。値が範囲を外れる場合は、最も近い境界値に制限されます。

```typescript
import { clamp } from 'es-toolkit/math';

// 最小値と最大値の範囲内に固定
const result1 = clamp(10, 5, 15); // result1 は 10 になります (5と15の範囲内)
const result2 = clamp(2, 5, 15); // result2 は 5 になります (最小値5に制限される)
const result3 = clamp(20, 5, 15); // result3 は 15 になります (最大値15に制限される)
```

#### パラメータ

- `value` (`number`): 固定する数値です。
- `minimum` (`number`): 最小値です。
- `maximum` (`number`): 最大値です。

#### 戻り値

(`number`): 指定された範囲内で固定された数値を返します。
