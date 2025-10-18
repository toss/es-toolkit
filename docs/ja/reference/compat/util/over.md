# over (Lodash互換性)

::: warning 配列メソッドを直接使用してください

この`over`関数は、関数を配列にマッピングする過程で追加のオーバーヘッドが発生します。

代わりに、より高速で現代的な配列の`map`メソッドを使用してください。

:::

与えられた関数に同じ引数を渡してそれぞれの結果を配列として返す関数を作成します。

```typescript
const multiCall = over(funcs);
```

## 参照

### `over(...iteratees)`

複数の関数を受け取って同じ引数でそれぞれを呼び出し、結果を配列として返す関数を生成します。同じデータで複数の計算を実行する場合に便利です。

```typescript
import { over } from 'es-toolkit/compat';

// 数学関数を一緒に使用します
const mathOperations = over([Math.max, Math.min]);
mathOperations(1, 2, 3, 4);
// => [4, 1]

// 個別の関数として渡すこともできます
const operations = over(Math.max, Math.min);
operations(1, 2, 3, 4);
// => [4, 1]

// オブジェクトのプロパティを抽出します
const getProperties = over(['name', 'age']);
getProperties({ name: 'John', age: 30 });
// => ['John', 30]

// 条件を検査します
const validators = over([
  { name: 'John' }, // オブジェクトマッチング
  { age: 30 },
]);
validators({ name: 'John', age: 30 });
// => [true, true]
```

ネストされたパスも処理できます。

```typescript
import { over } from 'es-toolkit/compat';

const data = {
  user: { name: 'John', profile: { age: 30 } },
  settings: { theme: 'dark' },
};

const getInfo = over(['user.name', 'user.profile.age', 'settings.theme']);
getInfo(data);
// => ['John', 30, 'dark']
```

#### パラメータ

- `...iteratees` (`Array<Function | string | object | Array>`): 呼び出す関数またはプロパティパスです。配列として渡すか、個別の引数として渡すことができます。

#### 戻り値

(`(...args: any[]) => any[]`): 引数を受け取って各関数の結果を配列として返す関数を返します。
