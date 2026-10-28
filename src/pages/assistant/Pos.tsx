import { useState } from 'react'
import { ArrowRight, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Stepper } from '@/components/ui/Stepper'
import { ProductArt } from '@/components/ProductArt'
import { useCart } from '@/auth/CartContext'
import { useToast } from '@/components/ui/Toast'
import { POS_PRODUCTS, PRODUCTS } from '@/data/demo'
import { forecastProduct } from '@/data/forecast'
import { bahtFull, baht } from '@/lib/format'

export default function AssistantPos() {
  const cart = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const list = (q ? PRODUCTS : POS_PRODUCTS).filter((p) => !q || [p.name, p.sku, p.owner].some((s) => s.toLowerCase().includes(q.toLowerCase())))
  const owners = new Set(cart.lines.map((l) => l.product.owner)).size
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ช่วยขาย" title="บันทึกการขาย (POS)" subtitle="รวมสินค้าได้หลายเจ้าของในบิลเดียว" />
      <div className="grid gap-5 lg:grid-cols-[1.75fr_1fr]">
        <Card title="เลือกสินค้า" subtitle="ค้นหาชื่อสินค้า SKU หรือเจ้าของ" bodyClassName="flex flex-col gap-3.5">
          <label className="flex h-[46px] items-center gap-2.5 rounded-[14px] border border-line-strong bg-canvas px-3.5">
            <Search size={16} className="text-purple" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาสินค้า, SKU หรือศิลปิน" aria-label="ค้นหาสินค้า" className="w-full bg-transparent text-body outline-none placeholder:text-ink-muted" />
          </label>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {list.map((p) => {
              const f = forecastProduct({ left: p.left, hourly: p.hourly, historyRate: p.historyRate })
              const badge = f.action === 'restock' ? <Pill tone="warn">สต็อกใกล้หมด</Pill> : f.action === 'soldout' ? <Pill tone="bad">หมด</Pill> : f.trend === 'up' ? <Pill tone="ok">คาดว่าขายดี</Pill> : null
              return (
                <article key={p.id} className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-canvas p-3">
                  <div className="relative">
                    <ProductArt kind={p.art} className="h-[92px] w-full" rounded="rounded-xl" />
                    {badge && <span className="absolute left-2.5 top-2.5">{badge}</span>}
                  </div>
                  <div><h3 className="text-h2">{p.name}</h3><p className="text-small text-ink-gray">{p.owner} · {baht(p.price)}</p></div>
                  <Button variant="ghost" size="sm" block icon={Plus} disabled={p.left === 0} onClick={() => cart.add(p)}>เพิ่ม</Button>
                </article>
              )
            })}
          </div>
        </Card>
        <Card title={`ตะกร้า · ${cart.count} ชิ้น`} subtitle={`${owners} เจ้าของ`} bodyClassName="flex flex-col gap-3">
          {cart.lines.length === 0 && <p className="py-6 text-center text-ink-gray">ยังไม่มีสินค้าในตะกร้า เลือกสินค้าจากรายการด้านซ้าย</p>}
          {cart.lines.map((l) => (
            <div key={l.product.id} className="flex items-center gap-3 rounded-2xl border border-line bg-canvas p-2.5">
              <ProductArt kind={l.product.art} className="h-14 w-14" />
              <div className="min-w-0 flex-1"><div className="truncate text-body font-medium">{l.product.name} · {l.qty}</div><div className="text-small text-ink-gray">{l.product.owner}</div></div>
              <Stepper value={l.qty} onChange={(n) => cart.setQty(l.product.id, n)} />
            </div>
          ))}
          <div className="my-1 h-px bg-line" />
          {cart.discount > 0 && (
            <>
              <div className="flex justify-between text-body text-ink-gray"><span>รวมสินค้า</span><span>{bahtFull(cart.subtotal)}</span></div>
              <div className="flex justify-between text-body text-ink-gray"><span>ส่วนลด</span><span>− {bahtFull(cart.discount)}</span></div>
            </>
          )}
          <div className="flex items-center justify-between"><span className="text-h2 text-ink-gray">ยอดสุทธิ</span><span className="text-display text-purple-deep">{bahtFull(cart.total)}</span></div>
          <Button variant="primary" size="lg" block iconRight={ArrowRight} disabled={cart.lines.length === 0} onClick={() => navigate('/assistant/payment')} className="mt-2">ไปหน้ารับชำระเงิน</Button>
          <button type="button" className="text-small text-ink-muted underline" onClick={() => { cart.clear(); toast('ล้างตะกร้าแล้ว') }}>ล้างตะกร้า</button>
        </Card>
      </div>
    </>
  )
}
