import type { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, subtitle, actions }: { eyebrow: string; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist py-[5px] pl-2.5 pr-3 text-micro uppercase text-purple-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-purple" />
          {eyebrow}
        </span>
        <h1 className="text-display">{title}</h1>
        <span className="h-1 w-14 rounded-full bg-underline" />
        {subtitle && <p className="text-ink-gray">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  )
}
