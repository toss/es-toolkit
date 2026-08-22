# Merge

2つのオブジェクト型を深くマージした型を作ります。[`merge`](../../reference/object/merge.md)の戻り値の型です。組み込みの交差型 `T & S` では重なり合うネストされたプロパティが `never` に潰れることがありますが、`Merge<T, S>` は `merge` がランタイムで行うのと同じように、プロパティを1つずつマージします。

```typescript
type Result = Merge<Target, Source>;
```

## 使用法

### `Merge<T, S>`

ソースオブジェクトをターゲットオブジェクトに深くマージした結果の型が必要なときに使います。たとえば、[`merge`](../../reference/object/merge.md)でデフォルト設定に上書きを適用した設定オブジェクトの型を表現できます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = {
  server: { host: string; port: number };
  debug: boolean;
};

type Overrides = {
  server: { port: 8080; tls: boolean };
};

type Config = Merge<Defaults, Overrides>;
// => { server: { host: string; port: 8080; tls: boolean }; debug: boolean }
```

#### マージ規則

`merge` がランタイムで適用する規則にそのまま従います。

- **片側にしかないキー**: オプショナルかどうかを保ったまま、そのまま残ります。
- **両側ともプレーンオブジェクト**: 再帰的にマージします。
- **両側とも配列**: タプルはインデックス単位でマージし、それ以外の配列は両方の要素型を合わせた配列になります。
- **ソースの値が `undefined` になりうる場合**: `merge` は定義済みの値を `undefined` で上書きしないため、ターゲットの型を保ちます。
- **マージできない値** (関数、`Date`、`RegExp`、`Map`、`Set` などプレーンオブジェクトでない値): ソースの値がターゲットの値を置き換えます。
- **配列とプレーンオブジェクトが出会う場合**: `merge` はソースのプロパティをターゲットに代入するため、両方のプロパティを保ちます(`T & S`)。

```typescript
import type { Merge } from 'es-toolkit/types';

// タプルはインデックス単位でマージします。
type A = Merge<{ a: [1, 2] }, { a: [3] }>; // { a: [3, 2] }

// undefined になりうるソースの値はターゲットを上書きしません。
type B = Merge<{ a: number }, { a?: string }>; // { a: number | string }

// プレーンオブジェクトでない値はマージせず置き換えます。
type C = Merge<{ at: { x: number } }, { at: Date }>; // { at: Date }
```

#### 型パラメータ

- `T`: ターゲットオブジェクトの型です。
- `S`: `T` にマージするソースオブジェクトの型です。
