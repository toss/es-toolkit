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

# Define function lists
read -r -d '' FUNCTION_LISTS << 'EOF'
array:castArray chunk compact countBy concat difference differenceBy differenceWith drop dropRight dropRightWhile dropWhile every fill filter find findIndex findLast findLastIndex flatMap flatMapDeep flatMapDepth flatten flattenDeep flattenDepth forEach forEachRight groupBy head includes indexOf initial intersection intersectionBy intersectionWith invokeMap join keyBy last lastIndexOf map nth orderBy partition pull pullAll pullAllBy pullAllWith pullAt reduce reduceRight reject remove reverse sample sampleSize shuffle size slice some sortBy sortedIndex sortedIndexBy sortedIndexOf sortedLastIndex sortedLastIndexBy sortedLastIndexOf tail take takeRight takeRightWhile takeWhile union unionBy unionWith uniq uniqBy uniqWith unzip unzipWith without xor xorBy xorWith zip zipObject zipObjectDeep zipWith
function:after ary attempt before bind bindKey curry curryRight debounce DebouncedFunction DebouncedFunc defer delay flip flow flowRight memoize negate nthArg once overArgs partial partialRight rearg rest spread throttle unary wrap
math:add ceil clamp divide floor inRange max maxBy mean meanBy min minBy multiply parseInt random range rangeRight round subtract sum sumBy
object:assign assignIn assignInWith assignWith at clone cloneDeep cloneDeepWith cloneWith identity create defaults defaultsDeep findKey findLastKey forIn forInRight forOwn forOwnRight fromPairs functions functionsIn get has hasIn invert invertBy isEqual isFunction isLength isMatchWith isNative isNull isUndefined keys keysIn mapKeys mapValues merge mergeWith noop omit omitBy pick pickBy property propertyOf result set setWith toDefaulted toPairs toPairsIn transform unset update updateWith values valuesIn
string:capitalize camelCase deburr endsWith escape escapeRegExp kebabCase lowerCase lowerFirst pad padEnd padStart repeat replace snakeCase split startCase startsWith template templateSettings toLower toUpper trim trimEnd trimStart truncate unescape upperCase upperFirst words
predicate:conforms conformsTo isArguments isArray isArrayBuffer isArrayLike isArrayLikeObject isBoolean isBuffer isDate isElement isEmpty isEqualWith isError isFinite isInteger isMap isMatch isNaN isNil isNumber isObject isObjectLike isPlainObject isRegExp isSafeInteger isSet isString isSymbol isTypedArray isWeakMap isWeakSet matches matchesProperty
util:bindAll cond constant defaultTo eq gt gte invoke iteratee lt lte method methodOf now over overEvery overSome stubArray stubFalse stubObject stubString stubTrue times toArray toFinite toInteger toLength toNumber toPath toPlainObject toSafeInteger toString uniqueId
EOF

# Process each category
echo "$FUNCTION_LISTS" | while IFS=: read -r category functions; do
    [ -z "$category" ] && continue
    for func in $functions; do
        create_compat_export "$category" "$func"
    done
done

# Create aliases
create_compat_alias "array" "forEach" "each"
create_compat_alias "array" "forEachRight" "eachRight" 
create_compat_alias "array" "head" "first"
create_compat_alias "object" "assignIn" "extend"
create_compat_alias "object" "assignInWith" "extendWith"