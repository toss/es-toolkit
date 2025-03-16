# functions

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`object`의 열거 가능한 속성으로부터 함수 속성 이름의 배열을 생성해요.

## 인터페이스

```typescript
function functions(object: any): string[];
```

### 파라미터

- `object` (`Object`): 검사할 객체.

### 반환 값

(`Array`): 함수의 이름.

## 예시

```typescript
function Foo() {
  this.a = constant('a');
  this.b = constant('b');
}

Foo.prototype.c = constant('c');

console.log(functions(new Foo()));
// => ['a', 'b']
```
