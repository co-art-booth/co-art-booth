import { ArrowRight, Minus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Progress } from '@/components/ui/Progress'
import { ProductArt } from '@/components/ProductArt'
import { AreaChart } from '@/components/charts/AreaChart'
import { productByName } from '@/data/demo'
import { baht } from '@/lib/format'
import { cn } from '@/lib/cn'

const NET = 5000, EXPENSE = 1000

export default function ArtistEarnings() {
  const top = [{ name: 'Moonlit Garden', qty: 7, amount: 3360 }, { name: 'Blue Notes Print', qty: 8, amount: 2560 }]
  const tile = (label: string, value: string, hero?: boolean) => (
    <div className={cn('relative flex min-h-[118px] flex-1 flex-col justify-center gap-1.5 overflow-hidden rounded-[18px] px-[18px]', hero ? 'bg-brand text-white shadow-glow-purple' : 'border border-line bg-canvas')}>
      {hero && <span className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-orange/50 blur-3xl" />}
      <span className={cn('relative text-body font-medium', hero ? 'text-white/90' : 'text-ink-gray')}>{label}</span>
      <span className="relative text-display">{value}</span>
    </div>
  )
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ศิลปิน / เจ้าของบูธ" title="ยอดขายของฉัน" subtitle="ดูยอดขายหลังหักส่วนลด คืนสินค้า และค่าใช้จ่าย" />
      <div className="grid gap-5 lg:grid-cols-[1.65fr_1fr]">
        <Card title="สรุปยอดของฉัน" subtitle="ข้อมูลจากบิลที่ยืนยันแล้ว" bodyClassName="flex flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-2.5">
            {tile('ยอดขายสุทธิ', baht(NET))}<Minus size={18} className="text-ink-muted" />
            {tile('ค่าใช้จ่ายที่แบ่งมา', `− ${baht(EXPENSE)}`)}<ArrowRight size={18} className="text-ink-muted" />
            {tile('ยอดที่ต้องรับ', baht(NET - EXPENSE), true)}
          </div>
          <div className="flex items-center gap-2.5"><span className="text-body font-medium text-ink-gray">สถานะ</span><Pill tone="warn">รอปิด Settlement</Pill></div>
          <AreaChart values={[0.1, 0.22, 0.2, 0.38, 0.35, 0.55, 0.5, 0.7, 0.66, 0.9]} width={646} height={200} grid />
        </Card>
        <Card title="สินค้าขายดี" subtitle="ของฉัน" bodyClassName="flex flex-col gap-3.5">
          {top.map((t) => (
            <div key={t.name} className="flex flex-col gap-3 rounded-[18px] border border-line bg-canvas p-3">
              <ProductArt kind={productByName(t.name).art} className="h-[150px] w-full" rounded="rounded-[14px]" />
              <div className="flex items-center justify-between"><span className="text-h2">{t.name}</span><span className="text-body font-medium text-purple-deep">{t.qty} ชิ้น · {baht(t.amount)}</span></div>
              <Progress value={t.amount / 3360} />
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
