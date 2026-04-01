# A2A LAN — Agent-to-Agent Chat trên LAN

> Ngày tạo: 2026-04-01
> Status: Ideation → Research done → Ready to design

---

## 1. Idea (clear version)

Trong công ty, mỗi người dùng agent riêng (Claude Code, Cursor, hoặc bất kỳ tool nào có MCP). Tôi muốn build một MCP server để các agent có thể connect và chat trực tiếp với nhau trên mạng LAN.

**Flow cốt lõi:**

```
Human A ra lệnh Agent A gửi câu hỏi
  → MCP Server nhận message, relay sang phía B
    → Human B thấy request, approve, chỉ Agent B tìm câu trả lời
      → Agent B gửi response qua MCP Server
        → Human A approve, cho Agent A đọc response
```

**3 nguyên tắc không đổi:**

1. Human-in-the-loop ở CẢ HAI đầu — mọi message phải được human approve trước khi gửi/nhận
2. Connection on-demand — Agent A "gõ cửa" Agent B, không cần pre-configure
3. LAN-native — không cần cloud, không cần infra phức tạp

---

## 2. Landscape — Cái gì đã tồn tại

### Tương tự nhưng khác

| Project | Mô tả | Thiếu gì so với idea |
|---|---|---|
| **agent-comms-mcp** (Mavericky007) | Direct message giữa agents, channel broadcasting, mailbox 24h TTL, web dashboard | Không có human approval, không có connection request |
| **agent-collab-mcp** (dolores-r2d2) | Task management với state machine, review loops, dashboard. Cho Cursor + Claude Code | Task queue chứ không phải chat. Không có direct messaging |
| **MCP Agent Mail** (Dicklesworthstone) | Async coordination, inbox, searchable threads, git-backed | Async work coordination, không phải real-time conversation |
| **agents-council** (MrLesk) | Agent-to-agent feedback, "summon" feature | Feedback collection, không phải general messaging |

### Khác hoàn toàn

| Project | Mô tả | Tại sao không phải cùng idea |
|---|---|---|
| **Mem0 MCP** | Shared memory layer — agents cùng đọc/ghi một kho nhớ chung | Không có chat, không có connection, không có human gate. Agent A ghi memory → Agent B đọc memory, nhưng hai agent không bao giờ nói chuyện trực tiếp |
| **A2A Protocol** (Google) | Enterprise protocol cho agent-to-agent qua internet | Quá nặng cho LAN, không có human-in-the-loop |
| **AMP** (Agent Messaging Protocol) | Federated, cryptographic, local-first | Protocol-level, không tích hợp sẵn Claude Code/Cursor |

### Kết luận landscape

Chưa ai build đúng cái tôi muốn. 3 điểm unique:

1. **Human-gated connection request** — chưa project nào có
2. **Per-message human approval cả hai đầu** — chưa project nào có
3. **Ad-hoc peer-to-peer trên LAN** — connect on-demand, không pre-configure

**agent-comms-mcp** là starting point gần nhất nếu muốn fork.

---

## 3. Kiến thức cần học

### MCP Protocol

- [ ] MCP specification — hiểu transport layer (stdio vs SSE vs streamable HTTP)
- [ ] Cách build MCP server (TypeScript SDK hoặc Python SDK)
- [ ] Cách MCP client hoạt động trong Claude Code và Cursor
- [ ] MCP Elicitation — cơ chế để server yêu cầu human input (dùng cho approval flow)

**Tài liệu:**
- https://modelcontextprotocol.io/docs
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/python-sdk

### Networking trên LAN

- [ ] mDNS / Bonjour — auto-discovery agents trên cùng network
- [ ] HTTP server basics (FastAPI hoặc Express)
- [ ] WebSocket hoặc SSE cho real-time notification (optional, polling đủ cho v1)

### Các project nên đọc source code

- [ ] **agent-comms-mcp** — xem cách implement messaging giữa agents
  - GitHub: https://github.com/Mavericky007/agent-comms-mcp
- [ ] **agent-collab-mcp** — xem cách implement review/approval flow
  - GitHub: https://github.com/dolores-r2d2/agent-collab-mcp
- [ ] **MCP Agent Mail** — xem cách implement inbox + thread pattern
  - GitHub: https://github.com/Dicklesworthstone/mcp_agent_mail

### Concepts cần nắm

- [ ] Message queue patterns: inbox, ack, retry, TTL
- [ ] State machine cho connection lifecycle (pending → connected → closed)
- [ ] State machine cho message lifecycle (drafted → sent → delivered → read → responded)
- [ ] File locking (fcntl) nếu dùng file-based storage
- [ ] SQLite cho persistence (nhẹ, không cần setup)

---

## 4. Giải pháp đề xuất

### Kiến trúc

