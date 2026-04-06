---
name: my-coding-style
description: "Coding style guide ca nhan cua JC: review code theo style, suggest fix, va tu evolve them pattern moi. Apply khi viet bat ky code nao trong Albus FE."
user_invocable: true
---

# JC's Coding Style Guide

## Workflow

Skill nay co 2 mode hoat dong:

### Mode 1: REVIEW (khi user chi dinh review 1 doan code / file)

**Buoc 1 — Scan & Report**
Doc code duoc chi dinh. So sanh voi tat ca rules trong skill nay. Xuat report theo format:

```
## Style Review: [file/component name]

### Vi pham
| # | Rule | Line | Hien tai | Nen la |
|---|------|------|----------|--------|
| 1 | Hook Order (#2) | L15 | `handleClick` truoc `useAppSelector` | Di chuyen selector len truoc handler |
| 2 | Naming (#3) | L8 | `interface FormProps` | `interface IFormProps` |

### OK ✓
- Component structure: function declaration ✓
- Import organization ✓
- ...

### Suggestion (khong vi pham, nhung co the tinh gon hon)
- L42: `switch` co the thay bang mapped object (Rule #11)
```

**Buoc 2 — User confirm**
Doi user confirm: "fix", "fix #1 #3", "ok", hoac gop y khac.

**Buoc 3 — Apply fixes**
Ap dung cac fix duoc confirm. Chi sua nhung gi user dong y.

**Buoc 4 — Pattern Discovery (TU DONG sau moi review)**
Sau khi fix xong, tu dong kiem tra:

1. Trong code vua review, co pattern nao **tot** (JC da viet) ma **chua co trong skill rules** khong?
2. Co pattern nao **xau** (JC da sua / user yeu cau tranh) ma **chua co trong Anti-Patterns** khong?

Neu tim thay, xuat:

```
## 🔍 Pattern Discovery

### Pattern moi phat hien (chua co trong skill):
1. **[Ten pattern]**: [Mo ta ngan]
   - Vi du tu code: `[code snippet]`
   - De xuat: Them vao Section [#] / Tao section moi

### Anti-pattern moi phat hien:
1. **[Ten anti-pattern]**: [Mo ta]
   - Vi du: `[bad code]` → `[good code]`
   - De xuat: Them vao Section #13 Anti-Patterns

> Confirm "add" de them vao skill, "skip" de bo qua.
```

Khi user confirm "add":
- Doc lai file SKILL.md hien tai
- Them pattern/anti-pattern vao dung section
- Giu format nhat quan (DO/AVOID, code examples)
- Thong bao da cap nhat

### Mode 2: WRITE (khi user yeu cau viet code moi)

Ap dung **tat ca** rules duoi day vao code dang viet. Khong can xuat report, chi viet code dung style.

---

## 1. Component Structure

### DO: Function declaration cho top-level component
```tsx
function CreateAirlineProfile() {
  // hooks
  // state
  // handlers
  // effects
  return <div>...</div>;
}

export default CreateAirlineProfile;
```

### DO: Arrow function cho sub-component nhan props
```tsx
const ModifyRouteForm = (props: IRouteFormProps) => {
  const { hidden = false, form, formType } = props;
  // ...
};
```

### AVOID: Arrow function cho top-level page component
```tsx
// BAD
const CreateAirlineProfile = () => { ... };
export default CreateAirlineProfile;
```

### AVOID: Inline export default
```tsx
// BAD
export default function CreateAirlineProfile() { ... }
```

---

## 2. Hook Order (trong component)

Luon theo thu tu:
```tsx
function MyComponent() {
  // 1. Router hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // 2. Redux
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSomeData);

  // 3. Form
  const [form] = Form.useForm();
  const watchedField = Form.useWatch("fieldName", form);

  // 4. Local state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DynamicKeyObject | null>(null);

  // 5. Refs
  const tableRef = useRef<any>(null);

  // 6. Derived/Computed (useMemo)
  const options = useMemo(() => [...], [deps]);

  // 7. Callbacks (useCallback)
  const handleSearch = useCallback(() => { ... }, [deps]);

  // 8. Effects (useEffect)
  useEffect(() => { ... }, [deps]);

  // 9. Handler functions (khong can useCallback neu don gian)
  const handleSubmit = async () => { ... };

  // 10. Return JSX
  return <div>...</div>;
}
```

