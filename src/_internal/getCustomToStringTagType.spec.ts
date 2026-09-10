import { describe, expect, it } from 'vitest';
import {
  CUSTOM_TAG_BRANDED,
  CUSTOM_TAG_INHERITED,
  CUSTOM_TAG_NONE,
  CUSTOM_TAG_OWN,
  CUSTOM_TAG_UNCLONEABLE,
  getCustomToStringTagType,
} from './getCustomToStringTagType';

describe('getCustomToStringTagType', () => {
  it('distinguishes own and inherited writable string tags', () => {
    const own = { [Symbol.toStringTag]: 'Own' };
    const prototype = { [Symbol.toStringTag]: 'Inherited' };
    const inherited = Object.create(prototype);

    expect(getCustomToStringTagType(own, '[object Own]')).toBe(CUSTOM_TAG_OWN);
    expect(getCustomToStringTagType(inherited, '[object Inherited]')).toBe(CUSTOM_TAG_INHERITED);
  });

  it('returns none for a missing or non-string tag', () => {
    expect(getCustomToStringTagType({}, '[object Object]')).toBe(CUSTOM_TAG_NONE);
    expect(getCustomToStringTagType({ [Symbol.toStringTag]: 1 }, '[object Object]')).toBe(CUSTOM_TAG_NONE);
  });

  it('ignores a deeper writable string tag when a nearer non-string tag shadows it', () => {
    const prototype = { [Symbol.toStringTag]: 'Tagged' };
    const value = Object.create(prototype, {
      [Symbol.toStringTag]: { configurable: true, enumerable: true, value: 123, writable: true },
    });

    expect(getCustomToStringTagType(value, '[object Object]')).toBe(CUSTOM_TAG_NONE);
  });

  it('rejects an accessor, a read-only tag, and a reported-tag mismatch', () => {
    const accessor = Object.create(null, {
      [Symbol.toStringTag]: { configurable: true, get: () => 'Accessor' },
    });
    const readOnly = Object.create(null, {
      [Symbol.toStringTag]: { configurable: true, value: 'ReadOnly' },
    });
    const mismatch = { [Symbol.toStringTag]: 'Actual' };

    expect(getCustomToStringTagType(accessor, '[object Accessor]')).toBe(CUSTOM_TAG_OWN | CUSTOM_TAG_UNCLONEABLE);
    expect(getCustomToStringTagType(readOnly, '[object ReadOnly]')).toBe(CUSTOM_TAG_OWN | CUSTOM_TAG_UNCLONEABLE);
    expect(getCustomToStringTagType(mismatch, '[object Different]')).toBe(CUSTOM_TAG_UNCLONEABLE);
  });

  it('rejects a writable tag that masks a deeper accessor or read-only tag', () => {
    for (const descriptor of [
      { configurable: true, get: () => 'Native' },
      { configurable: true, value: 'Native', writable: false },
    ]) {
      const brandedPrototype = Object.create(null, { [Symbol.toStringTag]: descriptor });
      const customPrototype = Object.create(brandedPrototype, {
        [Symbol.toStringTag]: { configurable: true, value: 'Tagged', writable: true },
      });
      const value = Object.create(customPrototype);

      expect(getCustomToStringTagType(value, '[object Tagged]')).toBe(CUSTOM_TAG_INHERITED | CUSTOM_TAG_BRANDED);
    }
  });

  it.each(['getOwnPropertyDescriptor', 'getPrototypeOf'] as const)('rejects a value when its %s trap throws', trap => {
    const value = new Proxy(
      {},
      {
        [trap]() {
          throw new Error(`${trap} trap`);
        },
      }
    );

    expect(getCustomToStringTagType(value, '[object Tagged]')).toBe(CUSTOM_TAG_UNCLONEABLE);
  });

  it('stops a cyclic proxy prototype chain', () => {
    const holder: { value?: object } = {};
    const value = new Proxy(
      {},
      {
        getOwnPropertyDescriptor: () => undefined,
        getPrototypeOf: () => holder.value!,
      }
    );
    holder.value = value;

    expect(getCustomToStringTagType(value, '[object Tagged]')).toBe(CUSTOM_TAG_UNCLONEABLE);
  });
});
