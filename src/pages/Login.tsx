import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { ROLES, isRole } from '@/roles'
import { useAuth } from '@/auth/AuthContext'
import { BrandMark, DiscordLogo, GoogleLogo } from '@/components/BrandMark'
import { IconChip } from '@/components/ui/IconChip'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { ProductArt } from '@/components/ProductArt'
import type { ArtKind } from '@/data/demo'
import { cn } from '@/lib/cn'

const FLOATING: { art: ArtKind; name: string; price: string; cls: string }[] = [
  { art: 'planet', name: 'Tiny Planet Pin', price: '฿220', cls: '-rotate-[7deg]' },
  { art: 'moonlit', name: 'Moonlit Garden', price: '฿480', cls: 'rotate-[3deg] -translate-y-4' },
  { art: 'postcard', name: 'Rainy Day Postcard', price: '฿95', cls: 'rotate-[9deg] translate-y-3' },
]

export default function Login() {
  const { role: param } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('mew@coart.studio')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  if (!isRole(param)) return <Navigate to="/" replace />
  const cfg = ROLES[param]

  const enter = async (opts?: Parameters<typeof auth.signIn>[1]) => {
    setError(null)
    try {
      await auth.signIn(param, opts)
      if (auth.demo || !opts?.provider) navigate(cfg.base)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'เข้าสู่ระบบไม่สำเร็จ ตรวจสอบอีเมลและรหัสผ่านอีกครั้ง')
    }
  }
  const onSubmit = (e: FormEvent) => { e.preventDefault(); void enter({ email, password }) }

  return (
    <div className="grid min-h-screen lg:grid-cols-[620px_1fr]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-navy-deep via-purple-dark to-purple p-14 text-white lg:flex lg:flex-col">
        <span className="absolute -right-20 bottom-10 h-[520px] w-[520px] rounded-full bg-pink/40 blur-3xl" />
        <span className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-orange/25 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-3.5">
          <BrandMark size={46} />
          <span><span className="block text-h1">Co-Art Booth</span><span className="text-small text-ink-ondark">ระบบจัดการบูธศิลปะ</span></span>
        </Link>
        <div className="relative mt-[110px] flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2.5 pr-3.5 text-micro"><cfg.icon size={14} />{cfg.label}</span>
          <h1 className="whitespace-pre-line text-hero">{cfg.statement}</h1>
          <p className="text-ink-ondark">เข้าสู่ระบบตามสิทธิ์ของคุณ</p>
        </div>
        <div className="relative mt-auto flex items-end justify-center gap-0 pb-6 pt-12">
          {FLOATING.map((p) => (
            <div key={p.name} className={cn('-mx-2 flex w-[158px] flex-col gap-2 rounded-card bg-white p-2 text-navy shadow-raised', p.cls)}>
              <ProductArt kind={p.art} className="h-32 w-full" rounded="rounded-[14px]" />
              <div className="px-1 pb-1"><div className="truncate text-body font-medium">{p.name}</div><div className="text-h2 text-purple-deep">{p.price}</div></div>
            </div>
          ))}
        </div>
        <div className="relative flex items-center gap-2.5 border-t border-white/20 pt-5 text-body text-ink-ondark"><CalendarCheck size={18} /> Bangkok Art Book Fair 2026</div>
      </aside>

      <main className="relative grid place-items-center overflow-hidden bg-canvas p-6">
        <span className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-purple/15 blur-3xl" />
        <form onSubmit={onSubmit} className="relative w-full max-w-[480px] rounded-hero border border-line bg-white p-10 shadow-raised">
          <div className="flex items-center gap-2"><IconChip icon={cfg.icon} size={28} /><span className="text-body font-medium text-purple-deep">{cfg.label}</span></div>
          <h2 className="mt-2 text-display">เข้าสู่ระบบ</h2>
          <p className="mt-2 text-ink-gray">ใช้บัญชีที่ได้รับสิทธิ์สำหรับการทำงานในระบบ</p>
          <div className="mt-6 flex flex-col gap-4">
            <TextField label="อีเมล" icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <TextField
              label="รหัสผ่าน" icon={Lock} type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••" autoComplete="current-password"
              right={<button type="button" aria-label={show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'} onClick={() => setShow((s) => !s)} className="text-ink-muted">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
            />
          </div>
          {error && <p role="alert" className="mt-3 text-small text-bad">{error}</p>}
          <Button type="submit" size="lg" block iconRight={ArrowRight} className="mt-6">เข้าสู่ระบบ</Button>
          <div className="my-5 flex items-center gap-3 text-small text-ink-muted"><span className="h-px flex-1 bg-line" />หรือเข้าสู่ระบบด้วย<span className="h-px flex-1 bg-line" /></div>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => void enter({ provider: 'google' })} className="flex h-[50px] items-center justify-center gap-2.5 rounded-[14px] border border-line-strong bg-white text-[13px] font-semibold shadow-card transition hover:bg-mist"><GoogleLogo />Google</button>
            <button type="button" onClick={() => void enter({ provider: 'discord' })} className="flex h-[50px] items-center justify-center gap-2.5 rounded-[14px] border border-line-strong bg-white text-[13px] font-semibold shadow-card transition hover:bg-mist"><DiscordLogo />Discord</button>
          </div>
          <p className="mt-5 text-center text-small text-ink-gray">ติดต่อผู้ดูแลระบบหากเข้าใช้งานไม่ได้</p>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-ok-tint px-3.5 py-2.5 text-small text-ok-text"><ShieldCheck size={16} className="text-ok" />เข้าระบบอย่างปลอดภัยด้วย Role-based access</div>
          {auth.demo && <p className="mt-3 text-center text-small text-ink-muted">โหมด demo: กด “เข้าสู่ระบบ” ได้เลย ไม่ต้องกรอกรหัสผ่าน</p>}
        </form>
      </main>
    </div>
  )
}
