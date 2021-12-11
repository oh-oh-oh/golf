#!/bin/sh
tsn="node -r ts-node/register/transpile-only"

$tsn ./codegen/env.ts
echo "🚀 Generated environment variable types.."
