# identity

入力された値をそのまま返します。

```typescript
const result = identity(value);
```

## 参照

### `identity(value)`

ある値を変更せずにそのまま返したいときに`identity`を使用してください。

引数として与えられる関数のデフォルト値として使用するときに便利です。配列の`map`や`filter`で値自体を返したり、関数型プログラミングでプレースホルダーの役割として使用します。

```typescript
import { identity } from 'es-toolkit/function';

// 数値をそのまま返します
const num = identity(5);
console.log(num); // 5

// 文字列をそのまま返します
const str = identity('hello');
console.log(str); // 'hello'

// オブジェクトをそのまま返します
const obj = identity({ key: 'value' });
console.log(obj); // { key: 'value' }

// 配列で使用する例
const numbers = [1, 2, 3, 4, 5];
const same = numbers.map(identity);
console.log(same); // [1, 2, 3, 4, 5]
```

#### パラメータ

- `value` (`T`): 返す値です。

#### 戻り値

(`T`): 入力された値をそのまま返します。
