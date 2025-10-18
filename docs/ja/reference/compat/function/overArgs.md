# overArgs (Lodash 互換性)

::: warning アロー関数と直接変換を使用してください

この `overArgs` 関数は各引数を変換する複雑なラッパーを作成し、パフォーマンスが遅くなります。アロー関数を使用して引数を直接変換すれば、より明確で高速なコードを書くことができます。

代わりに、より高速で現代的なアロー関数と直接変換を使用してください。

:::

関数の各引数を対応する変換関数で変換した後実行する新しい関数を生成します。

```typescript
const wrapped = overArgs(func, transforms);
```

## 参照

### `overArgs(func, ...transforms)`

関数を呼び出す前に各引数を変換したい場合は `overArgs` を使用してください。各引数は対応する変換関数によって処理されます。

```typescript
import { overArgs } from 'es-toolkit/compat';

function doubled(n) {
  return n * 2;
}

function square(n) {
  return n * n;
}

// 最初の引数は2倍、2番目の引数は二乗
const func = overArgs((x, y) => [x, y], [doubled, square]);
func(5, 3);
// Returns: [10, 9]
```

文字列を使用してプロパティを抽出することもできます。

```typescript
import { overArgs } from 'es-toolkit/compat';

const user1 = { name: 'John', age: 30 };
const user2 = { name: 'Jane', age: 25 };

// 各オブジェクトからプロパティを抽出
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);
getUserInfo(user1, user2);
// Returns: "John is 25 years old"
```

変換関数が提供されていないか `null`/`undefined` の場合、引数はそのまま渡されます。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2, null, n => n * 3]);
func(5, 10, 15);
// Returns: [10, 10, 45]
```

変換関数の数より多い引数はそのまま渡されます。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2]);
func(5, 10, 15);
// Returns: [10, 10, 15]
```

オブジェクトとの一致を確認することもできます。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((match1, match2) => [match1, match2], [{ age: 30 }, { active: true }]);

func({ name: 'John', age: 30 }, { active: true, status: 'online' });
// Returns: [true, true]
```

#### パラメータ

- `func` (`(...args: any[]) => any`): ラップする関数です。
- `...transforms` (`Array<(...args: any[]) => any | string | object | array>`): 引数を変換する関数です。各変換は次のいずれかになります:
  - 値を受け取って返す関数
  - プロパティ値を取得する文字列(例: 'name' は name プロパティを取得)
  - 引数がプロパティと一致するか確認するオブジェクト
  - プロパティの一致を確認する [プロパティ, 値] 配列

#### 戻り値

(`(...args: any[]) => any`): 引数を変換した後元の関数を呼び出す新しい関数を返します。
