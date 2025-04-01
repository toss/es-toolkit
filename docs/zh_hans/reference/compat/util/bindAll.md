# bindAll

::: info
此函数仅可从 `es-toolkit/compat` 导入。这是因为存在可替代的原生 JavaScript API，或者尚未充分优化。

从 `es-toolkit/compat` 导入此函数时，它将[与 lodash 完全相同地运行](../../../compatibility.md)。
:::

将对象的方法绑定到对象本身，并覆盖现有方法。方法名可以作为单独的参数或数组指定。

## 接口

```typescript
function bindAll(
  object: Record<string, any>,
  ...methodNames: Array<string | string[] | number | IArguments>
): Record<string, any>;
```

### 参数

- `object` (`Object`): 要绑定方法的对象
- `methodNames` (`...(string|string[]|number|IArguments)`): 要绑定的方法名。可以使用以下格式指定:
  - 单个方法名字符串
  - 方法名数组
  - 数字（`-0` 会被特殊处理）
  - Arguments 对象

### 返回值

(`Object`): 方法已绑定的对象

## 示例

```typescript
const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => 点击时输出 'clicked docs'

// 使用单个方法名
bindAll(view, 'click');
// => 与上面相同的结果

// 数字键处理
const obj = {
  '-0': function () {
    return -2;
  },
  '0': function () {
    return -1;
  },
};
bindAll(obj, -0);
obj['-0'](); // => -2
```
