/**
 * Returns the minimum value in an array of numbers.
 *
 * This function takes an array of elements and a selector function, and returns the element with the minimum value according to the selector.
 *
 * If the array is empty, the function returns `undefined`.
 *
 * @param elements An array of elements.
 * @param selector A function that selects a number from an element.
 */
export function minBy<T>(elements: T[], selector: (element: T) => number): T {

  let minElement = elements[0];
  let min = Infinity;

  for (const element of elements) {
    const value = selector(element);
    if (value < min) {
      min = value;
      minElement = element;
    }
  }

  return minElement;
}
