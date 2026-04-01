# Plan: Migrate `ui/index.html` → React + Real-time Auto-Sync

## Stack & Features

| Layer | Tech | Note |
|---|---|---|
| **Auto-Sync** | **SSE (Server-Sent Events)** | Cập nhật UI tức thì khi file JSON thay đổi |
| **CSS** | **Tailwind CSS v3** | Catppuccin Latte Pink theme |
| **UI Components** | **shadcn/ui** | Radix UI base |
| **Framework** | **React 18** | Vite bundler |
| **Backend** | **Flask (Python)** | Sẽ thêm File Watcher thread |

---

## 🛰 Cơ chế Real-time Auto-Sync

Để UI tự nhận thay đổi mà không cần F5:

### 1. Phía Server (`server.py`)
Ta sẽ thêm một endpoint `/api/events` và một thread chạy ngầm:
- **File Watcher:** Kiểm tra mtime của tất cả file trong `REPOS`.
- **SSE Stream:** Khi detect thay đổi -> `yield "data: updated\n\n"`.

### 2. Phía Client (`App.jsx`)
```javascript
useEffect(() => {
  const sse = new EventSource('/api/events');
  sse.onmessage = (e) => {
    if (e.data === 'updated') {
      fetchData(); // Hàm load lại repo data
      showStatus("Data synced");
    }
  };
  return () => sse.close();
}, []);
```

---

## Phân bổ Component (shadcn)

| Giao diện gốc | shadcn/ui Component |
|---|---|
| Cột Kanban | `Card` (custom style) |
| Task Card | `Card` + `Badge` (cho Priority/Repo) |
| Modals | `Dialog` (Task chi tiết & PM Settings) |
| Scroll Area | `ScrollArea` (cho danh sách Skills/Files) |
| Buttons | `Button` (Pills filter & Settings) |
| Tooltip | `Tooltip` (Hover vào Settings button) |

---

## Cấu trúc thư mục

```
ui/
├── server.py                  # Thêm /api/events (SSE)
├── avatars/                   # Không đổi
├── requirements.txt           # Không đổi
├── vite.config.js             # proxy /api & /avatars → :8765
├── tailwind.config.js         # Catppuccin custom tokens
├── postcss.config.js
├── package.json
├── components.json            # shadcn config
└── src/
    ├── main.jsx
    ├── index.css              # Tailwind directives + vars
    ├── constants.js           # PM_ORDER, STATUSES, COLORS, PM_ICONS
    ├── api.js                 # fetch wrappers
    ├── lib/utils.js           # cn() helper
    ├── hooks/
    │   └── useZooData.js      # boot + SSE listener
    ├── components/
    │   ├── ui/                # shadcn auto-generated
    │   │   ├── button.jsx
    │   │   ├── badge.jsx
    │   │   ├── dialog.jsx
    │   │   ├── scroll-area.jsx
    │   │   └── tooltip.jsx
    │   ├── Header.jsx
    │   ├── FilterBar.jsx
    │   ├── Board/
    │   │   ├── Board.jsx
    │   │   ├── Column.jsx
    │   │   └── Card.jsx
    │   ├── TaskModal/
    │   │   ├── TaskModal.jsx
    │   │   └── TaskModalBody.jsx
    │   └── PmModal/
    │       ├── PmModal.jsx
    │       ├── PmAgentList.jsx
    │       ├── PmSkillsPanel.jsx
    │       └── PmFileItem.jsx
    └── App.jsx
```

---

## Phases thực hiện

### Phase 1 — Scaffold & SSE Server-side (≈ 20 phút)
```bash
npx -y create-vite@latest . --template react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init
npx shadcn@latest add dialog button badge scroll-area tooltip
```
- Cập nhật `server.py` thêm `/api/events` endpoint (SSE).
- Cấu hình Vite proxy `/api` và `/avatars` → `:8765`.

