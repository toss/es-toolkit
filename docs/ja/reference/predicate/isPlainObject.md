# isPlainObject

与えられた値がプレーンオブジェクトであるかどうかを確認します。

プレーンオブジェクトとは、`{}`や`{ name: 'John', age: 30 }`のような基本的なJavaScriptオブジェクトです。クラスから派生しておらず、プロトタイプは`Object.prototype`または`null`のいずれかです。`toString`メソッドを使用して文字列に変換すると、`[object Object]`として表示されます。

## インターフェース

```typescript
function isPlainObject(value: unknown): value is Record<PropertyKey, any>;
```

### パラメータ

- `value` (`unknown`): 検査する値。

### 戻り値

(`value is Record<PropertyKey, any>`): 値がプレーンオブジェクトの場合は`true`。

## 例

```typescript
isPlainObject({}); // true
isPlainObject([]); // false
isPlainObject(Object.create(null)); // true

class Foo {}
isPlainObject(new Foo()); // false
isPlainObject(new Date()); // false
isPlainObject(new Set()); // false
isPlainObject(new Map()); // false
isPlainObject(Buffer.from('hello, world')); // false
isPlainObject(Math); // false
isPlainObject(JSON); // false
isPlainObject(null); // false
isPlainObject(1); // false
```

## パフォーマンス比較

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 bytes (82.4% smaller)           | 1,505,684 times (1.70× faster)      |
| es-toolkit/compat | 435 bytes (72.5% smaller)           | 2,013,760 times (2.28× faster)      |
| lodash-es         | 1,586 bytes                         | 882,669 times                       |
