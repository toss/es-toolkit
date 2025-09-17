# toPlainObject (Lodash 호환성)

::: warning Object.assign 사용 권장

객체를 일반 객체로 변환할 때는 Object.assign()이나 스프레드 연산자를 사용하는 것이 더 표준적인 방식이에요.

대신 더 빠르고 현대적인 Object.assign()을 사용하세요.

:::

값을 일반 객체로 변환해요. 상속된 열거 가능한 문자열 키 속성을 일반 객체의 속성으로 평평하게 만들어요.

```typescript
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

toPlainObject(new Foo()); // => { 'b': 2, 'c': 3 }
```

## 레퍼런스

### `toPlainObject(value: any): Record<string, any>`

값을 일반 객체로 변환해요.

#### 파라미터

- `value` (`any`): 변환할 값

### 반환 값

(`Record<string, any>`): 변환된 객체
