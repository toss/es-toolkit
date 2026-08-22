# Primitive

JavaScript のすべてのプリミティブ値をまとめたユニオンです。プリミティブでないものはすべてオブジェクトです。

```typescript
type Value = Primitive;
```

## 使用法

### `Primitive`

どのプリミティブ値でも受け取るが、オブジェクトは受け取らない場所で使います。手で書くと `bigint` や `symbol` を書き忘れがちです。

```typescript
import type { Primitive } from 'es-toolkit/types';

function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

const a: Primitive = 'text';
const b: Primitive = 1n;
const c: Primitive = Symbol('id');

// const d: Primitive = {}; // エラーです。オブジェクトはプリミティブではありません。
```
