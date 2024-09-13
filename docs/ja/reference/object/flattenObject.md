# flattenObject

ネストされたオブジェクトを単純なオブジェクトに平坦化します。

- `Array`は平坦化されます。
- `Buffer`や`TypedArray`のような純粋なオブジェクトでないものは平坦化されません。

## インターフェース

```typescript
function flattenObject(object: object): Record<string, any>;
```

### パラメータ

- `object` (`object`): 平坦化するオブジェクト。

### 戻り値

(`T`): 平坦化されたオブジェクト。

## 例

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
