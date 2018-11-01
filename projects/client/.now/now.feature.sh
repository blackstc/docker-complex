#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};

JSON=$(cat <<-EOF
{
    "name": "$CIRCLE_PROJECT_REPONAME-$CLEAN_BRANCH_NAME",
    "alias": [
        "fib-ui.$CLEAN_BRANCH_NAME"
    ]
}
EOF
)

echo $JSON > .now/now.feature.json
