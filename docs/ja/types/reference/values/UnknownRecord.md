# UnknownRecord

キーも値も分からないオブジェクトです。

```typescript
type Data = UnknownRecord;
```

## 使用法

### `UnknownRecord`

`{}` の代わりに使います。`{}` は名前に反して、`null` と `undefined` 以外の数値や文字列まで受け取ってしまいます。値が `unknown` なので、読み取る前に確認が必要です。

```typescript
import type { UnknownRecord } from 'es-toolkit/types';

function log(data: UnknownRecord) {
  if (typeof data.id === 'string') {
    console.log(data.id);
  }
}

log({ id: '1' }); // 通ります

// log(42); // エラーです。`{}` なら通ってしまいます。
```

#### 型パラメータ

- インデックスシグネチャを持つ型だけが代入できます。`interface` はキーを 1 つずつ宣言するため拒否されるので、呼び出し側が `interface` を渡す可能性があるなら `object` で受け取るか、呼び出し側で展開して渡してください。
