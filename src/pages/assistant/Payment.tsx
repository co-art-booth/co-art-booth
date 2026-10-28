import { Banknote, Check, QrCode } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ProductArt } from '@/components/ProductArt'
import { QrPlaceholder } from '@/components/QrPlaceholder'
import { useCart } from '@/auth/CartContext'
import { useToast } from '@/components/ui/Toast'
import { bahtFull } from '@/lib/format'

const CASH = 500

export default function AssistantPayment() {
  const cart = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const total = cart.total
  const cash = Math.min(CASH, total)
  const promptpay = total - cash
  const paid = cash + promptpay >= total && total > 0
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ช่วยขาย" title="รับชำระเงิน" subtitle="ยืนยันเมื่อยอดรับครบและเลือกผู้ถือเงินถูกต้อง" />
      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <Card title="บิล #ORD-1049" subtitle="รองรับเงินสดและ PromptPay" action={paid ? <Pill tone="ok">ชำระครบแล้ว</Pill> : <Pill tone="warn">ยังไม่ครบ</Pill>} bodyClassName="flex flex-col gap-4">
          <div><div className="text-body font-medium text-ink-gray">ยอดสุทธิที่ต้องชำระ</div><div className="text-hero text-purple-deep">{bahtFull(total)}</div></div>
          <div className="flex h-3 gap-1" aria-hidden="true">
            <span className="rounded-full bg-cta" style={{ flexGrow: Math.max(cash, 1) }} />
            <span className="rounded-full bg-gradient-to-r from-purple to-pink" style={{ flexGrow: Math.max(promptpay, 1) }} />
          </div>
          {[[Banknote, 'orange', 'เงินสด · กองกลาง', cash, 'กองกลาง'], [QrCode, 'purple', 'PromptPay · Ploy S.', promptpay, 'Ploy S.']].map(([Icon, tone, n, a, who]) => (
            <div key={n as string} className="flex h-[72px] items-center gap-3.5 rounded-[18px] border border-line bg-canvas pl-3.5 pr-5">
              <IconChip icon={Icon as typeof Banknote} tone={tone as 'orange'} size={44} />
              <div className="flex-1"><div className="text-h2">{n as string}</div><div className="text-small text-ink-gray">ผู้ถือเงิน: {who as string}</div></div>
              <span className="text-h1">{bahtFull(a as number)}</span>
            </div>
          ))}
          <Button size="lg" block icon={Check} disabled={!paid} className="mt-2" onClick={() => { toast('บันทึกบิลและรับชำระแล้ว'); cart.clear(); navigate('/assistant') }}>ยืนยันบิล</Button>
        </Card>
        <Card title="รายการในบิล" subtitle={`#ORD-1049 · ${new Set(cart.lines.map((l) => l.product.owner)).size} เจ้าของ`} bodyClassName="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-2.5 rounded-card border border-line bg-canvas p-4">
            <span className="rounded-2xl border border-line-strong bg-white p-2.5"><QrPlaceholder size={156} /></span>
            <span className="text-body font-medium">PromptPay · Ploy S.</span>
            <span className="text-h1 text-purple-deep">{bahtFull(promptpay)}</span>
          </div>
          {cart.lines.map((l) => (
            <div key={l.product.id} className="flex items-center gap-3 rounded-2xl border border-line bg-canvas p-2.5">
              <ProductArt kind={l.product.art} className="h-12 w-12" />
              <div><div className="text-body font-medium">{l.product.name}</div><div className="text-small text-ink-gray">{l.product.owner} · × {l.qty}</div></div>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
