import { cn } from '@/lib/cn'

export function Progress({ value, tone = 'brand', className }: { value: number; tone?: 'brand' | 'purple' | 'pink' | 'orange' | 'danger'; className?: string }) {
  const fill = {
    brand: 'from-purple to-pink', purple: 'from-purple to-purple-deep', pink: 'from-pink to-purple', orange: 'from-orange to-pink', danger: 'from-bad to-bad',
  }[tone]
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-mist', className)} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn('h-full rounded-full bg-gradient-to-r', fill)} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  )
}