### AVOID: Xao tron hooks va handlers
```tsx
// BAD - handler nam giua cac hooks
const [form] = Form.useForm();
const handleClick = () => { ... }; // handler o giua
const data = useAppSelector(selectData); // selector sau handler
```

---

## 3. Naming Conventions

### Variables & State
| Pattern | Prefix | Example |
|---------|--------|---------|
| Boolean state | `is*` | `isModifyRoute`, `isScrolled` |
| Selected item | `selected*` | `selectedRoute`, `selectedAirlines` |
| List data | `*List` | `airlineList`, `accountList` |
| Converted data | `*Convert` | `airlineListConvert` |

### Functions
| Pattern | Prefix | Example |
|---------|--------|---------|
| Event handler | `handle*` | `handleSearchData`, `handleClickRow` |
| Callback prop | `on*` | `onRetrieve`, `onChangeFormType` |
| Redux action | `action*` | `actionGetAirlineList` |
| Redux selector | `select*` | `selectAirlineProfileDetail` |

### Constants
```tsx
// UPPER_SNAKE_CASE cho constants
const DEFAULT_PAGE_SIZE = 20;
const EMPTY_ROUTE_IDX = "-";
const INIT_FORM_DATA = { period: [...], agencyId: "ALL" };

// Mapped objects cho enum lookups
const MAPPED_ROUTE_FORM_TITLE: DynamicKeyObject = {
  [ERouteSettingForm.ADD]: "Add route",
  [ERouteSettingForm.UPDATE]: "Update route",
};

const MAPPED_L2B_STATUS_TAG: Record<string, ETagType> = {
  WARNING: ETagType.INACTIVE,
  OK: ETagType.ACTIVE,
};
```

### TypeScript
```tsx
// Interface: prefix I
interface IRouteFormProps { ... }
interface IL2BAlertRibbonProps { ... }

// Type alias: prefix T (cho component prop extensions)
type TCustomButtonProps = ButtonProps & { theme?: "primary" };

// Enum: prefix E
enum ERouteSettingForm { ADD, UPDATE, SEARCH }
```

### IMPORTANT: Prefix I/T/E CHI dung cho ten TYPE, KHONG dung cho ten bien/state
```tsx
// GOOD - Interface co prefix I, nhung state/setter giu ten binh thuong
interface ICityOption { label: string; value: string; }
const [cityOptions, setCityOptions] = useState<ICityOption[]>([]);

// BAD - prefix I lot vao ten setter
const [cityOptions, setICityOptions] = useState<ICityOption[]>([]); // SAI!
```
> **Rule**: Khi dung replace_all de rename type, KHONG duoc anh huong den ten bien, setter, handler co chua substring trung. Prefix `I`/`T`/`E` chi ap dung cho **khai bao type** (interface, type, enum), KHONG ap dung cho runtime identifiers (variables, functions, parameters).

### AVOID: Naming khong nhat quan
```tsx
// BAD - thieu prefix
interface RouteFormProps { ... }  // thieu I
type buttonProps = { ... };       // thieu T, lowercase
const getAirlineList = createAsyncThunk(...); // thieu action prefix
```

---

## 4. Import Organization

Nhom theo thu tu, cach nhau 1 dong trong:
```tsx
// 1. External libraries
import { Col, Form, Row } from "antd";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

// 2. Common components
import CustomButton from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import RequiredLabel from "@/app/components/common/RequiredLabel";

// 3. Constants
import { API_URL_TYPE } from "@/constants/apiUrl";
import { YN_ACTIVE_OPTIONS } from "@/constants/options";

// 4. Interfaces
import { DynamicKeyObject, EModalMode, ENotificationType } from "@/interfaces/app";

// 5. Store (Redux)
import { useAppDispatch, useAppSelector } from "@/store";
import { actionGetAirlineList, selectAirlineList } from "@/store/common";

// 6. Utils
import { getApiUrl } from "@/utils/app";
import { notify, pageLoading } from "@/utils/appStateHandle";
import request from "@/utils/request";
```

### AVOID: Import khong co thu tu
```tsx
// BAD - mix het
import request from "@/utils/request";
import { Col } from "antd";
import { useAppDispatch } from "@/store";
import dayjs from "dayjs";
import CustomButton from "@/app/components/common/Button";
```

---

## 5. API Call Pattern

