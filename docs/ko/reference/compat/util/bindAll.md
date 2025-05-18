# bindAll

::: info
이 함수는 `es-toolkit/compat`에서만 임포트할 수 있습니다. 대체 가능한 네이티브 JavaScript API가 있거나 아직 충분히 최적화되지 않았기 때문입니다.

`es-toolkit/compat`에서 이 함수를 임포트하면 [lodash와 완전히 동일하게 동작](../../../compatibility.md)합니다.
:::

주어진 이름들에 대해서, 객체가 가지고 있는 메서드의 `this` 값을 자기 자신으로 바인딩해요. 메서드 이름은 인자로 제공할 수 있어요.

## 인터페이스

```typescript
function bindAll(
  object: Record<string, any>,
  ...methodNames: Array<string | string[] | number | IArguments>
): Record<string, any>;
```

### 파라미터

- `object` (`Object`): 메서드를 바인딩할 객체.
- `methodNames` (`...(string | string[] | number | IArguments)`): 바인딩할 메서드 이름. 다음 형식으로 지정할 수 있어요.
  - 개별 메서드 이름 문자열
  - 메서드 이름 배열
  - 숫자 (`-0`는 특별히 처리)
  - Arguments 객체

### 반환 값

(`Object`): 메서드가 바인딩된 객체.

## 예제

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
