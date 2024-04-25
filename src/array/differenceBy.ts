/**
 * @name differenceBy
 * Returns the difference of two arrays. The identity of two elements is calculated after the elements are mapped with `mapper`.
 * @param firstArr The array to get the difference from
 * @param secondArr The elements to exclude from `firstArr`
 * @param mapper The function to map the elements when calculating the difference
 */
export function differenceBy<T, U>(firstArr: T[], secondArr: T[], mapper: (value: T) => U): T[] {
  const secondArrItems = secondArr.map(item => mapper(item));
  
  return firstArr.filter(item => {
    return !secondArrItems.includes(mapper(item));
  });
}