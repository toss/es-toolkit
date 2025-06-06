#!/bin/sh

# Function to create root exports
create_root_export() {
    local name=$1
    echo "export * from './dist/$name';" > $name.d.ts
    echo "module.exports = require('./dist/$name');" > $name.js
}

# Function to create compat exports
create_compat_export() {
    local category=$1
    local name=$2
    echo "module.exports = require('../dist/compat/$category/$name.js').$name;" > compat/$name.js
    echo "export { $name as default } from '../dist/compat/$category/$name.js';" > compat/$name.d.ts
}

# Function to create compat alias
create_compat_alias() {
    local category=$1
    local original=$2
    local alias=$3
    echo "module.exports = require('../dist/compat/$category/$original.js').$original;" > compat/$alias.js
    echo "export { $original as default } from '../dist/compat/$category/$original.js';" > compat/$alias.d.ts
}

# Create root exports
for module in array error compat function math object predicate promise string util; do
    create_root_export $module
done

# Create compat directory
mkdir -p compat

# Array functions
for func in castArray chunk compact countBy concat difference differenceBy differenceWith drop dropRight dropRightWhile dropWhile every fill filter find findIndex findLast findLastIndex flatMap flatMapDeep flatMapDepth flatten flattenDeep flattenDepth forEach forEachRight groupBy head includes indexOf initial intersection intersectionBy intersectionWith invokeMap join keyBy last lastIndexOf map nth orderBy partition pull pullAll pullAllBy pullAllWith pullAt reduce reduceRight reject remove reverse sample sampleSize shuffle size slice some sortBy sortedIndex sortedIndexBy sortedIndexOf sortedLastIndex sortedLastIndexBy sortedLastIndexOf tail take takeRight takeRightWhile takeWhile union unionBy unionWith uniq uniqBy uniqWith unzip unzipWith without xor xorBy xorWith zip zipObject zipObjectDeep zipWith; do
    create_compat_export "array" "$func"
done

# Function functions
for func in after ary attempt before bind bindKey curry curryRight debounce DebouncedFunction DebouncedFunc defer delay flip flow flowRight memoize negate nthArg once overArgs partial partialRight rearg rest spread throttle unary wrap; do
    create_compat_export "function" "$func"
done

# Math functions
for func in add ceil clamp divide floor inRange max maxBy mean meanBy min minBy multiply parseInt random range rangeRight round subtract sum sumBy; do
    create_compat_export "math" "$func"
done

# Object functions
for func in assign assignIn assignInWith assignWith at clone cloneDeep cloneDeepWith cloneWith identity create defaults defaultsDeep findKey findLastKey forIn forInRight forOwn forOwnRight fromPairs functions functionsIn get has hasIn invert invertBy isEqual isFunction isLength isMatchWith isNative isNull isUndefined keys keysIn mapKeys mapValues merge mergeWith noop omit omitBy pick pickBy property propertyOf result set setWith toDefaulted toPairs toPairsIn transform unset update updateWith values valuesIn; do
    create_compat_export "object" "$func"
done

# String functions
for func in capitalize camelCase deburr endsWith escape escapeRegExp kebabCase lowerCase lowerFirst pad padEnd padStart repeat replace snakeCase split startCase startsWith template templateSettings toLower toUpper trim trimEnd trimStart truncate unescape upperCase upperFirst words; do
    create_compat_export "string" "$func"
done

# Predicate functions
for func in conforms conformsTo isArguments isArray isArrayBuffer isArrayLike isArrayLikeObject isBoolean isBuffer isDate isElement isEmpty isEqualWith isError isFinite isInteger isMap isMatch isNaN isNil isNumber isObject isObjectLike isPlainObject isRegExp isSafeInteger isSet isString isSymbol isTypedArray isWeakMap isWeakSet matches matchesProperty; do
    create_compat_export "predicate" "$func"
done

# Util functions
for func in bindAll cond constant defaultTo eq gt gte invoke iteratee lt lte method methodOf now over overEvery overSome stubArray stubFalse stubObject stubString stubTrue times toArray toFinite toInteger toLength toNumber toPath toPlainObject toSafeInteger toString uniqueId; do
    create_compat_export "util" "$func"
done

# Create aliases
create_compat_alias "array" "forEach" "each"
create_compat_alias "array" "forEachRight" "eachRight" 
create_compat_alias "array" "head" "first"
create_compat_alias "object" "assignIn" "extend"
create_compat_alias "object" "assignInWith" "extendWith"