### Phase 2 — State & Auto-Sync Hook (≈ 15 phút)
- Viết `useZooData` hook xử lý fetch data lần đầu.
- Tích hợp `EventSource` vào hook để tự động đồng bộ.
- Quản lý `allData`, `repos`, `skillsData` tập trung tại `App.jsx`.

### Phase 3 — UI Components với Tailwind (≈ 40 phút)
- Triển khai `Header`, `FilterBar`, `Board/Column/Card` dùng Tailwind classes.
- Catppuccin token: `bg-ctp-mantle`, `text-ctp-text`, `border-ctp-surface0`, v.v.
- Tích hợp Lucide React icons thay SVG string inline.
- HTML5 DnD API giữ nguyên logic drag-and-drop.

### Phase 4 — Task Modal & PM Modal (≈ 30 phút)
- Dùng `Dialog` của shadcn làm modal container.
- Task Modal: render đầy đủ sections mới:
  - **Snapshot:** Current Focus, Latest Update, Output Snapshot
  - **RD sections:** Requirements, Approach, Plan, Execution Notes, Output, Final Summary
  - **Meta:** Task ID, Owner, Status, Phase, Ready, Priority, Updated, Source
- PM Modal: Agent List + Skills Panel + File expand/collapse.

### Phase 5 — Polish & Verify (≈ 15 phút)
- Kiểm tra feature parity với `index.html` gốc.
- Responsive: Tailwind breakpoints `xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1`.
- Verify SSE stream hoạt động đúng khi sửa `data.json`.

---

## Mapping CSS → Tailwind (Catppuccin Latte Pink)

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ctp: {
          rosewater: '#dc8a78',
          flamingo:  '#dd7878',
          pink:      '#ea76cb',
          mauve:     '#8839ef',
          red:       '#d20f39',
          maroon:    '#e64553',
          peach:     '#fe640b',
          yellow:    '#df8e1d',
          green:     '#40a02b',
          teal:      '#179299',
          sky:       '#04a5e5',
          sapphire:  '#209fb5',
          blue:      '#1e66f5',
          lavender:  '#7287fd',
          text:      '#5c4a52',
          subtext1:  '#6e5a63',
          subtext0:  '#806b74',
          overlay2:  '#937e87',
          overlay1:  '#a5919a',
          overlay0:  '#b5a3ab',
          surface2:  '#c9b8bf',
          surface1:  '#d6c8ce',
          surface0:  '#e2d6db',
          base:      '#f8f2f4',
          mantle:    '#f1e8ec',
          crust:     '#e9dde2',
        },
      },
      fontFamily: {
        sans: ['"Fira Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
    },
  },
}
```

---

## Statuses & Aliases (v2)

```js
// constants.js
export const STATUSES = ["todo", "scoped", "doing", "blocked", "done"];
export const STATUS_ALIASES = { in_progress: "doing", review: "doing" };
export const STATUS_COLORS = {
  todo:    "#b5a3ab",
  scoped:  "#ea76cb",
  doing:   "#dd7878",
  blocked: "#df8e1d",
  done:    "#40a02b",
};
export const PM_ORDER = [
  "ads", "research", "builder", "academic",
  "clare-htl-front", "albus-fe", "phuonghuyen-workspace"
];
```

---

## Vite Config

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 5173,
    proxy: {
      '/api':     { target: 'http://localhost:8765', changeOrigin: true },
      '/avatars': { target: 'http://localhost:8765', changeOrigin: true },
    },
  },
})
```

---

## Run

```bash
# Terminal 1 — Flask API + SSE
cd ui && python server.py

# Terminal 2 — Vite dev
cd ui && npm run dev
# → http://localhost:5173
```

---

## Notes

- `server.py` route `/` không cần thiết trong dev mode (Vite serve app).
- `rdSectionsCache` dùng `useRef` để tránh re-render thừa.
- DnD giữ HTML5 API như bản gốc, không cần thư viện ngoài.
- `index.html` gốc giữ nguyên trong quá trình migration để fallback.
