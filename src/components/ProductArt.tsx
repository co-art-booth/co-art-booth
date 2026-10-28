import { useId } from 'react'
import type { ArtKind } from '@/data/demo'
import { cn } from '@/lib/cn'

/** Illustrated product images (vector). Replace with real photos from Supabase Storage later. */
export function ProductArt({ kind, className, rounded = 'rounded-xl' }: { kind: ArtKind; className?: string; rounded?: string }) {
  const g = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className={cn('block shrink-0 overflow-hidden', rounded, className)} role="img" aria-label={`ภาพสินค้า ${kind}`}>
      {kind === 'moonlit' && (
        <>
          <defs><linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12125E" /><stop offset=".55" stopColor="#6B4DF0" /><stop offset="1" stopColor="#F062C0" /></linearGradient></defs>
          <rect width="120" height="120" fill={`url(#${g})`} />
          <circle cx="84" cy="32" r="22" fill="#FFF5E3" opacity=".18" /><circle cx="84" cy="32" r="14" fill="#FFF5E3" />
          <circle cx="30" cy="22" r="1.5" fill="#fff" /><circle cx="52" cy="40" r="1.2" fill="#fff" /><circle cx="18" cy="48" r="1" fill="#fff" /><circle cx="64" cy="14" r="1.2" fill="#fff" />
          <path d="M0 92 Q30 70 60 88 T120 80 V120 H0Z" fill="#2C1F9E" /><path d="M0 104 Q40 88 80 102 T120 98 V120 H0Z" fill="#1A1175" />
          <g stroke="#FFB24C" strokeWidth="2" strokeLinecap="round"><path d="M26 112 V96" /><path d="M46 114 V100" /><path d="M92 112 V98" /></g>
          <circle cx="26" cy="94" r="5" fill="#FFB24C" /><circle cx="46" cy="98" r="4" fill="#F062C0" /><circle cx="92" cy="96" r="5" fill="#FFF5E3" />
        </>
      )}
      {kind === 'planet' && (
        <>
          <defs><linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB24C" /><stop offset="1" stopColor="#F062C0" /></linearGradient></defs>
          <rect width="120" height="120" fill="#FFF0FA" /><circle cx="60" cy="60" r="48" fill="#FFE0F4" /><circle cx="60" cy="60" r="24" fill={`url(#${g})`} />
          <ellipse cx="60" cy="60" rx="44" ry="12" transform="rotate(-22 60 60)" fill="none" stroke="#7C5CFF" strokeWidth="5" />
          <path d="M42 68 Q60 78 80 64" stroke="#fff" strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round" />
          <circle cx="22" cy="24" r="2" fill="#7C5CFF" /><circle cx="98" cy="30" r="2.5" fill="#FFB24C" /><circle cx="96" cy="94" r="1.8" fill="#F062C0" />
        </>
      )}
      {kind === 'postcard' && (
        <>
          <rect width="120" height="120" fill="#EEE9FF" />
          <g transform="rotate(-6 60 60)">
            <rect x="14" y="26" width="92" height="68" rx="6" fill="#FFF5E3" stroke="#DDD5FF" strokeWidth="2" />
            <rect x="86" y="32" width="14" height="16" rx="2" fill="none" stroke="#F062C0" strokeWidth="1.6" strokeDasharray="3 2" />
            <circle cx="34" cy="52" r="9" fill="#B9A6FF" /><circle cx="46" cy="46" r="11" fill="#B9A6FF" /><circle cx="58" cy="53" r="8" fill="#B9A6FF" /><rect x="28" y="52" width="36" height="9" rx="4.5" fill="#B9A6FF" />
            <g stroke="#7C5CFF" strokeWidth="2.4" strokeLinecap="round"><path d="M32 70 l-3 9" /><path d="M42 70 l-3 9" /><path d="M52 70 l-3 9" /></g>
            <path d="M70 74 h28 M70 82 h20" stroke="#DDD5FF" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </>
      )}
      {kind === 'tote' && (
        <>
          <defs><linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7C5CFF" /><stop offset="1" stopColor="#3B25A8" /></linearGradient></defs>
          <rect width="120" height="120" fill="#E9E4FF" />
          <path d="M42 44 C42 20 78 20 78 44" fill="none" stroke="#3B25A8" strokeWidth="5" strokeLinecap="round" />
          <path d="M26 44 H94 L100 106 Q100 110 96 110 H24 Q20 110 20 106Z" fill={`url(#${g})`} />
          <circle cx="60" cy="76" r="14" fill="#FFF5E3" /><circle cx="66" cy="72" r="12" fill="#5A3DE0" />
          <circle cx="82" cy="58" r="1.8" fill="#fff" /><circle cx="38" cy="92" r="1.5" fill="#fff" />
        </>
      )}
      {kind === 'sticker' && (
        <>
          <defs><radialGradient id={g}><stop offset="0" stopColor="#FFD27A" /><stop offset="1" stopColor="#FF9F2E" /></radialGradient></defs>
          <rect width="120" height="120" fill="#FFF5E3" /><circle cx="60" cy="60" r="46" fill="#fff" stroke="#FFE3B5" strokeWidth="3" />
          <g stroke="#FFB24C" strokeWidth="4" strokeLinecap="round"><path d="M60 18 v8" /><path d="M60 94 v8" /><path d="M18 60 h8" /><path d="M94 60 h8" /><path d="M30 30 l6 6" /><path d="M84 84 l6 6" /><path d="M90 30 l-6 6" /><path d="M36 84 l-6 6" /></g>
          <circle cx="60" cy="60" r="20" fill={`url(#${g})`} /><circle cx="53" cy="56" r="2.4" fill="#0B0F4F" /><circle cx="67" cy="56" r="2.4" fill="#0B0F4F" />
          <path d="M52 66 Q60 73 68 66" stroke="#0B0F4F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>
      )}
      {kind === 'notes' && (
        <>
          <defs><linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E9E6FF" /><stop offset="1" stopColor="#C9BBFF" /></linearGradient></defs>
          <rect width="120" height="120" fill={`url(#${g})`} />
          <g fill="none" strokeWidth="3" strokeLinecap="round"><path d="M10 78 Q25 62 40 78 T70 78 T110 78" stroke="#3B25A8" /><path d="M10 92 Q25 76 40 92 T70 92 T110 92" stroke="#7C5CFF" /><path d="M10 106 Q25 90 40 106 T70 106 T110 106" stroke="#F062C0" /></g>
          <g fill="#0B0F4F"><ellipse cx="44" cy="42" rx="7" ry="5.5" transform="rotate(-20 44 42)" /><ellipse cx="78" cy="34" rx="7" ry="5.5" transform="rotate(-20 78 34)" /><rect x="49" y="18" width="3" height="24" /><rect x="83" y="10" width="3" height="24" /><path d="M49 18 L86 10 V16 L49 24Z" /></g>
        </>
      )}
    </svg>
  )
}
