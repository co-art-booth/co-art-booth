import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  title?: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  children?: ReactNode
  className?: string
  bodyClassName?: string
}

export function Card({ title, subtitle, action, children, className, bodyClassName }: Props) {
  return (
    <section className={cn('overflow-hidden rounded-card border border-line bg-white shadow-card', className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 px-[22px] pb-4 pt-5">
          <div className="min-w-0">
            {title && <h2 className="text-h2">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-small text-ink-gray">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cn('px-[22px] pb-[22px]', !title && !action && 'pt-[22px]', bodyClassName)}>{children}</div>
    </section>
  )
}
