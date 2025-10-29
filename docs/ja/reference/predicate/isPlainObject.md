# isPlainObject

値が純粋なオブジェクト（plain object）であるかを確認します。

```typescript
const result = isPlainObject(value);
```

## 参照

### `isPlainObject(value)`

値が純粋なオブジェクトであるかを確認したい場合は、`isPlainObject`を使用してください。純粋なオブジェクトは、オブジェクトリテラル（`{}`）または`Object`コンストラクタで作成されたオブジェクトを指します。クラスインスタンス、配列、またはその他の特殊なオブジェクトは純粋なオブジェクトではありません。

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

// 純粋なオブジェクト
console.log(isPlainObject({})); // true
console.log(isPlainObject({ name: 'John', age: 30 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject(new Object())); // true

// 純粋なオブジェクトではないもの
console.log(isPlainObject([])); // false（配列）
console.log(isPlainObject(new Date())); // false（Dateオブジェクト）
console.log(isPlainObject(new Set())); // false（Setオブジェクト）
console.log(isPlainObject(new Map())); // false（Mapオブジェクト）
console.log(isPlainObject(null)); // false（null）
console.log(isPlainObject(42)); // false（数値）
console.log(isPlainObject('hello')); // false（文字列）

// クラスインスタンス
class MyClass {}
console.log(isPlainObject(new MyClass())); // false
```

データをシリアライズしたり、設定オブジェクトを検証したりする際に便利です。

```typescript
function processConfig(config: unknown) {
  if (isPlainObject(config)) {
    // configはRecord<PropertyKey, any>型に絞り込まれます
    console.log('有効な設定オブジェクト');
    Object.keys(config).forEach(key => {
      console.log(`${key}: ${config[key]}`);
    });
  } else {
    throw new Error('設定は純粋なオブジェクトである必要があります');
  }
}
```

#### パラメータ

- `value` (`unknown`): 純粋なオブジェクトであるかを確認する値です。

#### 戻り値

(`value is Record<PropertyKey, any>`): 値が純粋なオブジェクトの場合は`true`、そうでない場合は`false`を返します。

## パフォーマンス比較

|                   | [バンドルサイズ](../../bundle-size.md) | [ランタイム性能](../../performance.md) |
| ----------------- | -------------------------------------- | -------------------------------------- |
| es-toolkit        | 279 バイト（82.4% 小さい）             | 1,505,684 回（1.70× 速い）             |
| es-toolkit/compat | 435 バイト（72.5% 小さい）             | 2,013,760 回（2.28× 速い）             |
| lodash-es         | 1,586 バイト                           | 882,669 回                             |
