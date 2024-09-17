import { isString } from "./isString.ts";  
import { isBoolean } from "./isBoolean.ts";  
import { isNull } from "./isNull.ts";  
import { isArray } from "../compat/predicate/isArray.ts";  
import { isPlainObject } from "./isPlainObject.ts";  
  
export function isJSONObject(value: unknown): boolean {  
  // 首先检查 value 是否是一个纯粹的对象  
  if (!isPlainObject(value)) {  
    return false;  
  }  
  
  // 遍历对象的所有属性  
  for (const key in value) {  
    // 检查属性是否是对象自身拥有的（排除继承的属性）  
    if (value.hasOwnProperty(key)) {  
      const propValue = value[key];  
  
      // 如果属性值是对象，则递归调用 isJSONObject  
      if (isPlainObject(propValue)) {  
        if (!isJSONObject(propValue)) {  
          return false;  
        }  
      } else {  
        // 检查属性值是否为允许的基本类型或数组  
        if (typeof propValue !== 'number' && !isString(propValue) && !isBoolean(propValue) && !isNull(propValue) && !isArray(propValue)) {  
          return false;  
        }  
      }  
    }  
  }  
  
  return true;  
}  