#!/bin/sh

# Create root .d.ts files for package exports, for compatibility with
# TypeScript projects configured with "moduleResolution": "node10"
# (which is the default when using "module": "commonjs").
echo "export * from './dist/array';" > array.d.ts
echo "module.exports = require('./dist/array');" > array.js
echo "export * from './dist/error';" > error.d.ts
echo "module.exports = require('./dist/error');" > error.js
echo "export * from './dist/compat';" > compat.d.ts
echo "module.exports = require('./dist/compat');" > compat.js
echo "export * from './dist/function';" > function.d.ts
echo "module.exports = require('./dist/function');" > function.js
echo "export * from './dist/math';" > math.d.ts
echo "module.exports = require('./dist/math');" > math.js
echo "export * from './dist/object';" > object.d.ts
echo "module.exports = require('./dist/object');" > object.js
echo "export * from './dist/predicate';" > predicate.d.ts
echo "module.exports = require('./dist/predicate');" > predicate.js
echo "export * from './dist/promise';" > promise.d.ts
echo "module.exports = require('./dist/promise');" > promise.js
echo "export * from './dist/string';" > string.d.ts
echo "module.exports = require('./dist/string');" > string.js
echo "export * from './dist/util';" > util.d.ts
echo "module.exports = require('./dist/util');" > util.js

mkdir -p compat

arrayNames="castArray chunk compact countBy concat difference differenceBy differenceWith drop dropRight dropRightWhile dropWhile every fill filter find findIndex findLast findLastIndex flatMap flatMapDeep flatMapDepth flatten flattenDeep flattenDepth forEach forEachRight groupBy head includes indexOf initial intersection intersectionBy intersectionWith invokeMap join keyBy last lastIndexOf map nth orderBy partition pull pullAll pullAllBy pullAllWith pullAt reduce reduceRight reject remove reverse sample sampleSize shuffle size slice some sortBy sortedIndex sortedIndexBy sortedIndexOf sortedLastIndex sortedLastIndexBy sortedLastIndexOf tail take takeRight takeRightWhile takeWhile union unionBy unionWith uniq uniqBy uniqWith unzip unzipWith without xor xorBy xorWith zip zipObject zipObjectDeep zipWith"

for exportedName in $arrayNames; do
    echo "module.exports = require('../dist/compat/array/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/array/$exportedName.js';" > compat/$exportedName.d.ts
done

functionNames="after ary attempt before bind bindKey curry curryRight debounce DebouncedFunction DebouncedFunc defer delay flip flow flowRight memoize negate nthArg once overArgs partial partialRight rearg rest spread throttle unary wrap"

for exportedName in $functionNames; do
    echo "module.exports = require('../dist/compat/function/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/function/$exportedName.js';" > compat/$exportedName.d.ts
done

mathNames="add ceil clamp divide floor inRange max maxBy mean meanBy min minBy multiply parseInt random range rangeRight round subtract sum sumBy"

for exportedName in $mathNames; do
    echo "module.exports = require('../dist/compat/math/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/math/$exportedName.js';" > compat/$exportedName.d.ts
done

objectNames="assign assignIn assignInWith assignWith at clone cloneDeep cloneDeepWith cloneWith identity create defaults defaultsDeep findKey findLastKey forIn forInRight forOwn forOwnRight fromPairs functions functionsIn get has hasIn invert invertBy isEqual isFunction isLength isMatchWith isNative isNull isUndefined keys keysIn mapKeys mapValues merge mergeWith noop omit omitBy pick pickBy property propertyOf result set setWith toDefaulted toPairs toPairsIn transform unset update updateWith values valuesIn"

for exportedName in $objectNames; do
    echo "module.exports = require('../dist/compat/object/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/object/$exportedName.js';" > compat/$exportedName.d.ts
done

stringNames="capitalize camelCase deburr endsWith escape escapeRegExp kebabCase lowerCase lowerFirst pad padEnd padStart repeat replace snakeCase split startCase startsWith template templateSettings toLower toUpper trim trimEnd trimStart truncate unescape upperCase upperFirst words"

for exportedName in $stringNames; do
    echo "module.exports = require('../dist/compat/string/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/string/$exportedName.js';" > compat/$exportedName.d.ts
done

predicateNames="conforms conformsTo isArguments isArray isArrayBuffer isArrayLike isArrayLikeObject isBoolean isBuffer isDate isElement isEmpty isEqualWith isError isFinite isInteger isMap isMatch isNaN isNil isNumber isObject isObjectLike isPlainObject isRegExp isSafeInteger isSet isString isSymbol isTypedArray isWeakMap isWeakSet matches matchesProperty"

for exportedName in $predicateNames; do
    echo "module.exports = require('../dist/compat/predicate/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/predicate/$exportedName.js';" > compat/$exportedName.d.ts
done

utilNames="bindAll cond constant defaultTo eq gt gte invoke iteratee lt lte method methodOf now over overEvery overSome stubArray stubFalse stubObject stubString stubTrue times toArray toFinite toInteger toLength toNumber toPath toPlainObject toSafeInteger toString uniqueId"

for exportedName in $utilNames; do
    echo "module.exports = require('../dist/compat/util/$exportedName.js').$exportedName;" > compat/$exportedName.js
    echo "export { $exportedName } from '../dist/compat/util/$exportedName.js';" > compat/$exportedName.d.ts
done


echo "module.exports = require('../dist/compat/array/forEach.js').forEach;" > compat/each.js
echo "export { forEach as each } from '../dist/compat/array/forEach.js';" > compat/each.d.ts
echo "module.exports = require('../dist/compat/array/forEachRight.js').forEachRight;" > compat/eachRight.js
echo "export { forEachRight as eachRight } from '../dist/compat/array/forEachRight.js';" > compat/eachRight.d.ts
echo "module.exports = require('../dist/compat/array/head.js').head;" > compat/first.js
echo "export { head as first } from '../dist/compat/array/head.js';" > compat/first.d.ts
echo "module.exports = require('../dist/compat/object/assignIn.js').assignIn;" > compat/extend.js
echo "export { assignIn as extend } from '../dist/compat/object/assignIn.js';" > compat/extend.d.ts
echo "module.exports = require('../dist/compat/object/assignInWith.js').assignInWith;" > compat/extendWith.js
echo "export { assignInWith as extendWith } from '../dist/compat/object/assignInWith.js';" > compat/extendWith.d.ts