/** Sample data for demo mode. Shapes match the tables planned for Supabase (phase 2). */
export type ArtKind = 'moonlit' | 'planet' | 'postcard' | 'tote' | 'sticker' | 'notes'

export interface Product {
  id: string; sku: string; name: string; owner: string; ownerInitials: string; price: number; art: ArtKind
  received: number; sold: number; left: number
  /** units sold per hour today (oldest -> newest) */
  hourly: number[]
  /** average units/hour in previous events */
  historyRate: number
}

export const PRODUCTS: Product[] = [
  { id: 'p1', sku: 'MEW-001', name: 'Moonlit Garden', owner: 'Mew K.', ownerInitials: 'MK', price: 480, art: 'moonlit', received: 50, sold: 27, left: 20, hourly: [1, 2, 2, 3, 4, 4], historyRate: 3 },
  { id: 'p2', sku: 'PLO-004', name: 'Tiny Planet Pin', owner: 'Ploy S.', ownerInitials: 'PS', price: 220, art: 'planet', received: 25, sold: 5, left: 14, hourly: [0, 1, 1, 1, 2, 2], historyRate: 2 },
  { id: 'p3', sku: 'NIN-002', name: 'Rainy Day Postcard', owner: 'Nina R.', ownerInitials: 'NR', price: 95, art: 'postcard', received: 60, sold: 9, left: 44, hourly: [1, 1, 2, 1, 2, 2], historyRate: 3 },
  { id: 'p4', sku: 'MAY-003', name: 'Blue Hour Tote', owner: 'May P.', ownerInitials: 'MP', price: 650, art: 'tote', received: 10, sold: 3, left: 4, hourly: [0, 0, 1, 1, 2, 2], historyRate: 2 },
  { id: 'p5', sku: 'MEW-010', name: 'Little Sun Sticker', owner: 'Mew K.', ownerInitials: 'MK', price: 65, art: 'sticker', received: 20, sold: 20, left: 0, hourly: [3, 4, 4, 3, 3, 3], historyRate: 3 },
  { id: 'p6', sku: 'MEW-012', name: 'Blue Notes Print', owner: 'Mew K.', ownerInitials: 'MK', price: 320, art: 'notes', received: 15, sold: 8, left: 7, hourly: [1, 1, 1, 2, 1, 1], historyRate: 1.5 },
]
export const productByName = (name: string) => PRODUCTS.find((p) => p.name === name)!
/** Products owned by the signed-in demo artist (Mew K.). */
export const MY_PRODUCTS = PRODUCTS.filter((p) => p.owner === 'Mew K.')
export const POS_PRODUCTS = ['Moonlit Garden', 'Tiny Planet Pin', 'Rainy Day Postcard', 'Blue Hour Tote'].map(productByName)

export const MEMBERS = [
  { name: 'Mew Kanjana', initials: 'MK', email: 'mew@coart.studio', role: 'Booth Manager', perm: 'ทุกเมนู', last: 'วันนี้ 14:32' },
  { name: 'Ploy Suthida', initials: 'PS', email: 'ploy@coart.studio', role: 'Artist', perm: 'สินค้า · ยอดขายของตน', last: 'วันนี้ 13:10' },
  { name: 'Nina Rattan', initials: 'NR', email: 'nina@coart.studio', role: 'Artist', perm: 'สินค้า · ยอดขายของตน', last: 'วันนี้ 12:40' },
  { name: 'Beam Chanon', initials: 'BC', email: 'beam@coart.studio', role: 'Sales Assistant', perm: 'POS · Pre-order', last: 'วันนี้ 14:32' },
]

export const EXPENSES = [
  { id: 'e1', item: 'ค่าเช่าบูธ Hall B-24', category: 'พื้นที่', amount: 3000, payer: 'Mew K.', payerInitials: 'MK', split: 'หารเท่ากัน', status: 'ตรวจแล้ว', ok: true },
  { id: 'e2', item: 'ป้ายไวนิลหน้าบูธ', category: 'ประชาสัมพันธ์', amount: 850, payer: 'กองกลาง', payerInitials: '', split: 'ตามสัดส่วน', status: 'ตรวจแล้ว', ok: true },
  { id: 'e3', item: 'ถุงกระดาษ Co-Art', category: 'วัสดุ', amount: 420, payer: 'Ploy S.', payerInitials: 'PS', split: 'หารเท่ากัน', status: 'รอหลักฐาน', ok: false },
]

export const SETTLEMENT = [
  { name: 'Mew K.', initials: 'MK', sales: 5000, expense: 1000, direct: 0, due: 4000, paid: false },
  { name: 'Ploy S.', initials: 'PS', sales: 4000, expense: 1000, direct: 2000, due: 1000, paid: true },
  { name: 'Nina R.', initials: 'NR', sales: 3000, expense: 1000, direct: 0, due: 2000, paid: false },
]

