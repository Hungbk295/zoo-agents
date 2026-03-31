---
name: budget-realloc
description: Phân bổ lại budget giữa các campaigns/ad sets dựa trên performance data. Trigger khi task liên quan đến budget allocation, spend optimization.
allowed-tools: Read, Write
---

## Steps
1. Đọc RD để biết total budget, platforms, constraints
2. Thu thập current spend + performance per campaign
3. Tính efficiency (CPA, ROAS) per campaign
4. Đề xuất reallocation: tăng budget cho high-perform, giảm cho low-perform
5. Output: allocation table + rationale
