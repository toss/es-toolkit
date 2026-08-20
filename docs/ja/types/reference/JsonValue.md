# JsonValue

`JSON.parse` が生成しうるすべての値です。

```typescript
type Value = JsonValue;
```

## 使用法

### `JsonValue`

API レスポンスや設定ファイルなど、JSON を経由してやり取りするデータに使います。関数、`Date`、`undefined`、クラスのインスタンスは JSON を往復すると失われるため除外されます。

```typescript
import type { JsonValue } from 'es-toolkit/types';

declare function parse(text: string): JsonValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JsonValue
}

const ok: JsonValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JsonValue = { at: new Date() }; // エラーです。Date は JSON ではありません。

// JSON オブジェクトだけを受け取りたいときは Record を使います。
declare function send(body: Record<string, JsonValue>): void;
```

#### 型パラメータ

- `NaN` と `Infinity` は `number` ですが JSON では使えません。型ではこの違いを表現できません。
