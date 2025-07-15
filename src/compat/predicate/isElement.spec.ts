import { describe, expect, expectTypeOf, it } from 'vitest';
import { isElement } from 'es-toolkit/compat';
import type { isElement as isElementLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

/**
 * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/isElement.spec.js
 */

describe('isElement', () => {
  /*
  it( 'should return `true` for elements', () => {
    if ( document ) {
      expect( isElement( body ) ).toBe( true );
    }
  } );
   */

  it('should return `true` for non-plain objects', () => {
    class Foo {
      nodeType: number;

      constructor() {
        this.nodeType = 1;
      }
    }

    expect(isElement(new Foo())).toBe(true);
  });

  it('should return `false` for non DOM elements', () => {
    falsey.forEach(val => {
      expect(isElement(val)).toBe(false);
    });

    expect(isElement(args)).toBe(false);
    expect(isElement([1, 2, 3])).toBe(false);
    expect(isElement(true)).toBe(false);
    expect(isElement(new Date())).toBe(false);
    expect(isElement(new Error())).toBe(false);
    expect(isElement(slice)).toBe(false);
    expect(isElement({ a: 1 })).toBe(false);
    expect(isElement(1)).toBe(false);
    expect(isElement(/x/)).toBe(false);
    expect(isElement('a')).toBe(false);
    expect(isElement(symbol)).toBe(false);
  });

  it('should return `false` for plain objects', () => {
    expect(isElement({ nodeType: 1 })).toBe(false);
    expect(isElement({ nodeType: Object(1) })).toBe(false);
    expect(isElement({ nodeType: true })).toBe(false);
    expect(isElement({ nodeType: [1] })).toBe(false);
    expect(isElement({ nodeType: '1' })).toBe(false);
    expect(isElement({ nodeType: '001' })).toBe(false);
  });

  /*
  it( 'should work with a DOM element from another realm', () => {
    if ( realm.element ) {
      expect( isElement( realm.element ) ).toBe( true );
    }
  } );
   */

  it('should match the type of lodash', () => {
    expectTypeOf(isElement).toEqualTypeOf<typeof isElementLodash>();
  });
});
