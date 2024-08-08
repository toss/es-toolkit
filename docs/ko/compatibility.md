# Lodash와의 호환성

```tsx
// es-toolkit/compat은 lodash와 100% 동일한 동작을 제공하도록 목표하고 있어요
import { chunk } from 'es-toolkit/compat';

// es-toolkit은 원래 chunk의 size로 0을 지원하지 않았어요
chunk([1, 2, 3, 4], 0);
// es-toolkit/compat은 lodash와 같은 []을 반환해요
```

`lodash`와 최대 호환성을 위해서는 `es-toolkit/compat` 라이브러리를 사용하세요.

`es-toolkit`은 매끄러운 마이그레이션을 보장하기 위해, 두 라이브러리 사이의 동작 차이가 없는 `es-toolkit/compat` 라이브러리를 개발하고 있어요. `lodash`와 동일한 API와 기능을 제공하여, 수월하게 마이그레이션을 할 수 있도록 도와줄 예정이에요.

`es-toolkit/compat`은 실제 `lodash` 테스트 코드를 이용해서 테스트돼요.

`es-toolkit/compat`는 원래 `es-toolkit`에 비해 런타임 퍼포먼스나 번들 크기가 최적은 아닐 수 있어요. 마이그레이션 중에 사용하는 도구로 생각해 주시고, 새로운 기능은 `es-toolkit`로 개발해주세요.

## 설계 원칙

::: info
`es-toolkit/compat` 설계 원칙의 방향성은 변경될 수 있어요.
:::

`es-toolkit/compat`은 다음과 같은 기능들에 대해서 `lodash`와 100% 동일한 기능을 제공하는 것을 목표로 해요.

- `lodash`의 테스트 케이스로 작성된 기능
- `@types/lodash` 또는 `@types/lodash-es`의 타입에서 추론할 수 있는 기능

아래와 같은 기능은 `es-toolkit/compat`에서 지원하지 않아요.

- 암시적 타입 변환: 빈 문자열을 0 또는 false로 변환하는 것과 같은 동작
- 어떤 경우에 특화된 구현: [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)와 같이 정렬된 배열만 받는 함수
- JavaScript 내장 객체의 프로토타입이 바뀐 경우에 대응하는 코드
- JavaScript Realm에 대응하는 코드
- 메서드 체이닝: `_(arr).map(...).filter(...)`와 같은 메서드 체이닝

## 구현 상태

::: info
아래 이모지로 현재 구현 상태를 나타내고 있어요.

- ✅: 완료 (구현됐고, lodash 테스트 코드를 모두 통과해요.)
- 📝: 리뷰 중 (구현됐지만, lodash 테스트 코드로 테스트되지는 않았어요.)
- ❌: 아직 구현되지 않음

"리뷰 중"으로 표시되었더라고 하더라도, 이미 lodash와 100% 동일한 기능을 제공하고 있을 수도 있어요.
:::

### "Array" 메서드

