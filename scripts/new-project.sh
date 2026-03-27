#!/usr/bin/env bash
set -euo pipefail

# Zoo — New Project Scaffold
# Usage: ./new-project.sh <slug> <display_name> <pm_name> <scope>
# Example: ./new-project.sh analytics "Analytics Dashboard" "Analytics PM" "Data analytics, dashboards, BI reporting"

if [ $# -lt 4 ]; then
  echo "Usage: $0 <slug> <display_name> <pm_name> <scope>"
  echo "Example: $0 analytics \"Analytics Dashboard\" \"Analytics PM\" \"Data analytics and BI\""
  exit 1
fi

SLUG="$1"
DISPLAY_NAME="$2"
PM_NAME="$3"
SCOPE="$4"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATE_DIR="$BASE_DIR/_templates/project_template"
PROJECT_DIR="$BASE_DIR/projects/$SLUG"

if [ -d "$PROJECT_DIR" ]; then
  echo "Error: Project '$SLUG' already exists at $PROJECT_DIR"
  exit 1
fi

echo "Creating project: $DISPLAY_NAME ($SLUG)"

# Copy template
cp -r "$TEMPLATE_DIR" "$PROJECT_DIR"

# Create subdirectories
mkdir -p "$PROJECT_DIR/rds/completed"
mkdir -p "$PROJECT_DIR/output"
mkdir -p "$PROJECT_DIR/skills"

# Replace placeholders in all files
find "$PROJECT_DIR" -type f | while read -r file; do
  sed -i '' "s/{{PROJECT_SLUG}}/$SLUG/g" "$file"
  sed -i '' "s/{{PROJECT_NAME}}/$DISPLAY_NAME/g" "$file"
  sed -i '' "s/{{PM_NAME}}/$PM_NAME/g" "$file"
  sed -i '' "s/{{SCOPE}}/$SCOPE/g" "$file"
done

# Create AGENTS.md
echo "@CLAUDE.md" > "$PROJECT_DIR/AGENTS.md"

echo ""
echo "Project '$SLUG' created at $PROJECT_DIR"
echo ""
echo "Next steps:"
echo "  1. Edit $PROJECT_DIR/config.yaml — fill in Jira/Slack/Git details"
echo "  2. Add routing keywords to $BASE_DIR/CLAUDE.md routing table"
echo "  3. Create your first RD in $PROJECT_DIR/rds/"
echo "  4. Run /start to begin working"
