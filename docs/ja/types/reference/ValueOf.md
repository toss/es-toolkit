# ValueOf

オブジェクトのすべての値の型のユニオンを作ります。`keyof` がキーを集めるのに対し、`ValueOf` は値を集めます。

```typescript
type Values = ValueOf<T>;
```

## 使用法

### `ValueOf<T>`

オブジェクト型から値側の型だけをユニオンとして取り出したいときに使います。`as const` オブジェクトから値のユニオンを作るときに特に便利です。

```typescript
import type { ValueOf } from 'es-toolkit/types';

const STATUS = { IDLE: 'idle', LOADING: 'loading', ERROR: 'error' } as const;

// keyof はキーを、ValueOf は値を集めます。
type StatusKey = keyof typeof STATUS; // 'IDLE' | 'LOADING' | 'ERROR'
type Status = ValueOf<typeof STATUS>; // 'idle' | 'loading' | 'error'

// 通常のオブジェクト型でも値の型を取り出せます。
type Values = ValueOf<{ id: number; name: string }>; // number | string

// Record は値の型に絞られます。
type Numbers = ValueOf<Record<string, number>>; // number
```

#### 型パラメータ

- `T`: 値の型を読み取るオブジェクト型です。
