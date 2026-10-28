import { Download, FileText, Trophy } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ProductArt } from '@/components/ProductArt'
import { ProjectionChart } from '@/components/charts/ProjectionChart'
import { ForecastRow } from '@/components/ForecastRow'
import { EVENTS, productByName } from '@/data/demo'
import { forecastProduct, projectNextEvent } from '@/data/forecast'
import { useToast } from '@/components/ui/Toast'
import { baht } from '@/lib/format'
import { cn } from '@/lib/cn'
import { TONE_BG } from '@/lib/tone'

const RANK_TONE = ['purple', 'pink', 'orange'] as const

/** Average units per past event for each product, scaled by the projected growth of the next event. */
function nextEventPicks(growth: number) {
  const agg = new Map<string, { qty: number; amount: number }>()
  for (const ev of EVENTS) for (const t of ev.top) {
    const a = agg.get(t.product) ?? { qty: 0, amount: 0 }
    agg.set(t.product, { qty: a.qty + t.qty, amount: a.amount + t.amount })
  }
  return [...agg.entries()]
    .map(([name, a]) => ({ name, expectedQty: Math.max(1, Math.round((a.qty / EVENTS.length) * growth)), amount: a.amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
}

export default function ManagerReports() {
  const toast = useToast()
  const best = [...EVENTS].sort((a, b) => b.total - a.total)[0]
  const maxTotal = Math.max(...EVENTS.map((e) => e.total))
  const totals = [...EVENTS].reverse().map((e) => e.total) // oldest -> newest
  const next = projectNextEvent(totals)
  const avg = totals.reduce((s, v) => s + v, 0) / totals.length
  const picks = nextEventPicks(next.value / avg)
  const bestProduct = best.top[0].product

  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้จัดการบูธ" title="สรุปยอดและรายงาน" subtitle="ดูภาพรวมงานและส่งออกข้อมูลสำหรับตรวจสอบ" />

      <div className="grid gap-5 lg:grid-cols-[440px_1fr]">
        <div className="relative flex flex-col gap-1.5 overflow-hidden rounded-[22px] bg-brand p-6 text-white shadow-glow-purple">
          <span className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-orange/50 blur-3xl" />
          <div className="relative flex items-center gap-2.5"><IconChip icon={Trophy} tone="glass" size={34} /><span className="text-body font-medium text-white/90">งานที่ขายดีที่สุด</span></div>
          <div className="relative text-h1">{best.name}</div>
          <div className="relative text-hero">{baht(best.total)}</div>
          <div className="relative mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-white/20 py-1.5 pl-1.5 pr-3.5 text-micro"><ProductArt kind={productByName(bestProduct).art} className="h-7 w-7" rounded="rounded-full" />สินค้าขายดีที่สุด: {bestProduct}</div>
        </div>
        <Card title="เปรียบเทียบยอดขายแต่ละงาน" subtitle="รวมทุกงานที่เข้าร่วม" bodyClassName="flex flex-col gap-3.5">
          {EVENTS.map((e, i) => (
            <div key={e.id} className="flex items-center gap-3">
              <span className={cn('grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[9px] text-micro text-white', TONE_BG[RANK_TONE[i]])}>{i + 1}</span>
              <span className="w-[200px] shrink-0 truncate text-body font-medium">{e.name}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-mist"><div className={cn('h-full rounded-full', i === 0 ? 'bg-gradient-to-r from-purple to-pink' : 'bg-gradient-to-r from-purple-soft to-purple')} style={{ width: `${(e.total / maxTotal) * 100}%` }} /></div>
              <span className={cn('w-[76px] shrink-0 text-right text-h2', i === 0 && 'text-purple-deep')}>{baht(e.total)}</span>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {EVENTS.map((e, i) => (
          <section key={e.id} className={cn('flex flex-col overflow-hidden rounded-card bg-white shadow-card', i === 0 ? 'border border-purple/50' : 'border border-line')}>
            <header className="flex items-center gap-3 px-[18px] pb-3 pt-4">
              <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl text-h2 text-white', TONE_BG[RANK_TONE[i]])}>{i + 1}</span>
              <div className="min-w-0 flex-1"><h3 className="text-h2">{e.name}</h3><p className="text-small text-ink-gray">ยอดขายรวม {baht(e.total)}</p></div>
              <Pill tone={e.current ? 'ok' : 'neutral'}>{e.current ? 'งานปัจจุบัน' : 'จบงานแล้ว'}</Pill>
            </header>
            <div className="flex flex-col gap-2 px-4 pb-4">
              <span className="text-micro text-ink-gray">สินค้าขายดี</span>
              {e.top.map((t, j) => (
                <div key={t.product} className="flex h-[58px] items-center gap-2.5 rounded-[14px] border border-line bg-canvas pl-2 pr-3">
                  <span className="w-3 text-h2 text-purple-deep">{j + 1}</span>
                  <ProductArt kind={productByName(t.product).art} className="h-[42px] w-[42px]" rounded="rounded-[11px]" />
                  <div className="min-w-0 flex-1"><div className="truncate text-body font-medium">{t.product}</div><div className="text-small text-ink-gray">{t.qty} ชิ้น</div></div>
                  <span className="text-h2 text-purple-deep">{baht(t.amount)}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Card title="คาดการณ์งานถัดไป" subtitle="จากประวัติ 3 งานที่ผ่านมาและความเร็วในการขาย" action={<Pill tone="neutral">ข้อมูลตัวอย่าง</Pill>}>
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="flex flex-col gap-2.5">
            <span className="text-micro text-ink-gray">สินค้าที่คาดว่าจะขายดีที่สุด</span>
            {picks.map((p) => {
              const prod = productByName(p.name)
              const f = forecastProduct({ left: prod.left, hourly: prod.hourly, historyRate: prod.historyRate })
              return <ForecastRow key={p.name} product={prod} forecast={{ ...f, action: 'ok' }} sub={`คาดขาย ${p.expectedQty} ชิ้นในงานถัดไป`} />
            })}
          </div>
          <div className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-canvas p-[18px]">
            <div className="flex items-start justify-between gap-2"><div><div className="text-body font-medium text-ink-gray">ยอดขายคาดการณ์งานถัดไป</div><div className="text-[30px] font-bold text-purple-deep">{baht(next.value)}</div></div><Pill tone="info">ช่วง {baht(next.low)}–{baht(next.high)}</Pill></div>
            <ProjectionChart actual={[0.18, 0.3, 0.26, 0.42, 0.4, 0.55]} projected={[0.55, 0.66, 0.62, 0.78, 0.86]} />
            <div className="flex gap-4 text-micro text-ink-gray"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-purple" />ยอดจริง</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-pink" />คาดการณ์ (ช่วงความเชื่อมั่น)</span></div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-white px-5 py-3.5 shadow-card">
        <div className="flex items-center gap-2.5"><IconChip icon={Download} size={34} /><span className="text-h2">ส่งออกรายงาน</span></div>
        {['Sales Summary', 'Expense Ledger', 'Settlement', 'Stock Movements'].map((n) => (
          <div key={n} className="flex items-center gap-2"><FileText size={16} className="text-ink-muted" /><span className="text-body font-medium text-ink-gray">{n}</span><Button size="sm" variant="ghost" icon={Download} onClick={() => toast(`ส่งออก ${n}.csv แล้ว (demo)`)}>CSV</Button></div>
        ))}
      </div>
    </>
  )
}
