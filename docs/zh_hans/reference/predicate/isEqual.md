# isEqual

`isEqual` 函数用于检查两个值是否相等，包括支持 `Date`、`RegExp` 和深层对象比较。

## 签名

```typescript
function isEqual(a: unknown, b: unknown): boolean;
```

## 参数

- **`a`**: `unknown` - 第一个要比较的值。
- **`b`**: `unknown` - 第二个要比较的值。

## 返回值

- **`boolean`** - 如果两个值相等则返回 `true`，否则返回 `false`。

## 示例

### 示例 1: 比较原始值

```javascript
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true
isEqual(1, 2); // false
isEqual('hello', 'world'); // false
isEqual(true, false); // false
```

### 示例 2: 比较特殊情况

```javascript
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

### 示例 3: 比较日期对象

```javascript
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

const date3 = new Date('2021-01-01');
isEqual(date1, date3); // false
```

### 示例 4: 比较正则表达式对象

```javascript
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

const regex3 = /hello/i;
isEqual(regex1, regex3); // false
```

### 示例 5: 比较对象

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
isEqual(obj1, obj2); // true

const obj3 = { a: 1, b: { c: 3 } };
isEqual(obj1, obj3); // false

const obj4 = { a: 1, b: 2 };
const obj5 = { a: 1, c: 2 };
isEqual(obj4, obj5); // false
```

### 示例 6: 比较数组

```javascript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
isEqual(arr1, arr2); // true

const arr3 = [1, 2, 4];
isEqual(arr1, arr3); // false

const arr4 = [1, 2];
isEqual(arr1, arr4); // false
```
