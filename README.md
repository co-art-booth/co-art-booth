# Co-Art Booth · ระบบจัดการบูธศิลปะ

Frontend เฟส 1 (โหมด demo) สร้างจากไฟล์ Figma "Senior Project" — **23 หน้า**: Landing, Login ×4 บทบาท (ใช้หน้าเดียวรับ `:role`) และหน้าใช้งานของ 4 บทบาท

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS 3 · React Router 6 · lucide-react · Supabase (เฟส 2–3)

## เริ่มใช้งาน

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build production
npm run typecheck  # ตรวจชนิดข้อมูลด้วย tsc
```

ต้องใช้ Node 18+ · ตอนนี้รันได้เลยโดยไม่ต้องมี Supabase (`VITE_DEMO=true` เป็นค่าเริ่มต้น)

## โหมด demo

- ข้อมูลทั้งหมดอยู่ใน `src/data/demo.ts` (รูปแบบใกล้เคียงกับตารางที่จะสร้างใน Supabase)
- หน้า Login: กด "เข้าสู่ระบบ" ได้เลย ไม่ต้องกรอกรหัสผ่าน · ปุ่ม Google / Discord ก็เข้าแบบ demo
- มี dropdown **สลับบทบาท** บน Topbar เพื่อดูครบทั้ง 4 บทบาทโดยไม่ต้องออกจากระบบ
- POS ใช้งานได้จริง: เพิ่มสินค้า/ปรับจำนวน → ยอดสุทธิ → หน้ารับชำระเงิน → คืนสินค้า (ตะกร้าอยู่ใน `CartContext`)
- ปุ่มที่ต้องบันทึกข้อมูล (เช่น เชิญสมาชิก, บันทึกค่าใช้จ่าย) แสดง toast "(demo)" — จะเชื่อม Supabase ในเฟส 3

## โครงสร้าง

```
src/
  App.tsx                 เส้นทางทั้งหมด (/, /login/:role, /manager, /admin, /artist, /assistant)
  roles.ts                นิยาม 4 บทบาท + เมนูแต่ละบทบาท (ใช้ทั้ง Sidebar และ Landing)
  auth/                   AuthContext (demo ↔ Supabase), RequireRole, CartContext
  data/demo.ts            ข้อมูลตัวอย่าง
  data/forecast.ts        สูตรคาดการณ์สินค้าขายดี
  lib/                    cn, format, supabase client, tone
  components/
    ui/                   Button, Pill, Card, DataTable, TextField, Metric, QuickAction, ...
    charts/               AreaChart, ProjectionChart (SVG เบา ๆ ไม่พึ่งไลบรารี)
    layout/AppShell.tsx   Sidebar + Topbar + <Outlet/>
    ProductArt.tsx        รูปสินค้า (vector) 6 แบบ
    ForecastRow / ForecastBlock
  pages/                  manager/ admin/ artist/ assistant/ + Landing, Login
```

## Design tokens (Figma → Tailwind)

`tailwind.config.ts` ใช้ค่าเดียวกับ Variables / Styles ในหน้า **Design System** ของ Figma

| Figma | Tailwind |
|---|---|
| Text/Navy `#0B0F4F` | `text-ink` / `bg-navy` |
| Text/Neutral Gray `#6F7485` | `text-ink-gray` |
| Accent/Purple · Deep · Dark · Soft | `purple` · `purple-deep` · `purple-dark` · `purple-soft` |
| Accent/Pink · Orange | `pink` · `orange` |
| Surface/Canvas · Lavender Mist · Pink Blush · Peach Glow | `canvas` · `mist` · `blush` · `peach` |
| Border/Lavender Purple · Soft | `line-strong` · `line` |
| Status/Success · Danger (+ Tint/Text) | `ok` · `bad` (`-tint`, `-text`) |
| Gradients | `bg-brand` · `bg-cta` · `bg-g-purple` · `bg-sidebar` · `bg-underline` |
| Text styles | `text-hero` · `text-display` · `text-h1` · `text-h2` · `text-body` · `text-small` · `text-micro` |
| Effect styles | `shadow-card` · `shadow-raised` · `shadow-glow-purple` · `shadow-glow-orange` |

ฟอนต์: **Noto Sans Thai** (โหลดจาก Google Fonts ใน `index.html`)

## ระบบคาดการณ์ (`src/data/forecast.ts`)

เฟส 1 เป็นสูตรง่าย ๆ ที่รันในเบราว์เซอร์:

- **ความเร็วขาย** = 0.6 × ค่าเฉลี่ย 3 ชม.ล่าสุด + 0.4 × ความเร็วเฉลี่ยจากงานก่อนหน้า
- **แนวโน้ม** = เทียบ 3 ชม.ล่าสุดกับช่วงก่อนหน้า (±15%)
- **คาดขายใน 3 ชม.** = ความเร็ว × 3 (ไม่เกินสต็อก) · **สต็อกหมดใน** = สต็อก ÷ ความเร็ว
- **ความมั่นใจ** = จากความผันผวนของยอดรายชั่วโมง (CV)
- **งานถัดไป** (`projectNextEvent`) = เส้นแนวโน้มเชิงเส้นจากยอดรวมของงานที่ผ่านมา ±10%

เฟส 2–3: ย้ายอินพุตมาจาก view/function ใน Postgres และเปลี่ยนสูตรเป็นโมเดลผ่าน Supabase Edge Function ได้โดยไม่ต้องแก้หน้าจอ

## ที่ต่างจาก Figma (ตั้งใจ)

- หน้ารับชำระเงิน: ปุ่ม "ยืนยันบิล" พาไปหน้าแรกของผู้ช่วยขายพร้อมล้างตะกร้า (ใน Figma โปรโตไทป์ลิงก์ไปหน้าคืนสินค้า)
- ตะกร้า demo มี "ส่วนลด ฿50" เพื่อให้ยอดสุทธิ ฿870.00 ตรงกับดีไซน์ (480 + 2×220 = 920) และเงินคืน ฿208.00 คำนวณตามสัดส่วนที่จ่ายจริง
- กราฟใช้ SVG ในโค้ดเองแทน Recharts เพื่อลด dependency (เปลี่ยนเป็น Recharts ได้ภายหลัง)
- งาน Chiang Mai Design Week / Creative Market Weekend และตัวเลขเทียบงานเป็นข้อมูลตัวอย่าง

## เฟสถัดไป

1. **เฟส 2** — ไฟล์ SQL สำหรับ Supabase: ตาราง, RLS ตามบทบาท, function สร้างบิลแบบ atomic, `audit_logs` แบบ append-only, ข้อมูลตั้งต้น
2. **เฟส 3** — ตั้ง `VITE_DEMO=false`, ใส่ `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, เปลี่ยน `src/data/demo.ts` เป็น query จริง, เปิด Google/Discord OAuth, ใช้ PromptPay QR จริงแทน `QrPlaceholder`

> สิทธิ์การเข้าถึงจริงต้องบังคับที่ Supabase (RLS) — `RequireRole` ฝั่ง frontend ควบคุมเฉพาะการแสดงผล
