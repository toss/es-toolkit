const MAX_PROTOTYPE_DEPTH = 1000;

export const CUSTOM_TAG_NONE = 0;
export const CUSTOM_TAG_OWN = 1;
export const CUSTOM_TAG_INHERITED = 2;
export const CUSTOM_TAG_UNCLONEABLE = 4;
export const CUSTOM_TAG_BRANDED = 8;

/**
 * Classifies the writable data property that supplies a value's visible `Symbol.toStringTag`.
 * A deeper accessor or read-only string tag marks a built-in brand that must not be hidden by a
 * user-defined tag, because cloning that value as an ordinary object would lose its internal slots.
 */
export function getCustomToStringTagType(value: object, tag: string, checkForBrand = false): number {
  let owner: object | null = value;
  let type = CUSTOM_TAG_NONE;
  let depth = 0;
  let hasTagDescriptor = false;

  try {
    while (owner !== null) {
      if (++depth > MAX_PROTOTYPE_DEPTH) {
        return CUSTOM_TAG_UNCLONEABLE;
      }

      const descriptor = Object.getOwnPropertyDescriptor(owner, Symbol.toStringTag);

      if (descriptor !== undefined) {
        if (!hasTagDescriptor) {
          hasTagDescriptor = true;

          if (!('value' in descriptor)) {
            type = (owner === value ? CUSTOM_TAG_OWN : CUSTOM_TAG_INHERITED) | CUSTOM_TAG_UNCLONEABLE;
          } else if (typeof descriptor.value === 'string') {
            if (tag !== `[object ${descriptor.value}]`) {
              return CUSTOM_TAG_UNCLONEABLE;
            }

            type = owner === value ? CUSTOM_TAG_OWN : CUSTOM_TAG_INHERITED;
            if (!descriptor.writable) {
              type |= CUSTOM_TAG_UNCLONEABLE;
            }
          }

          if ((type & CUSTOM_TAG_UNCLONEABLE) !== 0 && !checkForBrand) {
            return type;
          }
        } else if (!('value' in descriptor) || (typeof descriptor.value === 'string' && !descriptor.writable)) {
          type |= CUSTOM_TAG_BRANDED;
        }
      }

      owner = Object.getPrototypeOf(owner);
    }
  } catch {
    return CUSTOM_TAG_UNCLONEABLE;
  }

  return type;
}
