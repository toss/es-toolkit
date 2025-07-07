const expectTypeOf = () => {
  const fn = () => {};

  return {
    toBeAny: fn,
    toBeUnknown: fn,
    toBeNever: fn,
    toBeFunction: fn,
    toBeObject: fn,
    toBeArray: fn,
    toBeString: fn,
    toBeNumber: fn,
    toBeBoolean: fn,
    toBeVoid: fn,
    toBeSymbol: fn,
    toBeNull: fn,
    toBeUndefined: fn,
    toBeNullable: fn,
    toMatchTypeOf: fn,
    toEqualTypeOf: fn,
    toBeCallableWith: fn,
    toBeConstructibleWith: fn,
    extract: expectTypeOf,
    exclude: expectTypeOf,
    pick: expectTypeOf,
    omit: expectTypeOf,
    toHaveProperty: expectTypeOf,
    parameter: expectTypeOf,
  };
};

module.exports = {
  describe,
  expect: value => {
    return expect(value);
  },
  it,
  vi: jest,
  expectTypeOf,
};
