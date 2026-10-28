import { Banknote, CalendarCheck, CreditCard, RotateCcw, ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Metric } from '@/components/ui/Metric'
import { Card } from '@/components/ui/Card'
import { TaskRow } from '@/components/ui/TaskRow'
import { Pill } from '@/components/ui/Pill'
import { QuickAction } from '@/components/ui/QuickAction'
import { ProductArt } from '@/components/ProductArt'
import { POS_PRODUCTS } from '@/data/demo'
import { baht } from '@/lib/format'

export default function AssistantDashboard() {
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ช่วยขาย" title="ภาพรวมการขาย" subtitle="งานที่ต้องทำระหว่างเปิดบูธ" />
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <Metric hero icon={Banknote} label="ยอดขายวันนี้" value="฿10,830" sub="42 บิล" spark={[0.2, 0.35, 0.3, 0.55, 0.6, 0.85, 0.95]} />
        <Metric icon={CreditCard} tone="pink" label="รอชำระ" value="3 บิล" sub="มูลค่า ฿1,240" spark={[0.5, 0.4, 0.55, 0.45, 0.5, 0.6]} />
        <Metric icon={CalendarCheck} tone="orange" label="Pre-order รอรับ" value="4 รายการ" sub="ลูกค้านัดรับวันนี้" spark={[0.3, 0.4, 0.4, 0.6, 0.55, 0.75]} />
        <Metric icon={RotateCcw} tone="red" label="รายการคืนวันนี้" value="1 รายการ" sub="ต้องตรวจหลักฐาน" spark={[0.2, 0.2, 0.4, 0.3, 0.3, 0.5]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card title="คิวงานหน้าร้าน" subtitle="อัปเดตจาก POS แบบ real-time" action={<Pill tone="ok">real-time</Pill>} bodyClassName="flex flex-col gap-3">
          <TaskRow n={1} tone="purple" text="เตรียม Pre-order ที่ลูกค้านัดรับ" right={<Pill tone="info">วันนี้</Pill>} />
          <TaskRow n={2} tone="orange" text="ตรวจรายการชำระเงินที่ยังไม่ครบ" right={<Pill tone="warn">รอชำระ</Pill>} />
          <TaskRow n={3} tone="pink" text="ส่งต่อรายการคืนให้ผู้จัดการตรวจสอบ" right={<Pill tone="bad">รอตรวจ</Pill>} />
        </Card>
        <Card title="สินค้าพร้อมขาย" subtitle="เลือกเพิ่มลงตะกร้าใน POS" bodyClassName="grid gap-3 sm:grid-cols-2">
          {POS_PRODUCTS.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-line bg-canvas p-2.5">
              <ProductArt kind={p.art} className="h-16 w-16" />
              <div className="min-w-0"><div className="truncate text-body font-medium">{p.name}</div><div className="text-small text-ink-gray">{p.owner} · {baht(p.price)}</div></div>
            </div>
          ))}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAction primary to="/assistant/pos" icon={ShoppingCart} label="เปิด POS" desc="บันทึกการขายหน้าร้าน" />
        <QuickAction to="/assistant/preorders" icon={CalendarCheck} label="ดู Pre-order" desc="รับสินค้าและเปลี่ยนเป็นบิลขาย" />
      </div>
    </>
  )
}
