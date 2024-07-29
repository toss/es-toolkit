#!/bin/sh

# Create root .d.ts files for package exports, for compatibility with
# TypeScript projects configured with "moduleResolution": "node10"
# (which is the default when using "module": "commonjs").
echo "export * from './dist/array';" > array.d.ts
echo "export * from './dist/compat';" > compat.d.ts
echo "export * from './dist/function';" > function.d.ts
echo "export * from './dist/math';" > math.d.ts
echo "export * from './dist/object';" > object.d.ts
echo "export * from './dist/predicate';" > predicate.d.ts
echo "export * from './dist/promise';" > promise.d.ts
echo "export * from './dist/string';" > string.d.ts
