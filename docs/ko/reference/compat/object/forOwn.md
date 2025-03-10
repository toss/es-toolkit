# forOwn

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 직접 열거 가능한 속성을 순회하면서 각 속성에 대해 이터리 함수를 호출해요. 이터리는 세 개의 인수(value, key, object)와 함께 호출돼요. 이터리 함수는 명시적으로 false를 반환하여 순회를 조기에 종료할 수 있어요.

## 인터페이스

```typescript
function forOwn<T>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### 파라미터

- `object` (`T | null | undefined`): 순회할 객체.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 순회할 때마다 호출되는 함수. 제공되지 않으면 identity 함수가 사용돼요.

### 반환 값

(`T | null | undefined`): 순회 완료된 객체.

## 예시

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

forOwn(new Foo(), function (value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
