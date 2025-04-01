# create

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 객체를 상속해서 새로운 객체를 만들어요.

속성(`properties`)을 함께 전달하면, 새 객체에 그 속성들을 추가해요. 이때 문자열 키를 가진 열거 가능한 속성만 복사돼요. 상속받은 속성이나 `Symbol` 키를 가진 속성은 복사되지 않아요.

## 인터페이스

```typescript
function create<T extends object, U extends object>(prototype: T, properties?: U): T & U;
```

### 파라미터

- `prototype` (`T extends object`): 상속할 객체.
- `properties` (`U extends object`, 선택): 객체에 할당할 속성.

### 반환 값

(`T & U`): 생성된 새 객체.

## 예시

```typescript
import { create } from 'es-toolkit/compat';

const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });

john.greet(); // 출력: Hello, my name is John
```
