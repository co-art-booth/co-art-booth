import { useMemo, useState } from 'react'
import { Clock, CreditCard, Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { ProductArt } from '@/components/ProductArt'
import { useToast } from '@/components/ui/Toast'
import { PREORDERS, productByName } from '@/data/demo'
import { baht } from '@/lib/format'
import { cn } from '@/lib/cn'

const FILTERS = [['all', 'ทั้งหมด'], ['พร้อมรับ', 'พร้อมรับ'], ['รอชำระ', 'รอชำระ']] as const

export default function AssistantPreorders() {
  const toast = useToast()
  const [filter, setFilter] = useState<string>('all')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => PREORDERS.filter((p) => p.status !== 'รับแล้ว' && (filter === 'all' || p.status === filter) && (!q || [p.id, p.customer, p.product].some((s) => s.toLowerCase().includes(q.toLowerCase())))),
    [filter, q],
  )
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ผู้ช่วยขาย" title="จัดการ Pre-order" subtitle="ค้นหา ยืนยันรับสินค้า และเปลี่ยนเป็นบิลขาย"
        actions={<><Button variant="secondary" icon={Plus} onClick={() => toast('สร้าง Pre-order ใหม่แล้ว (demo)')}>สร้าง Pre-order</Button><Button icon={CreditCard} to="/assistant/payment">เปลี่ยนเป็นบิลขาย</Button></>}
      />
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="flex h-11 w-[380px] max-w-full items-center gap-2.5 rounded-[13px] border border-line-strong bg-white px-3.5">
          <Search size={16} className="text-ink-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาเลขที่ ลูกค้า หรือสินค้า" aria-label="ค้นหา Pre-order" className="w-full bg-transparent text-body outline-none placeholder:text-ink-muted" />
        </label>
        {FILTERS.map(([k, l]) => <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className={cn('h-11 rounded-[13px] px-4 text-body font-medium', filter === k ? 'bg-g-purple text-white' : 'border border-line-strong bg-white text-purple-deep hover:bg-mist')}>{l}</button>)}
      </div>
      <Card title="รายการ Pre-order วันนี้" subtitle="ผู้ช่วยขายจัดการสถานะหน้าร้าน">
        <DataTable
          rowHeight={66}
          columns={[
            { header: 'เลขที่', width: '130px', cell: (p) => <Chip tone="plain">{p.id}</Chip> },
            { header: 'ลูกค้า', width: '190px', cell: (p, i) => <><Avatar initials={p.initials} index={i} /><span className="font-medium">{p.customer}</span></> },
            { header: 'รายการ', width: '310px', cell: (p) => <><ProductArt kind={productByName(p.product).art} className="h-11 w-11" /><span className="font-medium">{p.product} × {p.qty}</span></> },
            { header: 'ยอด', width: '110px', cell: (p) => <span className="text-h2">{baht(p.amount)}</span> },
            { header: 'นัดรับ', width: '150px', cell: (p) => <Chip tone="peach" icon={Clock}>{p.pickup}</Chip> },
            { header: 'สถานะ', cell: (p) => <Pill tone={p.tone}>{p.status}</Pill> },
          ]}
          rows={rows}
        />
        {rows.length === 0 && <p className="py-8 text-center text-ink-gray">ไม่พบ Pre-order ที่ตรงกับตัวกรอง ลองเลือก “ทั้งหมด”</p>}
      </Card>
    </>
  )
}
