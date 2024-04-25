/**
 * @name differenceWith
 * Returns the difference of two arrays. The identity of two elements is calculated with the function `areItemsEqual`.
 * @param firstArr The array to get the difference from
 * @param secondArr The elements to exclude from `firstArr`
 * @param areItemsEqual The function to determine whether two items are equal
 */
export function differenceWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[] {
  return firstArr.filter(firstItem => {
    return secondArr.every(secondItem => {
      return !areItemsEqual(firstItem, secondItem);
    })
  })
}