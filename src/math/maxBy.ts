/**
 * Returns the element of the specified array that has the maximum value, according to the specified selector.
 *
 * This function takes an array of elements and a selector function, and returns the element with the maximum value according to the selector.
 *
 * @param {T[]} elements - An array of elements to be compared.
 * @param {(element: T) => number} selector - A function that takes an element and returns a number.
 * @returns {T} The element with the maximum value according to the selector.
 *
 * @example
 * const people = [
 *  { name: 'Mark', age: 25 },
 *  { name: 'Nunu', age: 30 },
 *  { name: 'Overmars', age: 20 }
 *  ];
 *  const result = maxBy(people, person => person.age);
 *  // result will be { name: 'Nunu', age: 30 }
 */
export function maxBy<T>(elements: T[], selector: (element: T) => number): T | undefined {
  if (elements.length === 0) {
    return undefined;
  }

  let maxElement = elements[0];
  let max = -Infinity;
  for (const element of elements) {
    const value = selector(element);
    if (value > max) {
      max = value;
      maxElement = element;
    }
  }

  return maxElement;
}
