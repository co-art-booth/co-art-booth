import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Banknote, Check, ChevronDown, Clock, Package, Receipt, RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ProductArt } from '@/components/ProductArt'
import { useToast } from '@/components/ui/Toast'
import { useCart } from '@/auth/CartContext'
import { productByName } from '@/data/demo'
import { bahtFull } from '@/lib/format'
import { cn } from '@/lib/cn'

const REASONS = ['ลูกค้าคืนสินค้า', 'สินค้าชำรุด', 'สั่งผิดรายการ']

export default function AssistantReturns() {
  const toast = useToast()
  const navigate = useNavigate()
  const { subtotal, total } = useCart()
  const [reason, setReason] = useState('')
  const product = productByName('Tiny Planet Pin')
  // Refund = unit price x share of the bill that was actually paid (after discount). 220 x 870/920 -> 208.
  const ratio = subtotal > 0 ? total / subtotal : 870 / 920
  const refund = Math.floor(product.price * ratio)
  const submit = (e: FormEvent) => { e.preventDefault(); toast('ส่งรายการคืนให้ผู้จัดการแล้ว'); navigate('/assistant') }
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ช่วยขาย" title="คืนสินค้า" subtitle="บันทึกเหตุผลและส่งต่อให้ผู้จัดการอนุมัติ" actions={<Button icon={RotateCcw} disabled={!reason} onClick={submit as never}>ส่งรายการคืน</Button>} />
      <div className="grid gap-5 lg:grid-cols-[1.75fr_1fr]">
        <form onSubmit={submit}>
          <Card title="สร้างรายการคืนสินค้า" subtitle="อ้างอิงบิลเดิมและรับสินค้าเข้าสต็อกตามจริง" bodyClassName="flex flex-col gap-4">
            <label className="flex flex-col gap-2"><span className="text-body font-medium text-ink-gray">เลขบิล</span><span className="flex h-[54px] items-center gap-3 rounded-[14px] border border-line-strong bg-canvas px-4"><Receipt size={18} className="text-purple" /><span className="text-body font-medium">#ORD-1049</span></span></label>
            <div className="flex flex-col gap-2"><span className="text-body font-medium text-ink-gray">สินค้าที่คืน</span><div className="flex items-center gap-3.5 rounded-[14px] border border-line-strong bg-canvas p-2.5"><ProductArt kind={product.art} className="h-14 w-14" /><div><div className="text-h2">{product.name} × 1</div><div className="text-small text-ink-gray">{product.owner} · ฿{product.price}</div></div></div></div>
            <div className="flex flex-col gap-2"><span className="text-body font-medium text-ink-gray">เงินคืน</span><span className="flex h-[54px] items-center gap-3 rounded-[14px] border border-line-strong bg-canvas px-4"><Banknote size={18} className="text-orange" /><span className="text-h1 text-purple-deep">{bahtFull(refund)}</span></span></div>
            <label className="flex flex-col gap-2"><span className="text-body font-medium text-ink-gray">เหตุผลการคืน</span>
              <span className="relative flex h-[54px] items-center rounded-[14px] border border-line-strong bg-canvas px-4 focus-within:border-purple focus-within:ring-4 focus-within:ring-purple/20">
                <select value={reason} onChange={(e) => setReason(e.target.value)} required className={cn('w-full appearance-none bg-transparent text-body outline-none', !reason && 'text-ink-muted')}>
                  <option value="">ระบุเหตุผลการคืนสินค้า</option>{REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-4 text-ink-muted" />
              </span>
            </label>
            <div className="flex items-center gap-2.5"><span className="text-body font-medium text-ink-gray">สถานะ</span><Pill tone="warn">รอผู้จัดการตรวจสอบ</Pill></div>
          </Card>
        </form>
        <Card title="ขั้นตอนการอนุมัติ" subtitle="ผู้ช่วยขายส่งต่อ ผู้จัดการอนุมัติ" bodyClassName="flex flex-col gap-3.5">
          {[[Check, 'บันทึกเหตุผล', 'ผู้ช่วยขาย', 'green', true], [Clock, 'ส่งต่อให้ผู้จัดการ', 'รอผู้จัดการตรวจสอบ', 'orange', false], [Package, 'อนุมัติและรับสินค้าเข้าสต็อก', 'ตามจริง', 'purple', false]].map(([Icon, t, s, tone, done], i) => (
            <div key={t as string} className={cn('flex items-center gap-3.5 rounded-[18px] border p-3.5', i === 1 ? 'border-orange/70 bg-white' : 'border-line bg-canvas', done && 'bg-white')}>
              <IconChip icon={Icon as typeof Check} tone={tone as 'green'} size={40} />
              <div><div className="text-body font-medium">{t as string}</div><div className="text-small text-ink-gray">{s as string}</div></div>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
