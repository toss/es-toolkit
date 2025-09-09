# keys

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`object` 객체의 열거 가능한 프로퍼티 이름들을 반환해요.

객체가 아닌 값은 객체로 변환해요.

## 인터페이스

```typescript
function keys(object?: any): string[];
```

### 파라미터

- `object` (`object`): 프로퍼티 이름들을 구할 객체에요.

### 반환 값

(`string[]`): 프로퍼티 이름의 배열.

## 예시

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;
keys(new Foo()); // ['a', 'b'] (iteration order is not guaranteed)

keys('hi'); // ['0', '1']
keys([1, 2, 3]); // ['0', '1', '2']
keys({ a: 1, b: 2 }); // ['a', 'b']
```