export interface EventSummary { id: string; name: string; total: number; sub: string; current: boolean; top: { product: string; qty: number; amount: number }[] }
/** Only the first event is real data from the design; the others are sample data. */
export const EVENTS: EventSummary[] = [
  { id: 'ev1', name: 'Bangkok Art Book Fair 2026', total: 15060, sub: '1048 บิล', current: true,
    top: [{ product: 'Moonlit Garden', qty: 7, amount: 3360 }, { product: 'Tiny Planet Pin', qty: 5, amount: 1100 }, { product: 'Rainy Day Postcard', qty: 9, amount: 855 }] },
  { id: 'ev2', name: 'Chiang Mai Design Week', total: 11350, sub: 'งานที่ผ่านมา', current: false,
    top: [{ product: 'Blue Hour Tote', qty: 12, amount: 7800 }, { product: 'Little Sun Sticker', qty: 30, amount: 1950 }, { product: 'Blue Notes Print', qty: 5, amount: 1600 }] },
  { id: 'ev3', name: 'Creative Market Weekend', total: 8660, sub: 'งานที่ผ่านมา', current: false,
    top: [{ product: 'Blue Notes Print', qty: 14, amount: 4480 }, { product: 'Moonlit Garden', qty: 6, amount: 2880 }, { product: 'Little Sun Sticker', qty: 20, amount: 1300 }] },
]

export const PREORDERS = [
  { id: 'PRE-001', customer: 'Aom S.', initials: 'AS', product: 'Moonlit Garden', qty: 1, amount: 480, pickup: 'วันนี้ 13:00', status: 'พร้อมรับ', tone: 'ok' as const },
  { id: 'PRE-002', customer: 'Pimchanok', initials: 'PC', product: 'Tiny Planet Pin', qty: 2, amount: 440, pickup: 'วันนี้ 14:00', status: 'รอชำระ', tone: 'warn' as const },
  { id: 'PRE-003', customer: 'Korn P.', initials: 'KP', product: 'Blue Notes Print', qty: 2, amount: 640, pickup: 'วันนี้ 14:30', status: 'รับแล้ว', tone: 'ok' as const },
  { id: 'PRE-004', customer: 'Nicha W.', initials: 'NW', product: 'Blue Hour Tote', qty: 1, amount: 650, pickup: 'วันนี้ 15:00', status: 'พร้อมรับ', tone: 'ok' as const },
  { id: 'PRE-006', customer: 'Nicha W.', initials: 'NW', product: 'Moonlit Garden', qty: 1, amount: 480, pickup: 'วันนี้ 16:00', status: 'รอชำระ', tone: 'warn' as const },
]

export const AUDIT = [
  { time: '14:32', who: 'Beam', initials: 'BC', action: 'สร้างบิลและรับชำระ', ref: '#ORD-1049', reason: 'Atomic transaction', kind: 'bill' },
  { time: '14:16', who: 'Mew', initials: 'MK', action: 'เติมสต็อก', ref: 'MEW-001', reason: 'เติมก่อนเปิดร้าน', kind: 'stock' },
  { time: '13:55', who: 'Admin', initials: 'NA', action: 'เปลี่ยนบทบาท', ref: 'USR-009', reason: 'คำขอจากผู้จัดการ', kind: 'role' },
  { time: '12:09', who: 'Beam', initials: 'BC', action: 'รับคืนสินค้า', ref: '#ORD-1041', reason: 'ลูกค้าคืนสินค้า', kind: 'bill' },
]

export const ACCOUNTS = [
  { name: 'Mew Kanjana', initials: 'MK', email: 'mew@coart.studio', role: 'Booth Manager', booth: 'Co-Art' },
  { name: 'Ploy Suthida', initials: 'PS', email: 'ploy@coart.studio', role: 'Artist', booth: 'Co-Art' },
  { name: 'Beam Chanon', initials: 'BC', email: 'beam@coart.studio', role: 'Sales Assistant', booth: 'Co-Art' },
  { name: 'Nara Admin', initials: 'NA', email: 'admin@coart.system', role: 'System Admin', booth: 'ทุกบูธ' },
]

export const SYSTEM_REPORTS = [
  { name: 'Active users', period: 'วันนี้', count: '24 ผู้ใช้', status: 'พร้อมส่งออก', ok: true },
  { name: 'Audit events', period: 'วันนี้', count: '186 events', status: 'พร้อมส่งออก', ok: true },
  { name: 'Permission changes', period: 'เดือนนี้', count: '12 events', status: 'พร้อมส่งออก', ok: true },
  { name: 'System errors', period: 'วันนี้', count: '2 errors', status: 'ต้องตรวจสอบ', ok: false },
]