```
┌──────────────────────────────────────────┐
│          MCP Server (LAN, port 8900)     │
│                                          │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │ Connections  │  │    Messages      │   │
│  │   Manager    │  │     Store        │   │
│  └─────────────┘  └──────────────────┘   │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │   Agent      │  │   Append-only    │   │
│  │  Registry    │  │     Log          │   │
│  └─────────────┘  └──────────────────┘   │
│                                          │
│  Transport: stdio (local) + HTTP (LAN)   │
│  Storage: SQLite                         │
└────────┬───────────────────┬─────────────┘
         │                   │
    Agent A (MCP)       Agent B (MCP)
    Claude Code         Cursor
    Human A approves    Human B approves
```

### MCP Tools (agent-facing)

```
# Discovery
discover_agents()
  → trả về danh sách agents online trên LAN

# Connection
request_connection(target_agent_id, reason)
  → gửi connection request, chờ human bên kia approve

accept_connection(request_id)
  → human approve connection request

reject_connection(request_id)
  → human reject

list_pending_requests()
  → xem ai đang muốn connect

# Messaging (chỉ hoạt động khi đã connected)
send_message(connection_id, content, attachments?)
  → draft message, chờ human approve trước khi gửi thật

get_messages(connection_id)
  → xem messages đã được human approve cho đọc

approve_outgoing(message_id)
  → human confirm gửi message đi

approve_incoming(message_id)
  → human confirm cho agent đọc message đến

# Session
close_connection(connection_id)
  → đóng conversation
```

### Message schema

```json
{
  "id": "msg-001",
  "connection_id": "conn-abc",
  "from": "agent-A",
  "to": "agent-B",
  "content": "Codebase bên bạn handle auth bằng gì?",
  "attachments": [],
  "status": "pending_sender_approval",
  "created_at": "2026-04-01T10:00:00Z"
}
```

**Status flow của message:**

```
drafted
  → pending_sender_approval    (chờ Human A approve gửi)
    → sent                     (đã gửi qua server)
      → pending_receiver_approval  (chờ Human B approve cho Agent B đọc)
        → delivered            (Agent B đã đọc)
```

### Connection schema

```json
{
  "id": "conn-abc",
  "requester": "agent-A",
  "target": "agent-B",
  "reason": "Cần hỏi về auth module",
  "status": "pending",
  "created_at": "2026-04-01T10:00:00Z"
}
```

**Status flow của connection:**

```
pending → accepted → active → closed
                  ↘ rejected
```

---

## 5. Phân pha thực hiện

### Phase 1 — MVP (1-2 tuần)

Mục tiêu: 2 agent chat được với nhau qua MCP server trên cùng máy.

- [ ] MCP server cơ bản (TypeScript hoặc Python)
- [ ] Agent registry (hardcode trong config)
- [ ] Connection request + accept/reject
- [ ] Send message + receive message
- [ ] Human approval ở cả hai đầu (dùng MCP elicitation hoặc CLI prompt)
- [ ] SQLite storage
- [ ] Test: Claude Code ↔ Claude Code trên cùng máy

### Phase 2 — LAN (1 tuần)

Mục tiêu: agents trên các máy khác nhau trong LAN connect được.

- [ ] HTTP transport layer (thêm REST API song song MCP)
- [ ] mDNS discovery (tự tìm agents trên LAN)
- [ ] Test: Claude Code máy A ↔ Cursor máy B

### Phase 3 — UX + Production (1-2 tuần)

Mục tiêu: dùng được trong team thật.

- [ ] Web dashboard (xem connections, messages, approve/reject)
- [ ] Notification khi có request mới (terminal bell hoặc OS notification)
- [ ] Attachments (gửi file, code snippet)
- [ ] Message history + search
- [ ] Connection timeout + auto-cleanup

### Phase 4 — Nâng cao (tùy nhu cầu)

- [ ] Group chat (3+ agents)
- [ ] Channel broadcasting (giống Slack channels)
- [ ] Smart routing ("gửi cho ai biết về auth")
- [ ] Persistent context store (tích hợp Mem0 làm memory layer)
- [ ] End-to-end encryption

---

## 6. Rủi ro và cách xử lý

| Rủi ro | Xác suất | Giải pháp |
|---|---|---|
| Human approval tạo quá nhiều friction → không ai muốn dùng | Cao | Phase 3: batch approve, trust levels (agent đã connect nhiều lần → auto-approve) |
| MCP elicitation không đủ mạnh cho approval flow | Trung bình | Fallback: CLI prompt hoặc web dashboard để approve |
| Agent crash giữa conversation | Trung bình | Server giữ state, agent reconnect thì resume conversation |
| Race condition khi nhiều agent cùng gửi | Thấp (5-10 agents) | SQLite serialized writes là đủ |

---

## 7. Tech stack gợi ý

| Component | Lựa chọn | Lý do |
|---|---|---|
| MCP Server | TypeScript (MCP TS SDK) | SDK mature nhất, Claude Code dùng TS |
| HTTP Server | Express hoặc Fastify | Nhẹ, quen thuộc, dễ thêm REST API |
| Storage | SQLite (better-sqlite3) | Zero config, đủ cho 5-10 agents |
| Discovery | mDNS (bonjour-service npm) | Auto-discover trên LAN |
| Dashboard | React + Vite (optional) | Phase 3 mới cần |
