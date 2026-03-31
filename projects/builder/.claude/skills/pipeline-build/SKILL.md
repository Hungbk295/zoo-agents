---
name: pipeline-build
description: Build data pipelines và MCP servers. Trigger khi task cần data pipeline, ETL, MCP integration.
allowed-tools: Read, Write, Bash(*)
---

## Steps
1. Đọc RD để biết pipeline goal, data sources, transforms, output
2. Design pipeline architecture
3. Build step by step, test each stage
4. Handle errors and edge cases
5. Output: working pipeline + config + docs trong RD
