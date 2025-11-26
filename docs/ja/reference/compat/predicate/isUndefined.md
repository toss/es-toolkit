# isUndefined (Lodash 互換性)

::: warning es-toolkitの [isUndefined](../../predicate/isUndefined.md)を使用してください

この `isUndefined` 関数はLodash互換性のための複雑な処理により遅く動作します。

代わりにより高速で現代的な `es-toolkit` の [isUndefined](../../predicate/isUndefined.md) を使用してください。

:::

値が `undefined` かどうかを確認します。

```typescript
const result = isUndefined(value);
```

## 使用法

### `isUndefined(x)`

値が正確に `undefined` かどうかを型安全に確認したい場合に `isUndefined` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isUndefined } from 'es-toolkit/compat';

// undefinedのみtrue
isUndefined(undefined); // true

// nullもfalse
isUndefined(null); // false

// その他すべての値もfalse
isUndefined(0); // false
isUndefined(''); // false
isUndefined(false); // false
isUndefined([]); // false
isUndefined({}); // false
isUndefined('undefined'); // false
isUndefined(NaN); // false
```

`undefined` と `null` を区別して確認することができます。

```typescript
import { isUndefined } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isUndefined(value)) {
    console.log('値がundefinedです');
  } else if (value === null) {
    console.log('値が明示的にnullです');
  } else {
    console.log(`値があります: ${value}`);
  }
}

handleValue(undefined); // "値がundefinedです"
handleValue(null); // "値が明示的にnullです"
handleValue('hello'); // "値があります: hello"
```

宣言されていない変数や初期化されていないプロパティを確認する際に便利です。

```typescript
import { isUndefined } from 'es-toolkit/compat';

const obj: { name?: string; age?: number } = { name: 'John' };

if (isUndefined(obj.age)) {
  console.log('年齢が設定されていません');
  obj.age = 25; // デフォルト値を設定
}

// 関数パラメータのデフォルト値処理
function greet(name: string, title?: string) {
  if (isUndefined(title)) {
    title = 'さん';
  }
  console.log(`こんにちは、${name}${title}!`);
}

greet('田中'); // "こんにちは、田中さん!"
greet('田中', '先生'); // "こんにちは、田中先生!"
```

#### パラメータ

- `x` (`any`): `undefined` かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が `undefined` の場合は `true`、そうでなければ `false` を返します。
