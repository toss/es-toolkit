// import { describe, expect, it } from "vitest";
// import { find } from "./find";

// describe('find', () => {
//   const array = [1, 2, 3, 4];

//   const objects = [
//     { a: 0, b: 0 },
//     { a: 1, b: 1 },
//     { a: 2, b: 2 },
//   ];

//   it(`should return the found value`, () => {
//     const result = find([
//       { a: 0, b: 0 },
//       { a: 1, b: 1 },
//       { a: 2, b: 2 },
//     ], (object) => object.a);

//     expect(
//       result
//     ).toEqual(
//       { a: 1, b: 1 }
//     );
//   });

//   it(`should return \`undefined\` if value is not found`, () => {
//     expect(
//       find(objects, (object) => object.a === 3)
//     ).toEqual(undefined);
//   });

//   it(`should work with \`_.matches\` shorthands`, () => {
//     expect(func(objects, { b: 2 })).toBe(expected[2]);
//   });

//   it(`should work with \`_.matchesProperty\` shorthands`, () => {
//     expect(func(objects, ['b', 2])).toBe(expected[2]);
//   });

//   it(`should work with \`_.property\` shorthands`, () => {
//     expect(func(objects, 'b')).toBe(expected[0]);
//   });

//   it(`should return \`${expected[1]}\` for empty collections`, () => {
//     const emptyValues = lodashStable.endsWith(methodName, 'Index')
//       ? lodashStable.reject(empties, lodashStable.isPlainObject)
//       : empties;
//     const expecting = lodashStable.map(emptyValues, lodashStable.constant(expected[1]));

//     const actual = lodashStable.map(emptyValues, (value) => {
//       try {
//         return func(value, { a: 3 });
//       } catch (e) { }
//     });

//     expect(actual).toEqual(expecting);
//   });

//   it(`should provide correct \`predicate\` arguments for arrays`, () => {
//     let args;
//     const array = ['a'];

//     func(array, function () {
//       args || (args = slice.call(arguments));
//     });

//     expect(args, ['a', 0).toEqual(array]);
//   });

//   it(`should work with an object for \`collection\``, () => {
//     const actual = func({ a: 1, b: 2, c: 3 }, (n) => n < 3);

//     const expected = {
//       find: 1,
//       findKey: 'a',
//       findLast: 2,
//       findLastKey: 'b',
//     }[methodName];

//     expect(actual).toBe(expected);
//   });

//   it(`should provide correct \`predicate\` arguments for objects`, () => {
//     let args;
//     const object = { a: 1 };

//     func(object, function () {
//       args || (args = slice.call(arguments));
//     });

//     expect(args, [1, 'a').toEqual(object]);
//   });

//   const values = lodashStable.toArray(collection);

//   it(`should work with ${key} and a positive \`fromIndex\``, () => {
//     const expected = [isIncludes || values[2], isIncludes ? false : undefined];

//     const actual = [
//       func(collection, resolve(values[2]), 2),
//       func(collection, resolve(values[1]), 2),
//     ];

//     expect(actual).toEqual(expected);
//   });

//   it(`should work with ${key} and a \`fromIndex\` >= \`length\``, () => {
//     const indexes = [4, 6, 2 ** 32, Infinity];

//     const expected = lodashStable.map(indexes, () => {
//       const result = isIncludes ? false : undefined;
//       return [result, result, result];
//     });

//     const actual = lodashStable.map(indexes, (fromIndex) => [
//       func(collection, resolve(1), fromIndex),
//       func(collection, resolve(undefined), fromIndex),
//       func(collection, resolve(''), fromIndex),
//     ]);

//     expect(actual).toEqual(expected);
//   });

//   it(`should work with ${key} and treat falsey \`fromIndex\` values as \`0\``, () => {
//     const expected = lodashStable.map(
//       falsey,
//       lodashStable.constant(isIncludes || values[0]),
//     );

//     const actual = lodashStable.map(falsey, (fromIndex) =>
//       func(collection, resolve(values[0]), fromIndex),
//     );

//     expect(actual).toEqual(expected);
//   });

//   it(`should work with ${key} and coerce \`fromIndex\` to an integer`, () => {
//     const expected = [
//       isIncludes || values[0],
//       isIncludes || values[0],
//       isIncludes ? false : undefined,
//     ];

//     const actual = [
//       func(collection, resolve(values[0]), 0.1),
//       func(collection, resolve(values[0]), NaN),
//       func(collection, resolve(values[0]), '1'),
//     ];

//     expect(actual).toEqual(expected);
//   });

//   it(`should work with ${key} and a negative \`fromIndex\``, () => {
//     const expected = [isIncludes || values[2], isIncludes ? false : undefined];

//     const actual = [
//       func(collection, resolve(values[2]), -1),
//       func(collection, resolve(values[1]), -1),
//     ];

//     expect(actual).toEqual(expected);
//   });

//   it(`should work with ${key} and a negative \`fromIndex\` <= \`-length\``, () => {
//     const indexes = [-4, -6, -Infinity];
//     const expected = lodashStable.map(
//       indexes,
//       lodashStable.constant(isIncludes || values[0]),
//     );

//     const actual = lodashStable.map(indexes, (fromIndex) =>
//       func(collection, resolve(values[0]), fromIndex),
//     );

//     expect(actual).toEqual(expected);
//   });

//   it(`should support shortcut fusion`, () => {
//     let findCount = 0;
//     let mapCount = 0;
//     const array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1);

//     const iteratee = function (value) {
//       mapCount++;
//       return square(value);
//     };
//     const predicate = function (value) {
//       findCount++;
//       return isEven(value);
//     };
//     const actual = _(array).map(iteratee)[methodName](predicate);

//     expect(findCount).toBe(isFind ? 2 : 1);
//     expect(mapCount).toBe(isFind ? 2 : 1);
//     expect(actual).toBe(isFind ? 4 : square(LARGE_ARRAY_SIZE));
//   });

//   it(`should support shortcut fusion`, () => {
//     let findCount = 0;
//     let mapCount = 0;
//     const array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1);

//     const iteratee = function (value) {
//       mapCount++;
//       return square(value);
//     };
//     const predicate = function (value) {
//       findCount++;
//       return isEven(value);
//     };
//     const actual = _(array).map(iteratee)[methodName](predicate);

//     expect(findCount).toBe(isFind ? 2 : 1);
//     expect(mapCount).toBe(isFind ? 2 : 1);
//     expect(actual).toBe(isFind ? 4 : square(LARGE_ARRAY_SIZE));
//   });
// })