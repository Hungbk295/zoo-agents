#!/bin/bash
# PostToolUse hook: validate JSON files after Edit/Write
# Reads tool input from stdin, checks if file is .json, validates it

FILE=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)

if [ -z "$FILE" ]; then
  echo '{"continue":true}'
  exit 0
fi

if ! echo "$FILE" | grep -qE '\.json$'; then
  echo '{"continue":true}'
  exit 0
fi

if python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$FILE" 2>/tmp/zoo-json-hook.err; then
  echo '{"continue":true}'
else
  ERR=$(tail -1 /tmp/zoo-json-hook.err)
  echo "{\"continue\":false,\"stopReason\":\"Invalid JSON in $FILE: $ERR\"}"
fi