### DO: request + then/catch/finally chain
```tsx
const handleSubmit = async () => {
  const values = await getValidatedAntdFormValues(form);
  if (!values) return;

  pageLoading.on();
  const payload = { ... };

  request({
    url: getApiUrl(API_URL_TYPE.MODULE.FEATURE.ACTION),
    method: "POST",
    data: payload,
  })
    .then(() => {
      notify({
        message: "Success message",
        type: ENotificationType.SUCCESS,
        mode: EModalMode.SINGLE,
        onClose: () => navigate(URL.Module.List),
      });
    })
    .catch(() => {
      notify({
        message: "Error message",
        type: ENotificationType.ERROR,
        mode: EModalMode.SINGLE,
        okText: "OK",
      });
    })
    .finally(() => {
      pageLoading.off();
    });
};
```

### DO: Redux thunk + dispatch().finally()
```tsx
pageLoading.on();
dispatch(actionGetData(payload)).finally(() => pageLoading.off());
```

### AVOID: try/catch wrap cho simple API calls
```tsx
// BAD - qua verbose cho pattern don gian
try {
  pageLoading.on();
  const result = await request({ ... });
  notify({ message: "Success" });
} catch (error) {
  notify({ message: "Error" });
} finally {
  pageLoading.off();
}
```

> **Note**: Chi dung `try/catch` khi can `.unwrap()` hoac can gia tri tra ve de xu ly tiep (vd: `actionCreateInsightRequest().unwrap()`).

---

## 6. Props Pattern

### DO: Destructure tu `props` object
```tsx
const MyComponent = (props: IMyProps) => {
  const { form, data, hidden = false, onSubmit } = props;
};
```

### DO: Interface destructure truc tiep cho component don gian
```tsx
function L2BAlertRibbon({
  data,
  monitoringPeriod,
  isDismissed = false,
  onDismiss,
}: IL2BAlertRibbonProps) { ... }
```

### AVOID: Spread props khong ro rang
```tsx
// BAD
const MyComponent = ({ ...props }: IMyProps) => { ... };
```

---

## 7. Conditional Rendering

### DO: Short-circuit &&
```tsx
{infoLogin.role === EUserRole.MASTER && (
  <CustomButton>Create</CustomButton>
)}
```

### DO: Early return cho null case
```tsx
if (!data || data.length === 0) return null;
```

### AVOID: Nested ternary
```tsx
// BAD
{condition1 ? (condition2 ? <A /> : <B />) : <C />}

// GOOD - tach ra
if (condition1 && condition2) return <A />;
if (condition1) return <B />;
return <C />;
```

---

## 8. Styling

### DO: Tailwind-first, custom class cho reuse
```tsx
<div className="white-section flex flex-col gap-6">
  <h2 className="text-xl font-bold">Title</h2>
</div>
```

### DO: cn() cho conditional classes
```tsx
className={cn(
  "!h-[36px] !text-[13px] !p-2",
  isActive && "!bg-grey-8 !border-grey-100"
)}
```

### DO: Inline style chi cho dynamic values
```tsx
style={{ width: `${(value / maxValue) * 100}%` }}
```

### AVOID: Inline style cho static values
```tsx
// BAD
style={{ display: 'flex', gap: '16px', padding: '24px' }}

// GOOD
className="flex gap-4 p-6"
```

---

## 9. Form Pattern (Ant Design)

### DO: Standard form setup
```tsx
const [form] = Form.useForm();

<Form form={form} layout="vertical" onFinish={handleSubmit}>
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Form.Item
        label={<RequiredLabel text="Field Name" />}
        name="fieldName"
        rules={[validatorRequiredFormItem]}
      >
        <Input placeholder="Enter value" />
      </Form.Item>
    </Col>
  </Row>
</Form>
```

### DO: Reset form voi setFieldsValue
```tsx
function handleResetForm() {
  form.setFieldsValue({ ...INIT_FORM_DATA });
}
```

---

## 10. File Organization

### DO: Flat structure trong feature folder
```
FeatureName/
  index.tsx          // main page + export
  Create.tsx         // create page
  Detail.tsx         // detail page
  DataTable.tsx      // table component
  Condition.tsx      // search/filter form
  SubFeature.tsx     // related sub-component
```

### AVOID: Qua nhieu nesting
```
// BAD
FeatureName/
  components/
    forms/
      CreateForm/
        index.tsx
        CreateForm.styles.ts
        CreateForm.types.ts
```

---

## 11. Constants & Mapped Objects

