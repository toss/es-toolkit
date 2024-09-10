export function decimalAdjust(
  type: 'round' | 'floor' | 'ceil',
  number: number | string,
  precision: number | string = 0
): number {
  number = Number(number);
  if (number === 0 && 1 / number === -Infinity) {
    number = '-0';
  }
  precision = Math.min(Number.parseInt(precision as string, 10), 292);
  if (precision) {
    const [magnitude, exponent = 0] = number.toString().split('e');
    let adjustedValue: string | number = Math[type](Number(`${magnitude}e${Number(exponent) + precision}`));
    if (adjustedValue === 0 && 1 / adjustedValue === -Infinity) {
      adjustedValue = '-0';
    }
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split('e');
    return Number(`${newMagnitude}e${Number(newExponent) - precision}`);
  }
  return Math[type](Number(number));
}
