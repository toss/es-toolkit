# invert

创建一个交换对象键和值的新对象。

```typescript
const inverted = invert(obj);
```

## 用法

### `invert(obj)`

当您想要创建一个交换对象键和值的新对象时,请使用 `invert`。原始对象的键成为新对象的值,原始对象的值成为新对象的键。如果存在重复值,则使用后面出现的键。

```typescript
import { invert } from 'es-toolkit/object';

// 基本用法
const original = { a: 1, b: 2, c: 3 };
const inverted = invert(original);
console.log(inverted); // { 1: 'a', 2: 'b', 3: 'c' }

// 存在重复值的情况
const withDuplicates = { a: 1, b: 1, c: 2 };
const result = invert(withDuplicates);
console.log(result); // { 1: 'b', 2: 'c' } (后面出现的 'b' 用作键 1 的值)

// 字符串键和数字值
const grades = { alice: 85, bob: 92, charlie: 88 };
const invertedGrades = invert(grades);
console.log(invertedGrades); // { 85: 'alice', 92: 'bob', 88: 'charlie' }
```

可以用于各种类型的键和值。

```typescript
// 数字键和字符串值
const statusCodes = { 200: 'OK', 404: 'Not Found', 500: 'Internal Server Error' };
const invertedCodes = invert(statusCodes);
console.log(invertedCodes);
// { 'OK': '200', 'Not Found': '404', 'Internal Server Error': '500' }

// 需要反向查找时很有用
const userRoles = { admin: 'administrator', user: 'regular_user', guest: 'visitor' };
const roleToKey = invert(userRoles);
console.log(roleToKey);
// { 'administrator': 'admin', 'regular_user': 'user', 'visitor': 'guest' }

// 现在可以通过值查找键
function findRoleKey(roleName: string) {
  return roleToKey[roleName];
}
console.log(findRoleKey('administrator')); // 'admin'
```

与枚举(Enum)或常量对象一起使用很有用。

```typescript
// 颜色代码映射
const colorCodes = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
};

const codeToColor = invert(colorCodes);
console.log(codeToColor);
// { '#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue' }

// 现在可以通过颜色代码查找颜色名称
function getColorName(code: string) {
  return codeToColor[code] || 'unknown';
}
console.log(getColorName('#FF0000')); // 'red'
```

#### 参数

- `obj` (`Record<K, V>`): 要交换键和值的对象。键和值都必须是字符串、数字或 symbol。

#### 返回值

(`Record<V, K>`): 原始对象的键和值已交换的新对象。