### DO: Mapped objects thay vi switch/if-else
```tsx
// GOOD
const MAPPED_FORM_SUBMIT_ACTION: DynamicKeyObject = {
  [ERouteSettingForm.ADD]: {
    url: API_URL_TYPE.MODULE.ADD,
    message: "Added successfully",
  },
  [ERouteSettingForm.UPDATE]: {
    url: API_URL_TYPE.MODULE.UPDATE,
    message: "Updated successfully",
  },
};

// Usage
const { url, message } = MAPPED_FORM_SUBMIT_ACTION[formType];
```

### AVOID: Switch statements cho simple mappings
```tsx
// BAD
switch (formType) {
  case ERouteSettingForm.ADD:
    url = API_URL_TYPE.MODULE.ADD;
    message = "Added successfully";
    break;
  case ERouteSettingForm.UPDATE:
    url = API_URL_TYPE.MODULE.UPDATE;
    message = "Updated successfully";
    break;
}
```

---

## 12. Comments

### DO: Minimal, chi khi logic phuc tap
```tsx
// Status priority: SEVERE > EXCEEDED > WARNING > OK
const statusPriority: Record<string, number> = { ... };

// Ctrl+Click: Open in new tab
if (event.ctrlKey || event.metaKey) {
  window.open(detailsPath);
}
```

### DO: Comment tieng Viet cho business logic
```tsx
// Chi dung period da duoc submit (bam Search) de cap nhat bieu do
const [submittedPeriod, setSubmittedPeriod] = useState(...);
```

### AVOID: Comment thua, mo ta dieu hien nhien
```tsx
// BAD
// Set loading to true
setLoading(true);
// Dispatch action to get data
dispatch(actionGetData());
```

---

## 13. Anti-Patterns (TRANH)

### 1. Over-abstraction
```tsx
// BAD - tao hook/util cho 1 cho dung
const useAirlineProfileForm = () => { ... }; // chi dung 1 lan

// GOOD - inline logic truc tiep trong component
```

### 2. Unnecessary state
```tsx
// BAD - state derive duoc tu props/other state
const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

// GOOD
const fullName = `${firstName} ${lastName}`;
// hoac
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
```

### 3. useEffect cho event handling
```tsx
// BAD
useEffect(() => {
  if (submitted) {
    dispatch(actionGetData(formValues));
  }
}, [submitted]);

// GOOD - goi truc tiep trong handler
const handleSubmit = () => {
  dispatch(actionGetData(formValues));
};
```

### 4. Prop drilling qua nhieu tang
```tsx
// BAD - pass prop qua 3+ levels
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>

// GOOD - dung Redux selector hoac component composition
```

### 5. Magic strings
```tsx
// BAD
if (status === "SEVERE") { ... }

// GOOD - dung enum hoac mapped constant
if (status === EStatus.SEVERE) { ... }
// hoac
const MAPPED_STATUS: Record<string, ...> = { ... };
```

### 6. Mixing async patterns
```tsx
// BAD - mix await va .then()
const result = await request({ ... });
result.then(() => { ... });

// GOOD - chon 1 pattern:
// Pattern 1: .then().catch().finally() (preferred cho API calls)
// Pattern 2: try/catch/finally (khi can unwrap)
```

### 7. Giant component (>300 lines)
```tsx
// BAD - 1 file 500+ lines voi nhieu responsibility

// GOOD - tach thanh sub-components trong cung folder
// FeatureName/index.tsx (main, <150 lines)
// FeatureName/DataTable.tsx (table logic)
// FeatureName/Condition.tsx (search form)
```

### 8. Redundant type assertions
```tsx
// BAD
const value = data as DynamicKeyObject as string;

// GOOD
const value = (data as DynamicKeyObject).field;
// hoac define type dung tu dau
```

---

## Summary: JC Style DNA

1. **Tinh gon** - Khong thua dong nao, khong thieu dong nao
2. **Flat structure** - Khong over-nest folders hay components
3. **Mapped objects > switch/if-else** - Declarative, de maintain
4. **Self-documenting code** - Naming ro rang, comment chi khi can
5. **Consistent patterns** - handle*/on*/action*/select*/is*/selected*
6. **Tailwind-first** - cn() cho conditional, inline chi cho dynamic
7. **Promise chain** - .then().catch().finally() cho API calls
8. **Ant Design Form** - Form.useForm(), Form.useWatch(), setFieldsValue()
9. **Redux flow** - dispatch(action) + useAppSelector(selector)
10. **Early returns** - Guard clauses, khong nest sau
