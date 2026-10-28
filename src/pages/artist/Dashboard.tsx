import { Banknote, CalendarCheck, Package, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Metric } from '@/components/ui/Metric'
import { Card } from '@/components/ui/Card'
import { TaskRow } from '@/components/ui/TaskRow'
import { Pill } from '@/components/ui/Pill'
import { Progress } from '@/components/ui/Progress'
import { QuickAction } from '@/components/ui/QuickAction'
import { ProductArt } from '@/components/ProductArt'
import { MY_PRODUCTS } from '@/data/demo'
import { baht } from '@/lib/format'

export default function ArtistDashboard() {
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ศิลปิน / เจ้าของบูธ" title="ภาพรวมของฉัน" subtitle="ดูสินค้า สต็อก Pre-order และรายได้ของตัวเอง" />
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <Metric hero icon={Banknote} label="ยอดขายของฉัน" value="฿5,000" sub="หลังหักคืนสินค้า" spark={[0.2, 0.3, 0.4, 0.5, 0.65, 0.9]} />
        <Metric icon={Package} tone="pink" label="สินค้าคงเหลือ" value="20 ชิ้น" sub="จาก 50 ชิ้นที่รับเข้า" spark={[0.9, 0.8, 0.7, 0.55, 0.45, 0.4]} />
        <Metric icon={CalendarCheck} tone="orange" label="Pre-order" value="4 รายการ" sub="รอรับ 2 รายการ" spark={[0.3, 0.4, 0.4, 0.6, 0.6, 0.75]} />
        <Metric icon={Wallet} tone="green" label="รอรับเงิน" value="฿4,000" sub="หลังหักค่าใช้จ่าย" spark={[0.3, 0.45, 0.4, 0.6, 0.7, 0.8]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Card title="สิ่งที่ต้องจัดการ" subtitle="งานของศิลปินในวันนี้" bodyClassName="flex flex-col gap-3">
          <TaskRow n={1} tone="purple" text="ตรวจจำนวนสินค้าหน้าบูธก่อนเปิดขาย" />
          <TaskRow n={2} tone="orange" text="เตรียมสินค้า Pre-order ที่ลูกค้านัดรับ" />
          <TaskRow n={3} tone="pink" text="ตรวจยอดขายและยอดที่ต้องรับใน Settlement" />
        </Card>
        <Card title="สินค้าของฉัน" subtitle="ราคาและสต็อกแยกตาม SKU" bodyClassName="flex flex-col gap-2.5">
          {MY_PRODUCTS.map((p) => (
            <div key={p.id} className="flex h-[70px] items-center gap-3.5 rounded-2xl border border-line bg-canvas pl-2.5 pr-4">
              <ProductArt kind={p.art} className="h-[50px] w-[50px]" />
              <div className="min-w-0 flex-1"><div className="truncate text-body font-medium">{p.name}</div><div className="text-small text-ink-gray">{p.sku} · {baht(p.price)}</div></div>
              <div className="flex w-[120px] flex-col gap-1.5"><span className={p.left ? 'text-micro' : 'text-micro text-bad'}>คงเหลือ {p.left}</span><Progress value={p.left / p.received} tone={p.left ? 'brand' : 'danger'} /></div>
              <Pill tone={p.left ? 'ok' : 'bad'}>{p.left ? 'พร้อมขาย' : 'หมด'}</Pill>
            </div>
          ))}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAction primary to="/artist/products" icon={Package} label="จัดการสินค้า" desc="ราคา สต็อก และ SKU" />
        <QuickAction to="/artist/preorders" icon={CalendarCheck} label="ดู Pre-order" desc="รายการจองของลูกค้า" />
      </div>
    </>
  )
}
