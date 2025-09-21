# bindAll (Lodash 호환성)

객체의 메서드들을 객체 자신에게 바인딩해요.

```typescript
const boundObject = bindAll(object, methodNames);
```

## 레퍼런스

### `bindAll(object, ...methodNames)`

객체의 특정 메서드들의 `this` 값을 해당 객체로 고정하고 싶을 때 `bindAll`을 사용하세요. 이벤트 핸들러나 콜백 함수로 메서드를 전달할 때 `this` 컨텍스트를 유지하는 데 유용해요.

```typescript
import { bindAll } from 'es-toolkit/compat';

const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

// 메서드를 객체에 바인딩
bindAll(view, 'click');
document.addEventListener('click', view.click);
// => 클릭 시 'clicked docs' 출력
```

여러 메서드를 한 번에 바인딩할 수 있어요.

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  name: 'example',
  greet() {
    return `Hello, ${this.name}!`;
  },
  farewell() {
    return `Goodbye, ${this.name}!`;
  },
};

// 배열로 여러 메서드 바인딩
bindAll(obj, ['greet', 'farewell']);

const greet = obj.greet;
greet(); // 'Hello, example!' (this가 올바르게 바인딩됨)
```

숫자나 특수 키도 처리할 수 있어요.

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  '-0': function () {
    return 'negative zero';
  },
  '0': function () {
    return 'zero';
  },
};

bindAll(obj, -0);
obj['-0'](); // 'negative zero'
```

#### 파라미터

- `object` (`Object`): 메서드를 바인딩할 객체예요.
- `methodNames` (`...(string | string[] | number | IArguments)`): 바인딩할 메서드 이름들이에요. 개별 문자열, 배열, 숫자, Arguments 객체로 지정할 수 있어요.

### 반환 값

(`Object`): 메서드가 바인딩된 원본 객체를 반환해요.
