import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, CalendarCheck, ChevronRight, Home, LogOut, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { ROLES, ROLE_LIST, type Role } from '@/roles'
import { useAuth } from '@/auth/AuthContext'
import { Avatar } from '@/components/ui/Avatar'
import { BrandMark } from '@/components/BrandMark'

function SidebarContent({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const cfg = ROLES[role]
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-sidebar px-4 pb-5 pt-[26px]">
      <span className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-purple/40 blur-3xl" />
      <div className="relative flex items-center gap-3 px-1.5">
        <BrandMark size={40} />
        <div>
          <div className="text-h2 text-white">Co-Art Booth</div>
          <div className="text-micro text-ink-ondark">บทบาท: {cfg.label}</div>
        </div>
      </div>
      <div className="relative mt-[30px] px-3 pb-2.5 text-micro text-ink-ondark/70">เมนูของฉัน</div>
      <nav className="relative flex flex-col gap-1.5" aria-label="เมนูหลัก">
        {cfg.nav.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.path === cfg.base}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn('flex h-[46px] items-center gap-3 rounded-[13px] px-3.5 text-body font-medium transition', isActive ? 'bg-g-purple text-white shadow-glow-purple' : 'text-ink-ondark hover:bg-white/10')
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="relative mt-auto flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[.07] px-3.5 py-3 text-micro text-ink-ondark">
          <CalendarCheck size={18} /> Bangkok Art Book Fair 2026
        </div>
        <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 py-3 pl-3 pr-3.5">
          <Avatar initials={user?.initials ?? 'MK'} size={38} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-body font-medium text-white">{user?.name ?? 'Mew Kanjana'}</div>
            <div className="truncate text-micro text-ink-ondark">{cfg.label}</div>
          </div>
          <button type="button" aria-label="ออกจากระบบ" className="rounded-lg p-1.5 text-ink-ondark hover:bg-white/10" onClick={async () => { await signOut(); navigate('/') }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Topbar({ role, onMenu }: { role: Role; onMenu: () => void }) {
  const cfg = ROLES[role]
  const { user, demo, signIn } = useAuth()
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center gap-3 border-b border-line bg-white/90 px-5 backdrop-blur lg:px-8">
      <button type="button" aria-label="เปิดเมนู" className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-purple-deep lg:hidden" onClick={onMenu}><Menu size={18} /></button>
      <Home size={16} className="hidden text-ink-muted sm:block" />
      <span className="hidden text-ink-gray sm:inline">งานของฉัน /</span>
      <span className="text-body font-medium">{cfg.label}</span>
      <div className="flex-1" />
      <label className="hidden h-[42px] w-[280px] items-center gap-2.5 rounded-[13px] bg-mist px-3.5 md:flex">
        <Search size={16} className="text-ink-muted" />
        <input className="w-full bg-transparent text-body outline-none placeholder:text-ink-muted" placeholder="ค้นหา…" aria-label="ค้นหา" />
      </label>
      {demo && (
        <select
          aria-label="สลับบทบาท (demo)"
          title="สลับบทบาท (เฉพาะโหมด demo)"
          className="hidden h-[42px] rounded-[13px] border border-line-strong bg-white px-3 text-body text-purple-deep sm:block"
          value={role}
          onChange={async (e) => { const r = e.target.value as Role; await signIn(r); navigate(ROLES[r].base) }}
        >
          {ROLE_LIST.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
      )}
      <button type="button" aria-label="การแจ้งเตือน" className="relative grid h-[42px] w-[42px] place-items-center rounded-[13px] bg-mist text-purple-deep">
        <Bell size={18} />
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange" />
      </button>
      <Avatar initials={user?.initials ?? 'MK'} size={40} />
    </header>
  )
}

export function AppShell({ role }: { role: Role }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block"><SidebarContent role={role} /></aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <button type="button" aria-label="ปิดเมนู" className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-white" onClick={() => setOpen(false)}><X size={18} /></button>
            <SidebarContent role={role} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar role={role} onMenu={() => setOpen(true)} />
        <main className="flex flex-1 flex-col gap-[22px] px-5 py-7 lg:px-8"><Outlet /></main>
      </div>
    </div>
  )
}
