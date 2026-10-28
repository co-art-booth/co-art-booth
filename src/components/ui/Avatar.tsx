import { cn } from '@/lib/cn'

const GRADIENTS = [
  'from-purple to-pink', 'from-orange to-pink', 'from-purple-deep to-purple', 'from-ok to-[#6FD8B5]', 'from-pink to-orange',
]

export function Avatar({ initials, size = 36, index = 0, className }: { initials: string; size?: number; index?: number; className?: string }) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-micro text-white', GRADIENTS[index % GRADIENTS.length], className)}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  )
}
