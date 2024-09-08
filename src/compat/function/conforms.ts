import { conformsTo } from './conformsTo.ts';
import { cloneDeep } from '../../object/cloneDeep.ts';
/**
 * Creates a function that invokes the predicate properties of `source` with the corresponding property values of a given object, returning `true` if all predicates return truthy, else `false`.
 *
 * Note: The created function is equivalent to `conformsTo` with source partially applied.
 *
 * @param {Record<PropertyKey, (value: any) => boolean>} source The object of property predicates to conform to.
 * @returns {(object: Record<PropertyKey, any>) => boolean} Returns the new spec function.
 */
export function conforms(
  source: Record<PropertyKey, (value: any) => boolean>
): (object: Record<PropertyKey, any>) => boolean {
  source = cloneDeep(source);
  return function (object: Record<PropertyKey, any>) {
    return conformsTo(object, source);
  };
}
