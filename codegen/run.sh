#!/bin/sh
tsn="node -r ts-node/register/transpile-only"

$tsn ./codegen/env.ts
echo "🚀 Generated environment variable types.."

$tsn ./codegen/type-graphql.ts
echo "🚀 Generated type-graphql decorators..."

rm -rf client/**/__generated__/*.ts
npx ts-graphql-plugin typegen
echo "🚀 Generated typed gql queries...."

$tsn ./codegen/ts-graphql-group-type-files.ts
echo "🚀 Consolidated gql type files....."
