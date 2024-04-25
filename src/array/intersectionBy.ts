/**
 * @name intersectionBy
 * @description
 * Returns the intersection of two arrays. The identity of two elements is calculated after the elements are mapped with `mapper`.
 * @param firstArr The first array to get the intersection
 * @param secondArr The second array to get the intersection
 * @param mapper The function to map the elements when calculating the intersection
 * @example
 * intersectionBy([1.2, 2.1], [1.4, 3.1], Math.floor) === [1.2]
 * intersectionBy([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], x => x.foo) === [{ foo: 1 }]
 */
export function intersectionBy<T, U>(firstArr: T[], secondArr: T[], mapper: (item: T) => U): T[] {
  const mappedSecondArr = secondArr.map(x => mapper(x));
  
  return firstArr.filter(item => {
    return mappedSecondArr.includes(mapper(item));
  })
}