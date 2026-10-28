import { Banknote, FileText, Plus, ShoppingCart, Tag, Upload, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { useToast } from '@/components/ui/Toast'
import { EXPENSES } from '@/data/demo'
import { baht } from '@/lib/format'
import { cn } from '@/lib/cn'

const ICONS = [Tag, FileText, ShoppingCart]
const TONES = ['purple', 'pink', 'orange'] as const

function Receipt({ ok }: { ok: boolean }) {
  return (
    <svg width="78" height="100" viewBox="0 0 90 116" aria-hidden="true">
      <path d="M6 4 H84 V108 L77 103 L70 108 L63 103 L56 108 L49 103 L42 108 L35 103 L28 108 L21 103 L14 108 L6 103Z" fill="#fff" stroke="#DDD5FF" strokeWidth="2" />
      <rect x="16" y="14" width="30" height="6" rx="3" fill="#C9BBFF" />
      <g fill="#EBE7FB"><rect x="16" y="30" width="58" height="4" rx="2" /><rect x="16" y="40" width="48" height="4" rx="2" /><rect x="16" y="50" width="54" height="4" rx="2" /><rect x="16" y="60" width="40" height="4" rx="2" /></g>
      <rect x="16" y="78" width="26" height="8" rx="3" fill={ok ? '#17A673' : '#FFB24C'} />
    </svg>
  )
}

export default function ManagerExpenses() {
  const toast = useToast()
  const total = EXPENSES.reduce((s, e) => s + e.amount, 0)
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ผู้จัดการบูธ" title="ค่าใช้จ่ายและข้อตกลง" subtitle="ตรวจหลักฐาน ผู้จ่ายจริง และสูตรการแบ่ง"
        actions={<><Button variant="secondary" icon={Banknote} to="/manager/settlement">ไป Settlement</Button><Button icon={Plus} onClick={() => toast('บันทึกค่าใช้จ่ายแล้ว (demo)')}>บันทึกค่าใช้จ่าย</Button></>}
      />
      <Card title="บัญชีค่าใช้จ่าย" subtitle="รายการเงินที่ต้องตรวจสอบก่อนปิดยอด" action={<Pill tone="info">รวม {baht(total)}</Pill>}>
        <DataTable
          columns={[
            { header: 'รายการ', width: '290px', cell: (e, i) => { const Icon = ICONS[i]; return <><IconChip icon={Icon} tone={TONES[i]} size={36} /><span className="font-medium">{e.item}</span></> } },
            { header: 'หมวดหมู่', width: '160px', cell: (e) => <Chip>{e.category}</Chip> },
            { header: 'จำนวนเงิน', width: '130px', cell: (e) => <span className="text-h2">{baht(e.amount)}</span> },
            { header: 'ผู้จ่ายจริง', width: '180px', cell: (e, i) => e.payerInitials ? <><Avatar initials={e.payerInitials} index={i} /><span className="font-medium">{e.payer}</span></> : <><IconChip icon={Wallet} tone="green" size={36} /><span className="font-medium">{e.payer}</span></> },
            { header: 'วิธีแบ่ง', width: '150px', cell: (e) => <Chip tone="plain">{e.split}</Chip> },
            { header: 'สถานะ', cell: (e) => <Pill tone={e.ok ? 'ok' : 'warn'}>{e.status}</Pill> },
          ]}
          rows={EXPENSES}
        />
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {EXPENSES.map((e) => (
          <div key={e.id} className={cn('flex items-center gap-3.5 rounded-[18px] p-3.5', e.ok ? 'border border-line bg-white shadow-card' : 'border border-dashed border-orange/60 bg-peach')}>
            <span className="grid h-[100px] w-[78px] shrink-0 place-items-center rounded-[10px] bg-mist"><Receipt ok={e.ok} /></span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="truncate text-body font-medium">{e.item}</div>
              <div className="text-h1 text-purple-deep">{baht(e.amount)}</div>
              {e.ok ? <Pill tone="ok">ตรวจแล้ว</Pill> : <button type="button" onClick={() => toast('อัปโหลดหลักฐานแล้ว (demo)')} className="inline-flex w-fit items-center gap-1.5 rounded-[9px] bg-white py-[5px] pl-2 pr-2.5 text-micro text-warn-text"><Upload size={13} />รอหลักฐาน</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
