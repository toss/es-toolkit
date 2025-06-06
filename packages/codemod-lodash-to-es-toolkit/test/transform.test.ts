import { describe, expect, it } from 'vitest';
import jscodeshift from 'jscodeshift';
import transform from '../src/transform';

function testTransform(input: string): string | null {
  const fileInfo = {
    path: 'test.js',
    source: input,
  };

  const j = jscodeshift.withParser('tsx');
  const api = {
    jscodeshift: j,
    j: j,
    stats: () => {},
    report: () => {},
  };

  return transform(fileInfo, api);
}

describe('lodash to es-toolkit/compat codemod', () => {
  describe('default import transformation', () => {
    it('should transform default lodash import to namespace import', () => {
      const input = `import _ from 'lodash';
console.log(_.map([1, 2, 3], x => x * 2));`;

      const expected = `import * as _ from 'es-toolkit/compat';
console.log(_.map([1, 2, 3], x => x * 2));`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('named import transformation', () => {
    it('should transform named lodash imports', () => {
      const input = `import { map, filter, reduce } from 'lodash';
const result = map([1, 2, 3], x => x * 2);`;

      const expected = `import { map, filter, reduce } from 'es-toolkit/compat';
const result = map([1, 2, 3], x => x * 2);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('individual function import transformation', () => {
    it('should transform individual lodash function imports', () => {
      const input = `import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
const fn = debounce(() => {}, 100);`;

      const expected = `import { debounce } from 'es-toolkit/compat';
import { throttle } from 'es-toolkit/compat';
const fn = debounce(() => {}, 100);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });

    it('should handle aliased function imports', () => {
      const input = `import myDebounce from 'lodash/debounce';
const fn = myDebounce(() => {}, 100);`;

      const expected = `import { debounce as myDebounce } from 'es-toolkit/compat';
const fn = myDebounce(() => {}, 100);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('lodash-es transformation', () => {
    it('should transform lodash-es imports', () => {
      const input = `import { map, filter } from 'lodash-es';
const result = map([1, 2, 3], x => x * 2);`;

      const expected = `import { map, filter } from 'es-toolkit/compat';
const result = map([1, 2, 3], x => x * 2);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('lodash/fp transformation', () => {
    it('should transform lodash/fp imports', () => {
      const input = `import { pipe, map } from 'lodash/fp';
const result = pipe(map(x => x * 2))([1, 2, 3]);`;

      const expected = `import { pipe, map } from 'es-toolkit/compat';
const result = pipe(map(x => x * 2))([1, 2, 3]);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('mixed imports', () => {
    it('should handle multiple types of lodash imports in one file', () => {
      const input = `import _ from 'lodash';
import { map } from 'lodash-es';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const result1 = _.filter([1, 2, 3], x => x > 1);
const result2 = map([1, 2, 3], x => x * 2);
const fn1 = debounce(() => {}, 100);
const fn2 = throttle(() => {}, 200);`;

      const expected = `import * as _ from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { debounce } from 'es-toolkit/compat';
import { throttle } from 'es-toolkit/compat';

const result1 = _.filter([1, 2, 3], x => x > 1);
const result2 = map([1, 2, 3], x => x * 2);
const fn1 = debounce(() => {}, 100);
const fn2 = throttle(() => {}, 200);`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('quote style preservation', () => {
    it('should preserve single quotes when used in original code', () => {
      const input = `import _ from 'lodash';
import { map } from 'lodash-es';
import debounce from 'lodash/debounce';`;

      const expected = `import * as _ from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { debounce } from 'es-toolkit/compat';`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });

    it('should preserve double quotes when used in original code', () => {
      const input = `import _ from "lodash";
import { map } from "lodash-es";
import debounce from "lodash/debounce";`;

      const expected = `import * as _ from "es-toolkit/compat";
import { map } from "es-toolkit/compat";
import { debounce } from "es-toolkit/compat";`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });

    it('should use double quotes when mixed quotes but double quotes are more frequent', () => {
      const input = `import _ from "lodash";
import { map } from "lodash-es";
import debounce from 'lodash/debounce';
import React from "react";`;

      const expected = `import * as _ from "es-toolkit/compat";
import { map } from "es-toolkit/compat";
import { debounce } from "es-toolkit/compat";
import React from "react";`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });

    it('should use single quotes when mixed quotes but single quotes are more frequent', () => {
      const input = `import _ from 'lodash';
import { map } from 'lodash-es';
import debounce from "lodash/debounce";
import React from 'react';`;

      const expected = `import * as _ from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { debounce } from 'es-toolkit/compat';
import React from 'react';`;

      const result = testTransform(input);
      expect(result).toBe(expected);
    });
  });

  describe('no change scenarios', () => {
    it('should not modify non-lodash imports', () => {
      const input = `import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
};`;

      const result = testTransform(input);
      expect(result).toBeNull(); // No changes expected
    });

    it('should not modify files without imports', () => {
      const input = `const myFunction = () => {
  console.log('Hello world');
};

export default myFunction;`;

      const result = testTransform(input);
      expect(result).toBeNull(); // No changes expected
    });
  });
});
