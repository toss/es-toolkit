/**
 * Get a value from an object by path.
 * 
 * This function takes an object and a path, and default value that will be returned if
 * a returnable value about the given path does not exist.
 * 
 * @template O - Type of the object to get value from. 
 * @template T - Type of the default value to return if the value does not exist.
 * @param {O} obj - The object to get value from. 
 * @param {string | string[]} path - The path to get value from. 
 * @param {T} defaultValue - The default value to return if the value does not exist.
 * @returns {O[keyof O] | undefined} - The value from the object by the given path.
 * 
 * @example
 * const obj = { a: { b: 3 } };
 * get(obj, 'a.b', null); // 3
 */

export function get<O, T>(obj: O, path: string | string[], defaultValue?: T): O[keyof O] | T | undefined {
  if (!Array.isArray(path)) {
    const pathArr = path.split('.');
    path = []
    for (let i = 0; i < pathArr.length; i++) {
      if (/^.+\[[0-9]+\]$/.test(pathArr[i])) {
        path.push(/^.+(?=\[[0-9]+\]$)/.exec(pathArr[i])![0])
        path.push(`${/(?<=^.+\[)[0-9]+(?=\]$)/.exec(pathArr[i])![0]}`)
      } else {
        path.push(pathArr[i])
      }
    }
  }

  const callback = (innerObj: any, innerPath: string) => {
    if (typeof innerObj[innerPath] === 'undefined') {
      return undefined
    }
    return innerObj[innerPath]
  }

  let currentObj = obj
  for (let i = 0; i < path.length; i++) {
    currentObj = callback(currentObj, path[i])
    if (typeof currentObj === 'undefined') {
      return typeof defaultValue === 'undefined' ? undefined : defaultValue
    }
  }
  return currentObj as O[keyof O]
}