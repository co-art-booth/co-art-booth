import { Check, CalendarCheck, Eye, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ProductArt } from '@/components/ProductArt'
import { useToast } from '@/components/ui/Toast'
import { MY_PRODUCTS, PREORDERS, productByName } from '@/data/demo'
import { baht } from '@/lib/format'

export default function ArtistPreorders() {
  const toast = useToast()
  const mine = new Set(MY_PRODUCTS.map((p) => p.name))
  const rows = PREORDERS.filter((p) => mine.has(p.product))
  const STATUS: Record<string, 'info' | 'ok' | 'warn'> = { 'พร้อมรับ': 'info', 'รับแล้ว': 'ok', 'รอชำระ': 'warn' }
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ศิลปิน / เจ้าของบูธ" title="Pre-order ของฉัน" subtitle="รายการจองที่เกี่ยวข้องกับสินค้าของคุณ" actions={<Button variant="secondary" icon={Eye} onClick={() => toast('เปิดรายละเอียด Pre-order (demo)')}>ดูรายละเอียด</Button>} />
      <Card title="รายการ Pre-order" subtitle="ยังไม่ตัดสต็อกจนกว่าจะยืนยันรับสินค้า">
        <DataTable
          rowHeight={66}
          columns={[
            { header: 'เลขที่', width: '140px', cell: (p) => <Chip tone="plain">{p.id}</Chip> },
            { header: 'ลูกค้า', width: '210px', cell: (p, i) => <><Avatar initials={p.initials} index={i} /><span className="font-medium">{p.customer}</span></> },
            { header: 'สินค้า', width: '330px', cell: (p) => <><ProductArt kind={productByName(p.product).art} className="h-11 w-11" /><span className="font-medium">{p.product}</span></> },
            { header: 'จำนวน', width: '90px', cell: (p) => p.qty },
            { header: 'ยอด', width: '110px', cell: (p) => <span className="text-h2">{baht(p.amount)}</span> },
            { header: 'สถานะ', cell: (p) => <Pill tone={STATUS[p.status] ?? 'info'}>{p.status}</Pill> },
          ]}
          rows={rows}
        />
      </Card>
      <div className="flex items-center gap-3.5 rounded-card border border-line bg-white px-6 py-5 shadow-card">
        {[[Wallet, 'รอชำระ', 'ยังไม่ตัดสต็อก', 'pink'], [CalendarCheck, 'รอรับ', 'ยังไม่ตัดสต็อก', 'orange'], [Check, 'รับแล้ว', 'ตัดสต็อกเมื่อยืนยันรับสินค้า', 'green']].map(([Icon, l, s, tone], i) => (
          <div key={l as string} className="flex flex-1 items-center gap-3.5 last:flex-none">
            <IconChip icon={Icon as typeof Check} tone={tone as 'pink'} size={40} />
            <div><div className="text-h2">{l as string}</div><div className="text-small text-ink-gray">{s as string}</div></div>
            {i < 2 && <span className="mx-2 h-0.5 flex-1 rounded bg-line-strong" />}
          </div>
        ))}
      </div>
    </>
  )
}
