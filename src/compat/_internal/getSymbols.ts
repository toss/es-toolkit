export function getSymbols(object: {}) {
  return Object.getOwnPropertySymbols(object)
    .filter(symbol => object.propertyIsEnumerable(symbol));
}