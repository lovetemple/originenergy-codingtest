#!/bin/bash
# Load NVM and use the correct Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Use the Node.js version specified in .nvmrc or the current version
if [ -f .nvmrc ]; then
  nvm use
else
  nvm use node
fi

# Run the actual node command with all passed arguments
exec node "$@"