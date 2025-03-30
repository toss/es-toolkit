# functionsIn

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](mdc:../../../compatibility.md)。
:::

返回一个包含值为函数的属性名称的数组，包括继承的属性。

## 签名

```typescript
function functionsIn(object: any): string[];
```

### 参数

- `object`: 要检查的对象。

### 返回值

(`string[]`): 返回对象自身和继承的可枚举属性中的函数属性名称数组。

## 示例

```typescript
import { functionsIn } from 'es-toolkit/compat';

function Foo() {
  this.a = function () {
    return 'a';
  };
  this.b = function () {
    return 'b';
  };
}

Foo.prototype.c = function () {
  return 'c';
};

// 获取包括继承的函数在内的函数属性名
functionsIn(new Foo());
// => ['a', 'b', 'c']

// 适用于普通对象
const object = {
  a: function () {
    return 'a';
  },
  b: function () {
    return 'b';
  },
};

functionsIn(object);
// => ['a', 'b']

// 对于非对象返回空数组
functionsIn(null);
// => []
functionsIn(undefined);
// => []
functionsIn(1);
// => []
```
