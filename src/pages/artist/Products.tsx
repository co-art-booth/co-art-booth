import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { Progress } from '@/components/ui/Progress'
import { useToast } from '@/components/ui/Toast'
import { ProductArt } from '@/components/ProductArt'
import { ForecastBlock } from '@/components/ForecastBlock'
import { MY_PRODUCTS } from '@/data/demo'
import { baht } from '@/lib/format'

export default function ArtistProducts() {
  const toast = useToast()
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ศิลปิน / เจ้าของบูธ" title="สินค้าและสต็อก" subtitle="สินค้าของคุณเท่านั้น · ทุก movement มีเหตุผล"
        actions={<><Button variant="secondary" icon={Plus} onClick={() => toast('รับเข้าสต็อกแล้ว (demo)')}>รับเข้าสต็อก</Button><Button icon={Plus} onClick={() => toast('เพิ่มสินค้าแล้ว (demo)')}>เพิ่มสินค้า</Button></>}
      />
      <Card title="แคตตาล็อกสินค้าของฉัน" subtitle="ราคาและสต็อกแยกตาม SKU">
        <div className="grid gap-4 lg:grid-cols-3">
          {MY_PRODUCTS.map((p) => (
            <article key={p.id} className="flex flex-col gap-3 rounded-card border border-line bg-canvas p-3">
              <ProductArt kind={p.art} className="h-[196px] w-full" rounded="rounded-[14px]" />
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1"><h3 className="text-h2">{p.name}</h3><Chip tone="plain" className="w-fit bg-white">{p.sku}</Chip></div>
                <span className="text-h1 text-purple-deep">{baht(p.price)}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[['รับเข้า', p.received], ['ขายแล้ว', p.sold], ['คงเหลือ', p.left]].map(([l, v]) => (
                  <div key={l as string} className="rounded-xl border border-line bg-white px-3 py-2.5"><div className="text-micro text-ink-gray">{l as string}</div><div className={l === 'คงเหลือ' && !v ? 'text-h1 text-bad' : 'text-h1'}>{v as number}</div></div>
                ))}
              </div>
              <Progress value={p.left / p.received} tone={p.left ? 'brand' : 'danger'} />
              <ForecastBlock product={p} />
              <Pill tone={p.left ? 'ok' : 'bad'} className="w-fit">{p.left ? 'พร้อมขาย' : 'หมด'}</Pill>
            </article>
          ))}
        </div>
      </Card>
    </>
  )
}
