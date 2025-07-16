# bindAll

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Binds methods of an object to the object itself, overwriting the existing method. Method names can be provided as arguments.

## Signature

```typescript
function bindAll(
  object: Record<string, any>,
  ...methodNames: Array<string | string[] | number | IArguments>
): Record<string, any>;
```

### Parameters

- `object` (`Object`): The object to bind methods to.
- `methodNames` (`...(string | string[] | number | IArguments)`): The method names to bind. Can be specified in the following formats:
  - Individual method name strings
  - Arrays of method names
  - Numbers (with special handling for `-0`)
  - Arguments objects

### Returns

(`Object`): The object with bound methods.

## Examples

```typescript
const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => 클릭 시 'clicked docs' 출력

// 개별 메서드 이름 사용
bindAll(view, 'click');
// => 위와 동일한 결과

// 숫자 키 처리
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