| 함수 이름                                                              | 구현 상태     |
| ---------------------------------------------------------------------- | ------------- |
| [chunk](https://lodash.com/docs/4.17.15#chunk)                         | ✅            |
| [compact](https://lodash.com/docs/4.17.15#compact)                     | ✅            |
| [concat](https://lodash.com/docs/4.17.15#concat)                       | ✅            |
| [difference](https://lodash.com/docs/4.17.15#difference)               | ✅            |
| [differenceBy](https://lodash.com/docs/4.17.15#differenceBy)           | 📝            |
| [differenceWith](https://lodash.com/docs/4.17.15#differenceWith)       | 📝            |
| [drop](https://lodash.com/docs/4.17.15#drop)                           | ✅            |
| [dropRight](https://lodash.com/docs/4.17.15#dropRight)                 | ✅            |
| [dropRightWhile](https://lodash.com/docs/4.17.15#dropRightWhile)       | 📝            |
| [dropWhile](https://lodash.com/docs/4.17.15#dropWhile)                 | 📝            |
| [fill](https://lodash.com/docs/4.17.15#fill)                           | ✅            |
| [findIndex](https://lodash.com/docs/4.17.15#findIndex)                 | ❌            |
| [findLastIndex](https://lodash.com/docs/4.17.15#findIndex)             | ❌            |
| [flatten](https://lodash.com/docs/4.17.15#flatten)                     | ✅            |
| [flattenDeep](https://lodash.com/docs/4.17.15#flattenDeep)             | ✅            |
| [flattenDepth](https://lodash.com/docs/4.17.15#flattenDepth)           | ✅            |
| [fromPairs](https://lodash.com/docs/4.17.15#fromPairs)                 | ❌            |
| [head](https://lodash.com/docs/4.17.15#head)                           | 📝            |
| [indexOf](https://lodash.com/docs/4.17.15#indexOf)                     | ❌            |
| [initial](https://lodash.com/docs/4.17.15#initial)                     | ✅            |
| [intersection](https://lodash.com/docs/4.17.15#intersection)           | 📝            |
| [intersectionBy](https://lodash.com/docs/4.17.15#intersectionBy)       | 📝            |
| [intersectionWith](https://lodash.com/docs/4.17.15#intersectionWith)   | 📝            |
| [join](https://lodash.com/docs/4.17.15#join)                           | ❌            |
| [last](https://lodash.com/docs/4.17.15#last)                           | ✅            |
| [lastIndexOf](https://lodash.com/docs/4.17.15#lastIndexOf)             | ❌            |
| [nth](https://lodash.com/docs/4.17.15#nth)                             | ❌            |
| [pull](https://lodash.com/docs/4.17.15#pull)                           | ❌            |
| [pullAll](https://lodash.com/docs/4.17.15#pullAll)                     | ❌            |
| [pullAllBy](https://lodash.com/docs/4.17.15#pullAllBy)                 | ❌            |
| [pullAllWith](https://lodash.com/docs/4.17.15#pullAllWith)             | ❌            |
| [pullAt](https://lodash.com/docs/4.17.15#pullAt)                       | ❌            |
| [remove](https://lodash.com/docs/4.17.15#remove)                       | ❌            |
| [reverse](https://lodash.com/docs/4.17.15#reverse)                     | ❌            |
| [slice](https://lodash.com/docs/4.17.15#slice)                         | ❌            |
| [sortedIndex](https://lodash.com/docs/4.17.15#sortedIndex)             | 지원하지 않음 |
| [sortedIndexBy](https://lodash.com/docs/4.17.15#sortedIndexBy)         | 지원하지 않음 |
| [sortedIndexOf](https://lodash.com/docs/4.17.15#sortedIndexOf)         | 지원하지 않음 |
| [sortedLastIndex](https://lodash.com/docs/4.17.15#sortedLastIndex)     | 지원하지 않음 |
| [sortedLastIndexBy](https://lodash.com/docs/4.17.15#sortedLastIndexBy) | 지원하지 않음 |
| [sortedLastIndexOf](https://lodash.com/docs/4.17.15#sortedLastIndexOf) | 지원하지 않음 |
| [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)               | 지원하지 않음 |
| [sortedUniqBy](https://lodash.com/docs/4.17.15#sortedUniqBy)           | 지원하지 않음 |
| [tail](https://lodash.com/docs/4.17.15#tail)                           | 📝            |
| [take](https://lodash.com/docs/4.17.15#take)                           | 📝            |
| [takeRight](https://lodash.com/docs/4.17.15#takeRight)                 | ✅            |
| [takeRightWhile](https://lodash.com/docs/4.17.15#takeRightWhile)       | 📝            |
| [takeWhile](https://lodash.com/docs/4.17.15#takeWhile)                 | 📝            |
| [union](https://lodash.com/docs/4.17.15#union)                         | 📝            |
| [unionBy](https://lodash.com/docs/4.17.15#unionBy)                     | 📝            |
| [unionWith](https://lodash.com/docs/4.17.15#unionWith)                 | 📝            |
| [uniq](https://lodash.com/docs/4.17.15#uniq)                           | ✅            |
| [uniqBy](https://lodash.com/docs/4.17.15#uniqBy)                       | 📝            |
| [uniqWith](https://lodash.com/docs/4.17.15#uniqWith)                   | 📝            |
| [unzip](https://lodash.com/docs/4.17.15#unzip)                         | 📝            |
| [unzipWith](https://lodash.com/docs/4.17.15#unzipWith)                 | 📝            |
| [without](https://lodash.com/docs/4.17.15#without)                     | ✅            |
| [xor](https://lodash.com/docs/4.17.15#xor)                             | 📝            |
| [xorBy](https://lodash.com/docs/4.17.15#xorBy)                         | 📝            |
| [xorWith](https://lodash.com/docs/4.17.15#xorWith)                     | 📝            |
| [zip](https://lodash.com/docs/4.17.15#zip)                             | 📝            |
| [zipObject](https://lodash.com/docs/4.17.15#zipObject)                 | 📝            |
| [zipObjectDeep](https://lodash.com/docs/4.17.15#zipObjectDeep)         | ✅            |
| [zipWith](https://lodash.com/docs/4.17.15#zipWith)                     | 📝            |

### "Collection" 메서드

| 함수 이름                                                    | 구현 상태 |
| ------------------------------------------------------------ | --------- |
| [countBy](https://lodash.com/docs/4.17.15#countBy)           | 📝        |
| [every](https://lodash.com/docs/4.17.15#every)               | ❌        |
| [filter](https://lodash.com/docs/4.17.15#filter)             | ❌        |
| [find](https://lodash.com/docs/4.17.15#find)                 | ❌        |
| [findLast](https://lodash.com/docs/4.17.15#findLast)         | ❌        |
| [flatMap](https://lodash.com/docs/4.17.15#flatMap)           | ❌        |
| [flatMapDeep](https://lodash.com/docs/4.17.15#flatMapDeep)   | ❌        |
| [flatMapDepth](https://lodash.com/docs/4.17.15#flatMapDepth) | ❌        |
| [forEach](https://lodash.com/docs/4.17.15#forEach)           | ❌        |
| [forEachRight](https://lodash.com/docs/4.17.15#forEachRight) | ❌        |
| [groupBy](https://lodash.com/docs/4.17.15#groupBy)           | 📝        |
| [includes](https://lodash.com/docs/4.17.15#includes)         | ❌        |
| [invokeMap](https://lodash.com/docs/4.17.15#invokeMap)       | ❌        |
| [keyBy](https://lodash.com/docs/4.17.15#keyBy)               | 📝        |
| [map](https://lodash.com/docs/4.17.15#map)                   | ❌        |
| [orderBy](https://lodash.com/docs/4.17.15#orderBy)           | 📝        |
| [partition](https://lodash.com/docs/4.17.15#partition)       | 📝        |
| [reduce](https://lodash.com/docs/4.17.15#reduce)             | ❌        |
| [reduceRight](https://lodash.com/docs/4.17.15#reduceRight)   | ❌        |
| [reject](https://lodash.com/docs/4.17.15#reject)             | ❌        |
| [sample](https://lodash.com/docs/4.17.15#sample)             | 📝        |
| [sampleSize](https://lodash.com/docs/4.17.15#sampleSize)     | 📝        |
| [shuffle](https://lodash.com/docs/4.17.15#shuffle)           | 📝        |
| [size](https://lodash.com/docs/4.17.15#size)                 | ✅        |
| [some](https://lodash.com/docs/4.17.15#some)                 | ❌        |
| [sortBy](https://lodash.com/docs/4.17.15#sortBy)             | ❌        |

### "Date" 메서드

| 함수 이름                                  | 구현 상태 |
| ------------------------------------------ | --------- |
| [now](https://lodash.com/docs/4.17.15#now) | ❌        |

### "Function" 메서드

| 함수 이름                                                    | 구현 상태 |
| ------------------------------------------------------------ | --------- |
| [after](https://lodash.com/docs/4.17.15#after)               | ❌        |
| [ary](https://lodash.com/docs/4.17.15#ary)                   | ❌        |
| [before](https://lodash.com/docs/4.17.15#before)             | ❌        |
| [bind](https://lodash.com/docs/4.17.15#bind)                 | ❌        |
| [bindKey](https://lodash.com/docs/4.17.15#bindKey)           | ❌        |
| [curry](https://lodash.com/docs/4.17.15#curry)               | ❌        |
| [curryRight](https://lodash.com/docs/4.17.15#curryRight)     | ❌        |
| [debounce](https://lodash.com/docs/4.17.15#debounce)         | 📝        |
| [defer](https://lodash.com/docs/4.17.15#defer)               | ❌        |
| [delay](https://lodash.com/docs/4.17.15#delay)               | ❌        |
| [flip](https://lodash.com/docs/4.17.15#flip)                 | ❌        |
| [memoize](https://lodash.com/docs/4.17.15#memoize)           | ❌        |
| [negate](https://lodash.com/docs/4.17.15#negate)             | 📝        |
| [once](https://lodash.com/docs/4.17.15#once)                 | 📝        |
| [overArgs](https://lodash.com/docs/4.17.15#overArgs)         | ❌        |
| [partial](https://lodash.com/docs/4.17.15#partial)           | ❌        |
| [partialRight](https://lodash.com/docs/4.17.15#partialRight) | ❌        |
| [rearg](https://lodash.com/docs/4.17.15#rearg)               | ❌        |
| [rest](https://lodash.com/docs/4.17.15#rest)                 | ❌        |
| [spread](https://lodash.com/docs/4.17.15#spread)             | ❌        |
| [throttle](https://lodash.com/docs/4.17.15#throttle)         | 📝        |
| [unary](https://lodash.com/docs/4.17.15#unary)               | ❌        |
| [wrap](https://lodash.com/docs/4.17.15#wrap)                 | ❌        |

### "Lang" 메서드

| 함수 이름                                                              | 구현 상태 |
| ---------------------------------------------------------------------- | --------- |
| [castArray](https://lodash.com/docs/4.17.15#castArray)                 | ❌        |
| [clone](https://lodash.com/docs/4.17.15#clone)                         | 📝        |
| [cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)                 | ✅        |
| [cloneDeepWith](https://lodash.com/docs/4.17.15#cloneDeepWith)         | ❌        |
| [cloneWith](https://lodash.com/docs/4.17.15#cloneWith)                 | ❌        |
| [conformsTo](https://lodash.com/docs/4.17.15#conformsTo)               | ❌        |
| [eq](https://lodash.com/docs/4.17.15#eq)                               | ❌        |
| [gt](https://lodash.com/docs/4.17.15#gt)                               | ❌        |
| [gte](https://lodash.com/docs/4.17.15#gte)                             | ❌        |
| [isArguments](https://lodash.com/docs/4.17.15#isArguments)             | ✅        |
| [isArray](https://lodash.com/docs/4.17.15#isArray)                     | ✅        |
| [isArrayBuffer](https://lodash.com/docs/4.17.15#isArrayBuffer)         | ❌        |
| [isArrayLike](https://lodash.com/docs/4.17.15#isArrayLike)             | ✅        |
| [isArrayLikeObject](https://lodash.com/docs/4.17.15#isArrayLikeObject) | ❌        |
| [isBoolean](https://lodash.com/docs/4.17.15#isBoolean)                 | ✅        |
| [isBuffer](https://lodash.com/docs/4.17.15#isBuffer)                   | ❌        |
| [isDate](https://lodash.com/docs/4.17.15#isDate)                       | ❌        |
| [isElement](https://lodash.com/docs/4.17.15#isElement)                 | ❌        |
| [isEmpty](https://lodash.com/docs/4.17.15#isEmpty)                     | ❌        |
| [isEqual](https://lodash.com/docs/4.17.15#isEqual)                     | ✅        |
| [isEqualWith](https://lodash.com/docs/4.17.15#isEqualWith)             | ❌        |
| [isError](https://lodash.com/docs/4.17.15#isError)                     | ❌        |
| [isFinite](https://lodash.com/docs/4.17.15#isFinite)                   | ❌        |
| [isFunction](https://lodash.com/docs/4.17.15#isFunction)               | ✅        |
| [isInteger](https://lodash.com/docs/4.17.15#isInteger)                 | ❌        |
| [isLength](https://lodash.com/docs/4.17.15#isLength)                   | ✅        |
| [isMap](https://lodash.com/docs/4.17.15#isMap)                         | ❌        |
| [isMatch](https://lodash.com/docs/4.17.15#isMatch)                     | ✅        |
| [isMatchWith](https://lodash.com/docs/4.17.15#isMatchWith)             | ❌        |
| [isNaN](https://lodash.com/docs/4.17.15#isNaN)                         | ❌        |
| [isNative](https://lodash.com/docs/4.17.15#isNative)                   | ❌        |
| [isNil](https://lodash.com/docs/4.17.15#isNil)                         | 📝        |
| [isNull](https://lodash.com/docs/4.17.15#isNull)                       | ✅        |
| [isNumber](https://lodash.com/docs/4.17.15#isNumber)                   | ❌        |
| [isObject](https://lodash.com/docs/4.17.15#isObject)                   | ❌        |
| [isObjectLike](https://lodash.com/docs/4.17.15#isObjectLike)           | ✅        |
| [isPlainObject](https://lodash.com/docs/4.17.15#isPlainObject)         | ❌        |
| [isRegExp](https://lodash.com/docs/4.17.15#isRegExp)                   | ❌        |
| [isSafeInteger](https://lodash.com/docs/4.17.15#isSafeInteger)         | ❌        |
| [isSet](https://lodash.com/docs/4.17.15#isSet)                         | ❌        |
| [isString](https://lodash.com/docs/4.17.15#isString)                   | ❌        |
| [isSymbol](https://lodash.com/docs/4.17.15#isSymbol)                   | ❌        |
| [isTypedArray](https://lodash.com/docs/4.17.15#isTypedArray)           | ✅        |
| [isUndefined](https://lodash.com/docs/4.17.15#isUndefined)             | ✅        |
| [isWeakMap](https://lodash.com/docs/4.17.15#isWeakMap)                 | ❌        |
| [isWeakSet](https://lodash.com/docs/4.17.15#isWeakSet)                 | ❌        |
| [lt](https://lodash.com/docs/4.17.15#lt)                               | ❌        |
| [lte](https://lodash.com/docs/4.17.15#lte)                             | ❌        |
| [toArray](https://lodash.com/docs/4.17.15#toArray)                     | ❌        |
| [toFinite](https://lodash.com/docs/4.17.15#toFinite)                   | ❌        |
| [toInteger](https://lodash.com/docs/4.17.15#toInteger)                 | ❌        |
| [toLength](https://lodash.com/docs/4.17.15#toLength)                   | ❌        |
| [toNumber](https://lodash.com/docs/4.17.15#toNumber)                   | ❌        |
| [toPlainObject](https://lodash.com/docs/4.17.15#toPlainObject)         | ❌        |
| [toSafeInteger](https://lodash.com/docs/4.17.15#toSafeInteger)         | ❌        |
| [toString](https://lodash.com/docs/4.17.15#toString)                   | ❌        |

### "Math" 메서드

| 함수 이름                                            | 구현 상태 |
| ---------------------------------------------------- | --------- |
| [add](https://lodash.com/docs/4.17.15#add)           | ❌        |
| [ceil](https://lodash.com/docs/4.17.15#ceil)         | ❌        |
| [divide](https://lodash.com/docs/4.17.15#divide)     | ❌        |
| [floor](https://lodash.com/docs/4.17.15#floor)       | ❌        |
| [max](https://lodash.com/docs/4.17.15#max)           | ✅        |
| [maxBy](https://lodash.com/docs/4.17.15#maxBy)       | 📝        |
| [mean](https://lodash.com/docs/4.17.15#mean)         | 📝        |
| [meanBy](https://lodash.com/docs/4.17.15#meanBy)     | 📝        |
| [min](https://lodash.com/docs/4.17.15#min)           | ✅        |
| [minBy](https://lodash.com/docs/4.17.15#minBy)       | 📝        |
| [multiply](https://lodash.com/docs/4.17.15#multiply) | ❌        |
| [round](https://lodash.com/docs/4.17.15#round)       | ❌        |
| [subtract](https://lodash.com/docs/4.17.15#subtract) | ❌        |
| [sum](https://lodash.com/docs/4.17.15#sum)           | 📝        |
| [sumBy](https://lodash.com/docs/4.17.15#sumBy)       | ❌        |

### "Number" 메서드

| 함수 이름                                          | 구현 상태 |
| -------------------------------------------------- | --------- |
| [clamp](https://lodash.com/docs/4.17.15#clamp)     | 📝        |
| [inRange](https://lodash.com/docs/4.17.15#inRange) | 📝        |
| [random](https://lodash.com/docs/4.17.15#random)   | 📝        |

### "Object" 메서드

| 함수 이름                                                    | 구현 상태 |
| ------------------------------------------------------------ | --------- |
| [assign](https://lodash.com/docs/4.17.15#assign)             | ❌        |
| [assignIn](https://lodash.com/docs/4.17.15#assignIn)         | ❌        |
| [assignInWith](https://lodash.com/docs/4.17.15#assignInWith) | ❌        |
| [assignWith](https://lodash.com/docs/4.17.15#assignWith)     | ❌        |
| [at](https://lodash.com/docs/4.17.15#at)                     | ❌        |
| [create](https://lodash.com/docs/4.17.15#create)             | ❌        |
| [defaults](https://lodash.com/docs/4.17.15#defaults)         | ❌        |
| [defaultsDeep](https://lodash.com/docs/4.17.15#defaultsDeep) | ❌        |
| [findKey](https://lodash.com/docs/4.17.15#findKey)           | ❌        |
| [findLastKey](https://lodash.com/docs/4.17.15#findLastKey)   | ❌        |
| [forIn](https://lodash.com/docs/4.17.15#forIn)               | ❌        |
| [forInRight](https://lodash.com/docs/4.17.15#forInRight)     | ❌        |
| [forOwn](https://lodash.com/docs/4.17.15#forOwn)             | ❌        |
| [forOwnRight](https://lodash.com/docs/4.17.15#forOwnRight)   | ❌        |
| [functions](https://lodash.com/docs/4.17.15#functions)       | ❌        |
| [functionsIn](https://lodash.com/docs/4.17.15#functionsIn)   | ❌        |
| [get](https://lodash.com/docs/4.17.15#get)                   | ✅        |
| [has](https://lodash.com/docs/4.17.15#has)                   | ❌        |
| [hasIn](https://lodash.com/docs/4.17.15#hasIn)               | ❌        |
| [invert](https://lodash.com/docs/4.17.15#invert)             | ✅        |
| [invertBy](https://lodash.com/docs/4.17.15#invertBy)         | ❌        |
| [invoke](https://lodash.com/docs/4.17.15#invoke)             | ❌        |
| [keys](https://lodash.com/docs/4.17.15#keys)                 | ❌        |
| [keysIn](https://lodash.com/docs/4.17.15#keysIn)             | ❌        |
| [mapKeys](https://lodash.com/docs/4.17.15#mapKeys)           | ✅        |
| [mapValues](https://lodash.com/docs/4.17.15#mapValues)       | ❌        |
| [merge](https://lodash.com/docs/4.17.15#merge)               | ❌        |
| [mergeWith](https://lodash.com/docs/4.17.15#mergeWith)       | ❌        |
| [omit](https://lodash.com/docs/4.17.15#omit)                 | 📝        |
| [omitBy](https://lodash.com/docs/4.17.15#omitBy)             | 📝        |
| [pick](https://lodash.com/docs/4.17.15#pick)                 | 📝        |
| [pickBy](https://lodash.com/docs/4.17.15#pickBy)             | 📝        |
| [result](https://lodash.com/docs/4.17.15#result)             | ❌        |
| [set](https://lodash.com/docs/4.17.15#set)                   | ✅        |
| [setWith](https://lodash.com/docs/4.17.15#setWith)           | ❌        |
| [toPairs](https://lodash.com/docs/4.17.15#toPairs)           | ❌        |
| [toPairsIn](https://lodash.com/docs/4.17.15#toPairsIn)       | ❌        |
| [transform](https://lodash.com/docs/4.17.15#transform)       | ❌        |
| [unset](https://lodash.com/docs/4.17.15#unset)               | ❌        |
| [update](https://lodash.com/docs/4.17.15#update)             | ❌        |
| [updateWith](https://lodash.com/docs/4.17.15#updateWith)     | ❌        |
| [values](https://lodash.com/docs/4.17.15#values)             | ❌        |
| [valuesIn](https://lodash.com/docs/4.17.15#valuesIn)         | ❌        |

### "String" 메서드

| 함수 이름                                                    | 구현 상태 |
| ------------------------------------------------------------ | --------- |
| [camelCase](https://lodash.com/docs/4.17.15#camelCase)       | 📝        |
| [capitalize](https://lodash.com/docs/4.17.15#capitalize)     | 📝        |
| [deburr](https://lodash.com/docs/4.17.15#deburr)             | ❌        |
| [endsWith](https://lodash.com/docs/4.17.15#endsWith)         | ✅        |
| [escape](https://lodash.com/docs/4.17.15#escape)             | ❌        |
| [escapeRegExp](https://lodash.com/docs/4.17.15#escapeRegExp) | ❌        |
| [kebabCase](https://lodash.com/docs/4.17.15#kebabCase)       | 📝        |
| [lowerCase](https://lodash.com/docs/4.17.15#lowerCase)       | 📝        |
| [lowerFirst](https://lodash.com/docs/4.17.15#lowerFirst)     | ❌        |
| [pad](https://lodash.com/docs/4.17.15#pad)                   | ❌        |
| [padEnd](https://lodash.com/docs/4.17.15#padEnd)             | ❌        |
| [padStart](https://lodash.com/docs/4.17.15#padStart)         | ❌        |
| [parseInt](https://lodash.com/docs/4.17.15#parseInt)         | ❌        |
| [repeat](https://lodash.com/docs/4.17.15#repeat)             | ❌        |
| [replace](https://lodash.com/docs/4.17.15#replace)           | ❌        |
| [snakeCase](https://lodash.com/docs/4.17.15#snakeCase)       | 📝        |
| [split](https://lodash.com/docs/4.17.15#split)               | ❌        |
| [startCase](https://lodash.com/docs/4.17.15#startCase)       | ❌        |
| [startsWith](https://lodash.com/docs/4.17.15#startsWith)     | ✅        |
| [template](https://lodash.com/docs/4.17.15#template)         | ❌        |
| [toLower](https://lodash.com/docs/4.17.15#toLower)           | ❌        |
| [toUpper](https://lodash.com/docs/4.17.15#toUpper)           | ❌        |
| [trim](https://lodash.com/docs/4.17.15#trim)                 | ❌        |
| [trimEnd](https://lodash.com/docs/4.17.15#trimEnd)           | ❌        |
| [trimStart](https://lodash.com/docs/4.17.15#trimStart)       | ❌        |
| [truncate](https://lodash.com/docs/4.17.15#truncate)         | ❌        |
| [unescape](https://lodash.com/docs/4.17.15#unescape)         | ❌        |
| [upperCase](https://lodash.com/docs/4.17.15#upperCase)       | 📝        |
| [upperFirst](https://lodash.com/docs/4.17.15#upperFirst)     | 📝        |
| [words](https://lodash.com/docs/4.17.15#words)               | ❌        |

### "Util" 메서드

| 함수 이름                                                          | 구현 상태     |
| ------------------------------------------------------------------ | ------------- |
| [attempt](https://lodash.com/docs/4.17.15#attempt)                 | ❌            |
| [bindAll](https://lodash.com/docs/4.17.15#bindAll)                 | ❌            |
| [cond](https://lodash.com/docs/4.17.15#cond)                       | ❌            |
| [confirms](https://lodash.com/docs/4.17.15#confirms)               | ❌            |
| [constant](https://lodash.com/docs/4.17.15#constant)               | ❌            |
| [defaultTo](https://lodash.com/docs/4.17.15#defaultTo)             | ❌            |
| [flow](https://lodash.com/docs/4.17.15#flow)                       | ❌            |
| [flowRight](https://lodash.com/docs/4.17.15#flowRight)             | ❌            |
| [identity](https://lodash.com/docs/4.17.15#identity)               | 📝            |
| [iteratee](https://lodash.com/docs/4.17.15#iteratee)               | ❌            |
| [matches](https://lodash.com/docs/4.17.15#matches)                 | ✅            |
| [matchesProperty](https://lodash.com/docs/4.17.15#matchesProperty) | ❌            |
| [method](https://lodash.com/docs/4.17.15#method)                   | ❌            |
| [methodOf](https://lodash.com/docs/4.17.15#methodOf)               | ❌            |
| [mixin](https://lodash.com/docs/4.17.15#mixin)                     | 지원하지 않음 |
| [noConflict](https://lodash.com/docs/4.17.15#noConflict)           | 지원하지 않음 |
| [noop](https://lodash.com/docs/4.17.15#noop)                       | ❌            |
| [nthArg](https://lodash.com/docs/4.17.15#nthArg)                   | ❌            |
| [over](https://lodash.com/docs/4.17.15#over)                       | ❌            |
| [overEvery](https://lodash.com/docs/4.17.15#overEvery)             | ❌            |
| [overSome](https://lodash.com/docs/4.17.15#overSome)               | ❌            |
| [property](https://lodash.com/docs/4.17.15#property)               | ✅            |
| [propertyOf](https://lodash.com/docs/4.17.15#propertyOf)           | ❌            |
| [range](https://lodash.com/docs/4.17.15#range)                     | 📝            |
| [rangeRight](https://lodash.com/docs/4.17.15#rangeRight)           | 📝            |
| [runInContext](https://lodash.com/docs/4.17.15#runInContext)       | 지원하지 않음 |
| [stubArray](https://lodash.com/docs/4.17.15#stubArray)             | ❌            |
| [stubFalse](https://lodash.com/docs/4.17.15#stubFalse)             | ❌            |
| [stubObject](https://lodash.com/docs/4.17.15#stubObject)           | ❌            |
| [stubString](https://lodash.com/docs/4.17.15#stubString)           | ❌            |
| [stubTrue](https://lodash.com/docs/4.17.15#stubTrue)               | ❌            |
| [times](https://lodash.com/docs/4.17.15#times)                     | ❌            |
| [toPath](https://lodash.com/docs/4.17.15#toPath)                   | ❌            |
| [uniqueId](https://lodash.com/docs/4.17.15#uniqueId)               | ❌            |
