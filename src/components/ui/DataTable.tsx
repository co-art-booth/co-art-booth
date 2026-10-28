import type { ReactNode } from 'react'

export interface Column<T> {
  header: string
  /** CSS grid track, e.g. "250px" or "minmax(0,1fr)" */
  width?: string
  cell: (row: T, index: number) => ReactNode
}

interface Props<T> { columns: Column<T>[]; rows: T[]; rowHeight?: number; minWidth?: number }

export function DataTable<T>({ columns, rows, rowHeight = 62, minWidth = 760 }: Props<T>) {
  const template = columns.map((c) => c.width ?? 'minmax(0,1fr)').join(' ')
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>
        <div className="grid h-10 items-center gap-3 rounded-[10px] bg-mist px-4 text-micro text-ink-gray" style={{ gridTemplateColumns: template }}>
          {columns.map((c) => <div key={c.header}>{c.header}</div>)}
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid items-center gap-3 border-b border-line px-4" style={{ gridTemplateColumns: template, height: rowHeight }}>
            {columns.map((c) => <div key={c.header} className="flex min-w-0 items-center gap-2.5">{c.cell(row, i)}</div>)}
          </div>
        ))}
      </div>
    </div>
  )
}
