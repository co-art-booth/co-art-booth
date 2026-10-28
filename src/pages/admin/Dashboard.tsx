import { Activity, AlertTriangle, KeyRound, Package, Palette, Receipt, ShieldCheck, Users } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Metric } from '@/components/ui/Metric'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { IconChip } from '@/components/ui/IconChip'
import { Pill } from '@/components/ui/Pill'
import { QuickAction } from '@/components/ui/QuickAction'
import { AreaChart } from '@/components/charts/AreaChart'
import { AUDIT } from '@/data/demo'

const KIND_ICON = { bill: Receipt, stock: Package, role: KeyRound } as const
const KIND_TONE = { bill: 'purple', stock: 'orange', role: 'pink' } as const

export default function AdminDashboard() {
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ดูแลระบบ" title="ภาพรวมระบบ" subtitle="ตรวจสอบผู้ใช้งานและกิจกรรมระดับระบบ" />
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <Metric hero icon={Users} label="ผู้ใช้งานทั้งหมด" value="24 คน" sub="ใช้งานอยู่ 21 คน" spark={[0.3, 0.4, 0.45, 0.6, 0.65, 0.85]} />
        <Metric icon={Palette} tone="pink" label="บูธที่เปิดใช้งาน" value="8 บูธ" sub="งานที่กำลังดำเนินการ" spark={[0.5, 0.5, 0.6, 0.6, 0.7, 0.7]} />
        <Metric icon={Activity} tone="orange" label="กิจกรรมวันนี้" value="186 รายการ" sub="เพิ่มขึ้น 12.4%" spark={[0.2, 0.35, 0.3, 0.6, 0.55, 0.9]} />
        <Metric icon={AlertTriangle} tone="red" label="แจ้งเตือนความปลอดภัย" value="2 รายการ" sub="ต้องตรวจสอบ" spark={[0.7, 0.5, 0.6, 0.4, 0.55, 0.8]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card title="กิจกรรมล่าสุด" subtitle="ทุกการเปลี่ยนแปลงมี actor และเวลา" bodyClassName="flex flex-col gap-3">
          {AUDIT.slice(0, 3).map((a, i) => (
            <div key={a.time} className="flex min-h-[68px] items-center gap-3.5 rounded-2xl border border-line bg-canvas py-3 pl-3.5 pr-4">
              <span className="rounded-[9px] bg-mist px-2.5 py-[5px] text-micro text-purple-deep">{a.time}</span>
              <Avatar initials={a.initials} size={34} index={i + 2} />
              <div className="min-w-0 flex-1"><div className="text-body font-medium">{a.who}</div><div className="text-small text-ink-gray">{a.action} {a.ref}</div></div>
              <IconChip icon={KIND_ICON[a.kind as keyof typeof KIND_ICON]} tone={KIND_TONE[a.kind as keyof typeof KIND_TONE]} size={34} />
            </div>
          ))}
        </Card>
        <Card title="แจ้งเตือนความปลอดภัย" subtitle="2 รายการ ต้องตรวจสอบ" bodyClassName="flex flex-col gap-3">
          <AreaChart values={[0.2, 0.35, 0.3, 0.55, 0.5, 0.8, 0.7, 0.95]} color="#F062C0" width={380} height={96} grid />
          {[['System errors', '2 errors', 'ต้องตรวจสอบ', 'bad', AlertTriangle, 'red'], ['Permission changes', '12 events', 'เดือนนี้', 'info', KeyRound, 'purple']].map(([n, s, pt, pv, Icon, tone]) => (
            <div key={n as string} className="flex h-[58px] items-center gap-3 rounded-[14px] border border-line bg-canvas pl-3 pr-3.5">
              <IconChip icon={Icon as typeof KeyRound} tone={tone as 'red'} size={34} />
              <div className="flex-1"><div className="text-body font-medium">{n as string}</div><div className="text-small text-ink-gray">{s as string}</div></div>
              <Pill tone={pv as 'bad'}>{pt as string}</Pill>
            </div>
          ))}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAction primary to="/admin/accounts" icon={KeyRound} label="จัดการบัญชี" desc="สร้างบัญชีและกำหนดสิทธิ์" />
        <QuickAction to="/admin/audit" icon={ShieldCheck} label="ดู Audit trail" desc="ตรวจสอบกิจกรรมแบบ append-only" />
      </div>
    </>
  )
}
