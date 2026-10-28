import { useMemo, useState } from 'react'
import { KeyRound, Package, Receipt, RotateCcw, Search } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { AUDIT } from '@/data/demo'
import { cn } from '@/lib/cn'

const FILTERS = [['all', 'ทั้งหมด'], ['bill', 'บิลและคืนสินค้า'], ['stock', 'สต็อก'], ['role', 'สิทธิ์ผู้ใช้']] as const

export default function AdminAudit() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number][0]>('all')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => AUDIT.filter((a) => (filter === 'all' || a.kind === filter) && (!q || [a.who, a.ref, a.reason, a.action].some((s) => s.toLowerCase().includes(q.toLowerCase())))),
    [filter, q],
  )
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ดูแลระบบ" title="Audit trail" subtitle="ค้นหาและตรวจสอบกิจกรรมของระบบแบบ append-only" />
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="flex h-11 w-[360px] max-w-full items-center gap-2.5 rounded-[13px] border border-line-strong bg-white px-3.5">
          <Search size={16} className="text-ink-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาผู้ทำรายการ, อ้างอิง หรือเหตุผล" className="w-full bg-transparent text-body outline-none placeholder:text-ink-muted" aria-label="ค้นหา Audit trail" />
        </label>
        {FILTERS.map(([k, l]) => (
          <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k} className={cn('h-11 rounded-[13px] px-4 text-body font-medium transition', filter === k ? 'bg-g-purple text-white' : 'border border-line-strong bg-white text-purple-deep hover:bg-mist')}>{l}</button>
        ))}
      </div>
      <Card title="ประวัติการเปลี่ยนแปลง" subtitle="actor · timestamp · action · entity · reason" action={<Pill tone="neutral">append-only</Pill>}>
        <DataTable
          columns={[
            { header: 'เวลา', width: '100px', cell: (a) => <span className="font-medium">{a.time}</span> },
            { header: 'ผู้ทำรายการ', width: '190px', cell: (a, i) => <><Avatar initials={a.initials} index={i + 2} /><span className="font-medium">{a.who}</span></> },
            { header: 'การกระทำ', width: '280px', cell: (a) => a.kind === 'stock' ? <Chip tone="peach" icon={Package}>{a.action}</Chip> : a.kind === 'role' ? <Chip tone="pink" icon={KeyRound}>{a.action}</Chip> : a.action.includes('คืน') ? <Chip tone="red" icon={RotateCcw}>{a.action}</Chip> : <Chip icon={Receipt}>{a.action}</Chip> },
            { header: 'อ้างอิง', width: '190px', cell: (a) => <Chip tone="plain">{a.ref}</Chip> },
            { header: 'เหตุผล', cell: (a) => <span className="text-ink-gray">{a.reason}</span> },
          ]}
          rows={rows}
        />
        {rows.length === 0 && <p className="py-8 text-center text-ink-gray">ไม่พบรายการที่ตรงกับคำค้น ลองล้างตัวกรองหรือค้นด้วยคำอื่น</p>}
      </Card>
    </>
  )
}
