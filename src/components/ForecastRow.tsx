import { Clock, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { ProductArt } from '@/components/ProductArt'
import type { Product } from '@/data/demo'
import { CONFIDENCE_LABEL, CONFIDENCE_TONE, type Forecast } from '@/data/forecast'

/** One product with its forecast: art, name, expected units / time to sell out, confidence. */
export function ForecastRow({ product, forecast, sub }: { product: Product; forecast: Forecast; sub?: string }) {
  const urgent = forecast.action === 'restock' || forecast.action === 'soldout'
  const label =
    forecast.action === 'soldout' ? 'หมดแล้ว'
    : urgent && forecast.hoursToSellOut ? `หมดใน ~${Math.max(1, Math.round(forecast.hoursToSellOut))} ชม.`
    : `+${forecast.next3h} ชิ้น`
  return (
    <div className="flex min-h-[72px] items-center gap-3.5 rounded-2xl border border-line bg-canvas py-2.5 pl-2.5 pr-4">
      <ProductArt kind={product.art} className="h-[52px] w-[52px]" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-body font-medium">{product.name}</div>
        <div className="truncate text-small text-ink-gray">{sub ?? `ขายแล้ว ${product.sold} ชิ้น · เหลือ ${product.left}`}</div>
      </div>
      <span className={cn('inline-flex items-center gap-1.5 rounded-[9px] py-[5px] pl-2 pr-2.5 text-micro', urgent ? 'bg-peach text-warn-text' : 'bg-ok-tint text-ok-text')}>
        {urgent ? <Clock size={14} /> : <TrendingUp size={14} />}
        {label}
      </span>
      <Pill tone={urgent ? 'warn' : CONFIDENCE_TONE[forecast.confidence]}>{urgent ? 'ควรเติม' : CONFIDENCE_LABEL[forecast.confidence]}</Pill>
    </div>
  )
}
