#!/bin/bash

SWAGGER_JSON_ADDRESS=$1

npx openapi-typescript $SWAGGER_JSON_ADDRESS --output libs/swaggen/src/swagger-paths.ts