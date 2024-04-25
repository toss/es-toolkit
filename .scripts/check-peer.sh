OUT=$(yarn | grep -E "(YN0002|YN0059|YN0060)" | grep -E $1)
if [ -z "$OUT" ]; then
  echo "No Peer Dependency Errors Found."
else
  echo "$OUT"
  echo "Some peer dependencies are incorrectly met; run yarn explain peer-requirements <hash> for details, where <hash> is the six-letter p-prefixed code"
  exit 1
fi