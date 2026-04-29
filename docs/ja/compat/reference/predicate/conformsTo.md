# conformsTo (Lodash互換性)

オブジェクトが指定された条件関数をすべて満たすかどうかを確認します。

```typescript
const result = conformsTo(target, source);
```

## 使用法

### `conformsTo(target, source)`

オブジェクトのプロパティが指定された条件をすべて満たすかどうかを確認したい場合は`conformsTo`を使用してください。各プロパティに対して該当する条件関数を適用して結果を確認します。

```typescript
import { conformsTo } from 'es-toolkit/compat';

// 基本的な使用法
const object = { a: 1, b: 2 };
const conditions = {
  a: n => n > 0,
  b: n => n > 1,
};

conformsTo(object, conditions); // true (すべての条件を満たす)

// 様々な条件
const user = { name: 'Alice', age: 25, active: true };
const userValidation = {
  name: s => typeof s === 'string' && s.length > 0,
  age: n => typeof n === 'number' && n >= 18,
  active: b => typeof b === 'boolean',
};

conformsTo(user, userValidation); // true

// 条件を満たさない場合
const invalidUser = { name: '', age: 15, active: 'yes' };
conformsTo(invalidUser, userValidation); // false

// 部分的な条件確認
const partialConditions = {
  age: n => n >= 21,
};
conformsTo(user, partialConditions); // true (ageのみ確認)

// プロパティが存在しない場合
const incompleteObject = { a: 1 }; // bプロパティなし
const strictConditions = {
  a: n => n > 0,
  b: n => n > 0,
};
conformsTo(incompleteObject, strictConditions); // false (bプロパティが存在しない)
```

#### パラメータ

- `target` (`Record<PropertyKey, any>`): 検査するオブジェクトです。
- `source` (`Record<PropertyKey, (value: any) => boolean>`): プロパティ別の条件関数を持つオブジェクトです。

#### 戻り値

(`boolean`): オブジェクトがすべての条件を満たす場合は`true`、そうでない場合は`false`を返します。
