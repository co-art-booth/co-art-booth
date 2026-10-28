import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import type { Product } from '@/data/demo'
import { CONFIDENCE_LABEL, CONFIDENCE_TONE, TREND_LABEL, forecastProduct } from '@/data/forecast'

/** Forecast summary shown under a product (artist view). */
export function ForecastBlock({ product }: { product: Product }) {
  const f = forecastProduct({ left: product.left, hourly: product.hourly, historyRate: product.historyRate })
  const soldOut = f.action === 'soldout'
  const warn = soldOut || f.action === 'restock'
  const Icon = warn ? AlertTriangle : f.trend === 'down' ? TrendingDown : TrendingUp
  return (
    <div className={cn('flex flex-col gap-2 rounded-[14px] p-3.5', warn ? 'bg-peach' : 'bg-ok-tint')}>
      <div className="flex items-center justify-between gap-2">
        <span className={cn('flex items-center gap-1.5 text-body font-medium', warn ? 'text-warn-text' : 'text-ok-text')}><Icon size={16} />คาดการณ์ · {soldOut ? 'หมดแล้ว' : TREND_LABEL[f.trend]}</span>
        <Pill tone={warn ? 'warn' : CONFIDENCE_TONE[f.confidence]}>{warn ? 'ควรเติม' : CONFIDENCE_LABEL[f.confidence]}</Pill>
      </div>
      <p className="text-small">{soldOut ? `ขายครบ ${product.sold} ชิ้น` : `คาดขายอีก ${f.next3h} ชิ้นใน 3 ชม.`}</p>
      <p className="text-small text-ink-gray">
        {soldOut ? `แนะนำเติม ${Math.round(product.received)} ชิ้นก่อนงานถัดไป` : f.hoursToSellOut ? `สต็อกหมดในอีก ~${Math.max(1, Math.round(f.hoursToSellOut))} ชม.` : 'ยังไม่มีแนวโน้มการขาย'}
      </p>
    </div>
  )
}
