# Plan: SSE Realtime UI Update

## Problem
Khi Zoo update data.json (tạo task, đổi status), UI Kanban không tự cập nhật — phải refresh tay.

## Solution: SSE + Notify Endpoint
Server-Sent Events — server giữ kết nối mở, push event khi có thay đổi.

## Changes

### 1. Server (`ui/server.py`)

**Thêm SSE endpoint `/api/events`:**
- Giữ danh sách connected clients (queue per client)
- Khi client connect → thêm vào list, stream events
- Khi client disconnect → remove khỏi list

**Thêm notify endpoint `POST /api/notify`:**
- Nhận POST request → push event "data-changed" tới tất cả connected clients
- Không cần body, chỉ cần trigger

```python
import queue
import threading

clients = []
clients_lock = threading.Lock()

@app.route("/api/events")
def sse_events():
    q = queue.Queue()
    with clients_lock:
        clients.append(q)
    def stream():
        try:
            while True:
                data = q.get()
                yield f"data: {data}\n\n"
        except GeneratorExit:
            with clients_lock:
                clients.remove(q)
    return app.response_class(stream(), mimetype="text/event-stream")

@app.route("/api/notify", methods=["POST"])
def notify_clients():
    with clients_lock:
        for q in clients:
            q.put("data-changed")
    return jsonify({"status": "ok"})
```

### 2. UI (`ui/index.html`)

**Thêm SSE listener sau boot():**
```javascript
const evtSource = new EventSource(`${API}/events`);
evtSource.onmessage = async (event) => {
  if (event.data === "data-changed") {
    const dataRes = await fetch(`${API}/data`);
    allData = await dataRes.json();
    renderBoard();
  }
};
```

### 3. Zoo Workflow

Sau mỗi lần update data.json, thêm 1 bước:
```bash
curl -X POST http://localhost:8765/api/notify
```

Hoặc wrap thành helper function trong Zoo scripts.

## Ưu điểm
- Zero polling, zero waste traffic
- Realtime (< 100ms delay)
- Không thêm dependency (Flask native support)
- Zoo control khi nào notify — chỉ push khi thực sự thay đổi
