import { Minus, Plus } from 'lucide-react'

export function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex h-8 items-center gap-2.5 rounded-[10px] bg-mist px-2 text-purple-deep">
      <button type="button" aria-label="ลดจำนวน" className="grid h-6 w-6 place-items-center rounded-md hover:bg-white" onClick={() => onChange(value - 1)}><Minus size={14} /></button>
      <span className="min-w-4 text-center text-body font-medium text-ink">{value}</span>
      <button type="button" aria-label="เพิ่มจำนวน" className="grid h-6 w-6 place-items-center rounded-md hover:bg-white" onClick={() => onChange(value + 1)}><Plus size={14} /></button>
    </div>
  )
}
