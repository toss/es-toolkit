# isEqualWith (Lodash互換性)

::: warning es-toolkitの[isEqualWith](../../predicate/isEqualWith.md)を使用してください
この`isEqualWith`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isEqualWith](../../predicate/isEqualWith.md)を使用してください。
:::

カスタム比較関数を使用して二つの値が同じかどうかを確認します。

```typescript
const result = isEqualWith(a, b, customizer);
```

## 使用法

### `isEqualWith(a, b, areValuesEqual?)`

カスタム比較関数を使用して二つの値を深く比較します。カスタム関数がboolean値を返す場合はその結果を使用し、`undefined`を返す場合はデフォルトの等価性比較を使用します。

カスタム比較関数はオブジェクト、配列、Map、Setなどの複雑な構造の内部の値を比較する際にも使用され、深い比較を保証します。

```typescript
import { isEqualWith } from 'es-toolkit/compat';

// 大文字小文字を無視した文字列比較
const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true

// 数値の絶対値で比較
const absCustomizer = (a: any, b: any) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a) === Math.abs(b);
  }
};

isEqualWith([-1, 2], [1, -2], absCustomizer); // true

// 複雑なオブジェクトの比較
const obj1 = {
  name: 'JOHN',
  details: { age: 30, city: 'NYC' },
};
const obj2 = {
  name: 'john',
  details: { age: 30, city: 'nyc' },
};

isEqualWith(obj1, obj2, customizer); // true
```

MapとSetに対しては特別な処理を行います。

```typescript
import { isEqualWith } from 'es-toolkit/compat';

const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

const map1 = new Map([['KEY', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqualWith(map1, map2, customizer); // true

const set1 = new Set(['HELLO']);
const set2 = new Set(['hello']);
isEqualWith(set1, set2, customizer); // true
```

#### パラメータ

- `a` (`any`): 比較する最初の値です。
- `b` (`any`): 比較する2番目の値です。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): カスタム比較関数です。
  - `x`: 最初のオブジェクト`a`からの値
  - `y`: 2番目のオブジェクト`b`からの値
  - `property`: `x`と`y`を取得する際に使用したプロパティキー
  - `xParent`: 最初の値`x`の親オブジェクト
  - `yParent`: 2番目の値`y`の親オブジェクト
  - `stack`: 循環参照を処理する内部スタック (Map)

#### 戻り値

(`boolean`): カスタム関数によって二つの値が同じ場合は`true`、異なる場合は`false`を返します。
