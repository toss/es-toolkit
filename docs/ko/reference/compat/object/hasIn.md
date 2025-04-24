# hasIn

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체가 주어진 경로에 해당하는 프로퍼티를 가지는지 확인해요. 상속받은 프로퍼티도 함께 확인해요.

경로로는 객체의 프로퍼티 이름, 프로퍼티 이름의 배열, 또는 깊은 경로를 나타내는 문자열을 쓸 수 있어요.

`has` 함수는 객체 자신의 프로퍼티만 확인하지만, `hasIn`은 프로토타입 체인의 프로퍼티도 확인해요.

만약에 경로가 인덱스를 나타내고, 객체가 배열 또는 `arguments` 객체라면, 그 인덱스가 유효한지 (0 이상이고 길이 미만인지) 확인해요. 그래서 모든 인덱스가 정의되어 있지 않은 희소 배열(Sparse array)에도 쓸 수 있어요.

## 인터페이스

```typescript
function hasIn(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### 파라미터

- `object` (`unknown`): 프로퍼티가 있는지 확인할 객체.
- `path` (`string`, `number`, `symbol`, `Array<string | number | symbol>`): 프로퍼티가 있는지 확인할 경로. 프로퍼티 이름, 프로퍼티 이름의 배열, 또는 깊은 경로를 나타내는 문자열을 쓸 수 있어요.

### 반환 값

(`boolean`): 객체가 경로에 값을 가지고 있으면(자신의 프로퍼티이든 상속받은 프로퍼티이든) `true`, 아니면 `false`.

## 예시

```typescript
import { has, hasIn } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

hasIn(obj, 'a'); // true
hasIn(obj, ['a', 'b']); // true
hasIn(obj, ['a', 'b', 'c']); // true
hasIn(obj, 'a.b.c'); // true
hasIn(obj, 'a.b.d'); // false
hasIn(obj, ['a', 'b', 'c', 'd']); // false

// 상속받은 프로퍼티 예제:
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - hasIn은 상속받은 프로퍼티도 확인해요
has(rect, 'area'); // false - has는 자기 자신의 프로퍼티만 확인해요
```

## 데모

::: sandpack

```ts index.ts
import { has, hasIn } from 'es-toolkit/compat';

// 상속받은 프로퍼티 예제
function Rectangle() {
  this.width = 10;
  this.height = 5;
}
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect = new Rectangle();

console.log('hasIn(rect, "area"):', hasIn(rect, 'area')); // true - 상속받은 프로퍼티도 확인해요
console.log('has(rect, "area"):', has(rect, 'area')); // false - 자기 자신의 프로퍼티만 확인해요
console.log('hasIn(rect, "width"):', hasIn(rect, 'width')); // true - 자기 자신의 프로퍼티
```

:::
