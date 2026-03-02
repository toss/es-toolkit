# times (Lodash 互換性)

指定された回数だけ関数を実行し、結果を配列として返します。

```typescript
const result = times(n, iteratee);
```

## 使用法

### `times(n, iteratee)`

指定された回数だけ反復関数を実行し、結果を配列として返します。各反復で現在のインデックスを関数に渡します。

```typescript
import { times } from 'es-toolkit/compat';

// 0から2までのインデックスに2を掛けた値の配列
times(3, i => i * 2);
// Returns: [0, 2, 4]

// 同じ値を複数回生成
times(2, () => 'es-toolkit');
// Returns: ['es-toolkit', 'es-toolkit']
```

関数を渡さない場合、インデックス配列を返します。

```typescript
import { times } from 'es-toolkit/compat';

times(3);
// Returns: [0, 1, 2]
```

#### パラメータ

- `n` (`number`): 反復する回数です。整数に変換され、1より小さいか安全でない整数の場合は空の配列を返します。
- `iteratee` (`(num: number) => T`, オプション): 各反復で実行する関数です。インデックスを引数として受け取ります。提供しない場合はインデックスをそのまま返します。

#### 戻り値

(`T[]`): 各反復で実行した関数の結果からなる配列を返します。
