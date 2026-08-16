# isMap

値がMapかどうかを確認します。

```typescript
const result = isMap(value);
```

## 使用法

### `isMap(value)`

値がMapインスタンスかどうかを確認したい場合は`isMap`を使用してください。`instanceof`演算子を使用して`Map`かどうかを検査します。

```typescript
import { isMap } from 'es-toolkit/predicate';

// Mapインスタンス
const map = new Map([['key', 'value']]);
console.log(isMap(map)); // true

// Mapではない値
console.log(isMap(new Set())); // false
console.log(isMap(new WeakMap())); // false
console.log(isMap({})); // false
console.log(isMap([])); // false
console.log(isMap(null)); // false
```

TypeScriptでタイプガードとしても使用できます。

```typescript
function processValue(value: unknown) {
  if (isMap(value)) {
    // ここでvalueはMap<any, any>型に絞り込まれます
    console.log(value.size);
    value.set('new-key', 'new-value');
  }
}
```

#### パラメータ

- `value` (`unknown`): `Map`かどうか確認する値です。

#### 戻り値

(`value is Map<any, any>`): 値がMapの場合は`true`、そうでない場合は`false`を返します。
