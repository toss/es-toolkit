# toPlainObject

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`를 일반 객체로 변환해요. `value`의 상속된 열거 가능한 문자열 키 속성을 일반 객체의 속성으로 평평하게 만들어요.

## 인터페이스

```typescript
function toPlainObject(value: any): Record<string, any>;
```

### 파라미터

- `value` (`any`): 변환할 값이에요.

### 반환 값

(`Record<string, any>`): 변환된 객체를 반환해요.

## 예시

```typescript
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

toPlainObject(new Foo()); // => { 'b': 2, 'c': 3 }
```
