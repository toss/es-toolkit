# functions

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 속성 중 값이 함수인 속성의 이름들로 구성된 배열을 생성해요.

객체가 직접 소유한 속성과 문자열 키를 가진 속성만 확인해요. 상속받은 속성이나 `Symbol` 키를 가진 속성은 확인하지 않아요.

## 인터페이스

```typescript
function functions(object: unknown): string[];
```

### 파라미터

- `object` (`unknown`): 확인할 객체.

### 반환 값

(`string[]`): 함수 이름을 담은 문자열 배열.

## 예시

```typescript
function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}

Foo.prototype.c = () => 'c';

functions(new Foo());
// => ['a', 'b']
```
