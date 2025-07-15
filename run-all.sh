#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Running all lint and format commands...${NC}"
echo ""

# Function to run commands in a directory
run_commands() {
    local dir=$1
    local name=$2

    echo -e "${YELLOW}=== $name ===${NC}"
    cd "$dir"

    echo -e "${BLUE}Running ESLint...${NC}"
    if npm run lint; then
        echo -e "${GREEN}✓ ESLint passed in $name${NC}"
    else
        echo -e "${RED}✗ ESLint failed in $name${NC}"
    fi

    echo -e "${BLUE}Running Prettier format...${NC}"
    if npm run format; then
        echo -e "${GREEN}✓ Prettier formatted $name${NC}"
    else
        echo -e "${RED}✗ Prettier failed in $name${NC}"
    fi

    echo ""
}

# Run commands for both projects
run_commands "tool" "Tool Project"
run_commands "testProject" "Test Project"

echo -e "${GREEN}All commands completed!${NC}"