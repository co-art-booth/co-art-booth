import {
  LayoutDashboard, Users, Receipt, Banknote, BarChart3, KeyRound, ShieldCheck, Package,
  CalendarCheck, Wallet, ShoppingCart, CreditCard, RotateCcw, Palette, type LucideIcon,
} from 'lucide-react'
import type { Tone } from '@/lib/tone'

export type Role = 'manager' | 'admin' | 'artist' | 'assistant'

export interface NavItem { key: string; label: string; path: string; icon: LucideIcon }
export interface RoleConfig {
  key: Role
  label: string
  eyebrow: string
  icon: LucideIcon
  tone: Tone
  base: string
  statement: string
  nav: NavItem[]
  bullets: string[]
}

export const ROLES: Record<Role, RoleConfig> = {
  manager: {
    key: 'manager', label: 'ผู้จัดการบูธ', eyebrow: 'WORKSPACE · ผู้จัดการบูธ', icon: Users, tone: 'purple', base: '/manager',
    statement: 'ควบคุมภาพรวม\nและปิดยอดของงาน',
    bullets: ['ภาพรวมเงินกองกลางและสมาชิก', 'ตรวจค่าใช้จ่ายและปิดยอด', 'รายงานแยกตามงาน'],
    nav: [
      { key: 'dashboard', label: 'ภาพรวมบูธ', path: '/manager', icon: LayoutDashboard },
      { key: 'members', label: 'สมาชิกและบทบาท', path: '/manager/members', icon: Users },
      { key: 'expenses', label: 'ค่าใช้จ่าย', path: '/manager/expenses', icon: Receipt },
      { key: 'settlement', label: 'ปิดยอดและแบ่งเงิน', path: '/manager/settlement', icon: Banknote },
      { key: 'reports', label: 'สรุปยอดและรายงาน', path: '/manager/reports', icon: BarChart3 },
    ],
  },
  admin: {
    key: 'admin', label: 'ผู้ดูแลระบบ', eyebrow: 'WORKSPACE · ผู้ดูแลระบบ', icon: ShieldCheck, tone: 'pink', base: '/admin',
    statement: 'ดูแลบัญชี สิทธิ์\nและความปลอดภัย',
    bullets: ['จัดการบัญชีและสิทธิ์', 'Audit trail แบบ append-only', 'รายงานระบบ'],
    nav: [
      { key: 'dashboard', label: 'ภาพรวมระบบ', path: '/admin', icon: LayoutDashboard },
      { key: 'accounts', label: 'บัญชีและสิทธิ์', path: '/admin/accounts', icon: KeyRound },
      { key: 'audit', label: 'Audit trail', path: '/admin/audit', icon: ShieldCheck },
      { key: 'reports', label: 'รายงานระบบ', path: '/admin/reports', icon: BarChart3 },
    ],
  },
  artist: {
    key: 'artist', label: 'ศิลปิน / เจ้าของบูธ', eyebrow: 'WORKSPACE · ศิลปิน / เจ้าของบูธ', icon: Palette, tone: 'orange', base: '/artist',
    statement: 'จัดการสินค้า\nและติดตามยอดขายของคุณ',
    bullets: ['สินค้าและสต็อกของตัวเอง', 'ติดตามยอดที่ต้องรับ', 'ดูคาดการณ์สินค้าขายดี'],
    nav: [
      { key: 'dashboard', label: 'ภาพรวมของฉัน', path: '/artist', icon: LayoutDashboard },
      { key: 'products', label: 'สินค้าและสต็อก', path: '/artist/products', icon: Package },
      { key: 'preorders', label: 'Pre-order', path: '/artist/preorders', icon: CalendarCheck },
      { key: 'earnings', label: 'ยอดขายของฉัน', path: '/artist/earnings', icon: Wallet },
    ],
  },
  assistant: {
    key: 'assistant', label: 'ผู้ช่วยขาย', eyebrow: 'WORKSPACE · ผู้ช่วยขาย', icon: ShoppingCart, tone: 'green', base: '/assistant',
    statement: 'ขายหน้าร้าน\nและรับชำระเงิน',
    bullets: ['POS หลายเจ้าของในบิลเดียว', 'Pre-order และรับชำระเงิน', 'คืนสินค้าส่งให้ผู้จัดการ'],
    nav: [
      { key: 'dashboard', label: 'ภาพรวมการขาย', path: '/assistant', icon: LayoutDashboard },
      { key: 'preorders', label: 'จัดการ Pre-order', path: '/assistant/preorders', icon: CalendarCheck },
      { key: 'pos', label: 'บันทึกการขาย', path: '/assistant/pos', icon: ShoppingCart },
      { key: 'payment', label: 'รับชำระเงิน', path: '/assistant/payment', icon: CreditCard },
      { key: 'returns', label: 'คืนสินค้า', path: '/assistant/returns', icon: RotateCcw },
    ],
  },
}

export const ROLE_LIST = Object.values(ROLES)
export const isRole = (v: string | undefined): v is Role => !!v && v in ROLES
