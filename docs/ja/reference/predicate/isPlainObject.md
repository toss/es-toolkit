# isPlainObject

与えられた値がプレーンオブジェクトであるかどうかを確認します。

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
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```

## パフォーマンス比較

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 bytes (82.4% smaller)           | 1,505,684 times (1.70× faster)      |
| es-toolkit/compat | 435 bytes (72.5% smaller)           | 2,013,760 times (2.28× faster)      |
| lodash-es         | 1,586 bytes                         | 882,669 times                       |
