FUNC=$1

find ./src -name "$1.ts" -maxdepth 2 -exec sh -c 'mkdir -p "./src/fp/$(dirname "{}" | sed "s|^./src/||")" && cp "{}" "./src/fp/$(dirname "{}" | sed "s|^./src/||")/"' \;
FP_FILENAME=$(find ./src/fp -name "$1.ts")
yarn jscodeshift -t ./.scripts/fp/toPipable.ts $FP_FILENAME
yarn prettier --write $FP_FILENAME