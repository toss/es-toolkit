# flattenObject

ネストされたオブジェクトを単純なオブジェクトに平坦化するか、Mapに直接変換します。

- `Array`は平坦化されます。
- `Buffer`や`TypedArray`のような純粋なオブジェクトでないものは平坦化されません。

## インターフェース

```typescript
// Record<string, any>を返す
function flattenObject(object: object, options?: { delimiter?: string }): Record<string, any>;

// Map<string, any>を返す（レガシー構文）
function flattenObject(object: object, target: Map<string, any>): Map<string, any>;

// Map<string, any>を返す（区切り文字付き）
function flattenObject(object: object, options: { delimiter?: string; target: Map<string, any> }): Map<string, any>;
```

### パラメータ

- `object` (`object`): 平坦化するオブジェクト。
- `options` (`object`, オプション): オプションオブジェクト。
  - `delimiter` (`string`): ネストされたキーの区切り文字。デフォルトは `'.'`。
  - `target` (`Map<string, any>`): 平坦化されたキーと値のペアで満たすMap。

### 戻り値

(`Record<string, any> | Map<string, any>`): 平坦化されたオブジェクトまたはMap。

## 例

### 基本的な使用法（Record）

```typescript
const nestedObject = {
  a: {
    b: {
      c: 1,
    },
  },
  d: [2, 3],
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
// 出力:
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3
// }
```

### カスタム区切り文字（Record）

```typescript
const flattened = flattenObject(nestedObject, { delimiter: '/' });
console.log(flattened);
// 出力:
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3
// }
```

### Mapターゲット（レガシー構文）

```typescript
const map = flattenObject(nestedObject, new Map());
console.log(map);
// 出力: Map { 'a.b.c' => 1, 'd.0' => 2, 'd.1' => 3 }

// 値へのアクセス
console.log(map.get('a.b.c')); // 1
console.log(map.size); // 3
```

### Map + カスタム区切り文字

```typescript
const customMap = flattenObject(nestedObject, {
  delimiter: '_',
  target: new Map(),
});
console.log(customMap);
// 出力: Map { 'a_b_c' => 1, 'd_0' => 2, 'd_1' => 3 }
```
