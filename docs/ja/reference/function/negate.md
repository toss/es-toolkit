# negate

真または偽を返す関数の戻り値を反対に変更する新しい関数を作成します。

```typescript
const negatedFunc = negate(booleanFunc);
```

## 参照

### `negate(func)`

真または偽の値を返す関数の結果を反対に変更したいときに`negate`を使用してください。

条件付き関数やフィルタリングロジックを反転させるときに便利です。例えば、偶数を見つける関数を奇数を見つける関数に変更できます。

```typescript
import { negate } from 'es-toolkit/function';

// 基本的な使用法
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isEven(2)); // true
console.log(isOdd(2)); // false

console.log(isEven(3)); // false
console.log(isOdd(3)); // true

// 配列フィルタリングで使用
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers); // [2, 4, 6]

const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]
```

複雑な条件関数も反転できます。

```typescript
import { negate } from 'es-toolkit/function';

const isLongString = (str: string) => str.length > 5;
const isShortString = negate(isLongString);

const words = ['hi', 'hello', 'world', 'javascript'];

const longWords = words.filter(isLongString);
console.log(longWords); // ['javascript']

const shortWords = words.filter(isShortString);
console.log(shortWords); // ['hi', 'hello', 'world']
```

#### パラメータ

- `func` (`F`): ブール値を返す関数です。

#### 戻り値

(`F`): 元の関数と同じ引数を受け取りますが、反対のブール値を返す新しい関数を返します。
