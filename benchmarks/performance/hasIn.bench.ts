import { bench, describe } from 'vitest';
import { hasIn as hasInToolkit_ } from 'es-toolkit/compat';
import { hasIn as hasInLodash_ } from 'lodash';

const hasInToolkit = hasInToolkit_;
const hasInLodash = hasInLodash_;

describe('hasIn', () => {
  // 기본 객체 경로 테스트 (문자열)
  describe('with string path', () => {
    const obj = { a: { b: 3 } };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'a.b');
    });

    bench('lodash/hasIn', () => {
      hasInLodash(obj, 'a.b');
    });
  });

  // 기본 객체 경로 테스트 (배열)
  describe('with array path', () => {
    const obj = { a: { b: 3 } };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, ['a', 'b']);
    });

    bench('lodash/hasIn', () => {
      hasInLodash(obj, ['a', 'b']);
    });
  });

  // 상속된 속성 테스트 (문자열)
  describe('with inherited property (string)', () => {
    function Rectangle() {}
    Rectangle.prototype.area = function () {
      return 0;
    };
    const rect = new Rectangle();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(rect, 'area');
    });

    bench('lodash/hasIn', () => {
      hasInLodash(rect, 'area');
    });
  });

  // 상속된 중첩 속성 테스트 (배열)
  describe('with inherited nested property (array)', () => {
    function Rectangle() {}
    Rectangle.prototype.dimensions = { width: 10, height: 5 };
    const rect = new Rectangle();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(rect, ['dimensions', 'width']);
    });

    bench('lodash/hasIn', () => {
      hasInLodash(rect, ['dimensions', 'width']);
    });
  });

  // Object.prototype 상속 속성 테스트
  describe('with Object.prototype property', () => {
    const obj = {};

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'toString');
    });

    bench('lodash/hasIn', () => {
      hasInLodash(obj, 'toString');
    });
  });

  // 깊은 상속 체인 테스트
  describe('with deep inheritance chain', () => {
    function GrandParent() {}
    GrandParent.prototype.method = function () {};

    function Parent() {}
    Parent.prototype = Object.create(GrandParent.prototype);

    function Child() {}
    Child.prototype = Object.create(Parent.prototype);

    const child = new Child();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(child, 'method');
    });

    bench('lodash/hasIn', () => {
      hasInLodash(child, 'method');
    });
  });

  // 존재하지 않는 속성 테스트
  describe('with non-existent property', () => {
    const obj = { a: 1 };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'nonExistent');
    });

    bench('lodash/hasIn', () => {
      hasInLodash(obj, 'nonExistent');
    });
  });

  // 깊은 중첩 경로 테스트
  describe('with deep nested path', () => {
    const deepObj = { a: { b: { c: { d: { e: { f: 1 } } } } } };

    bench('es-toolkit/hasIn deep path (string)', () => {
      hasInToolkit(deepObj, 'a.b.c.d.e.f');
    });

    bench('lodash/hasIn deep path (string)', () => {
      hasInLodash(deepObj, 'a.b.c.d.e.f');
    });

    bench('es-toolkit/hasIn deep path (array)', () => {
      hasInToolkit(deepObj, ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    bench('lodash/hasIn deep path (array)', () => {
      hasInLodash(deepObj, ['a', 'b', 'c', 'd', 'e', 'f']);
    });
  });
});
