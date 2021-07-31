#!/bin/sh

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" \
--output $GITHUB_WORKSPACE/client/cypress.env.json $GITHUB_WORKSPACE/client/cypress.env.json.gpg