import { hasIn as hasInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('hasIn', () => {
  // 기본 객체 경로 테스트 (문자열)
  group('with string path', () => {
    const obj = { a: { b: 3 } };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'a.b');
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(obj, 'a.b');
    });
  });

  // 기본 객체 경로 테스트 (배열)
  group('with array path', () => {
    const obj = { a: { b: 3 } };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, ['a', 'b']);
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(obj, ['a', 'b']);
    });
  });

  // 상속된 속성 테스트 (문자열)
  group('with inherited property (string)', () => {
    class Rectangle {
      area() {
        return 0;
      }
    }
    const rect = new Rectangle();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(rect, 'area');
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(rect, 'area');
    });
  });

  // 상속된 중첩 속성 테스트 (배열)
  group('with inherited nested property (array)', () => {
    class Rectangle {
      dimensions = { width: 10, height: 5 };
    }
    const rect = new Rectangle();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(rect, ['dimensions', 'width']);
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(rect, ['dimensions', 'width']);
    });
  });

  // Object.prototype 상속 속성 테스트
  group('with Object.prototype property', () => {
    const obj = {};

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'toString');
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(obj, 'toString');
    });
  });

  // 깊은 상속 체인 테스트
  group('with deep inheritance chain', () => {
    class GrandParent {
      method() {}
    }

    class Parent extends GrandParent {}

    class Child extends Parent {}

    const child = new Child();

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(child, 'method');
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(child, 'method');
    });
  });

  // 존재하지 않는 속성 테스트
  group('with non-existent property', () => {
    const obj = { a: 1 };

    bench('es-toolkit/hasIn', () => {
      hasInToolkit(obj, 'nonExistent');
    });

    bench('lodash/hasIn', () => {
      lodash.hasIn(obj, 'nonExistent');
    });
  });

  // 깊은 중첩 경로 테스트
  group('with deep nested path', () => {
    const deepObj = { a: { b: { c: { d: { e: { f: 1 } } } } } };

    bench('es-toolkit/hasIn deep path (string)', () => {
      hasInToolkit(deepObj, 'a.b.c.d.e.f');
    });

    bench('lodash/hasIn deep path (string)', () => {
      lodash.hasIn(deepObj, 'a.b.c.d.e.f');
    });

    bench('es-toolkit/hasIn deep path (array)', () => {
      hasInToolkit(deepObj, ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    bench('lodash/hasIn deep path (array)', () => {
      lodash.hasIn(deepObj, ['a', 'b', 'c', 'd', 'e', 'f']);
    });
  });
});
