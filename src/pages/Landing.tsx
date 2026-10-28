import { Link } from 'react-router-dom'
import { ArrowRight, Banknote, Check, KeyRound, Package, ShieldCheck, ShoppingCart, TrendingUp } from 'lucide-react'
import { ROLE_LIST } from '@/roles'
import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/ui/Button'
import { IconChip } from '@/components/ui/IconChip'
import { Pill } from '@/components/ui/Pill'
import { ProductArt } from '@/components/ProductArt'
import { AreaChart } from '@/components/charts/AreaChart'
import { ForecastRow } from '@/components/ForecastRow'
import { forecastProduct } from '@/data/forecast'
import { productByName } from '@/data/demo'
import { cn } from '@/lib/cn'
import { TONE_BG, type Tone } from '@/lib/tone'
import type { LucideIcon } from 'lucide-react'

const FEATURES: { icon: LucideIcon; title: string; desc: string; tone: Tone; hero?: boolean }[] = [
  { icon: ShoppingCart, title: 'POS และ Pre-order', desc: 'ขายหลายเจ้าของในบิลเดียว รับเงินสดและ PromptPay จัดการ Pre-order หน้าร้าน', tone: 'purple' },
  { icon: Package, title: 'สต็อกและยอดขายรายศิลปิน', desc: 'ศิลปินเห็นเฉพาะสินค้าและยอดของตัวเอง ทุก movement มีเหตุผล', tone: 'pink' },
  { icon: Banknote, title: 'ปิดยอดและแบ่งเงิน', desc: 'คำนวณยอดจ่ายรายคนจากยอดขาย ค่าใช้จ่ายและสำรองจ่าย พร้อมตรวจ variance', tone: 'orange' },
  { icon: ShieldCheck, title: 'Audit trail', desc: 'บันทึกทุกการเปลี่ยนแปลงแบบ append-only ไม่แก้ไขหรือลบย้อนหลัง', tone: 'green' },
  { icon: TrendingUp, title: 'คาดการณ์สินค้าขายดี', desc: 'แนวโน้มรายชั่วโมง สต็อกจะหมดเมื่อไหร่ และเทียบกับงานก่อนหน้า', tone: 'purple', hero: true },
  { icon: KeyRound, title: 'เข้าสู่ระบบด้วย Google / Discord', desc: 'สิทธิ์ตามบทบาท 4 แบบ ตรวจสอบที่ฐานข้อมูลทุกครั้ง', tone: 'purple' },
]
const STEPS = [
  { t: 'สร้างบูธ', d: 'ตั้งชื่องาน เชิญทีมงานและกำหนดบทบาท', tone: 'purple' as Tone },
  { t: 'เพิ่มสินค้า', d: 'ศิลปินเพิ่มสินค้าและรับเข้าสต็อก', tone: 'pink' as Tone },
  { t: 'ขายหน้าร้าน', d: 'POS Pre-order และรับชำระเงิน', tone: 'orange' as Tone },
  { t: 'ปิดยอดและแบ่งเงิน', d: 'คำนวณยอดจ่ายรายคนอัตโนมัติ', tone: 'green' as Tone },
]

const SectionHead = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <span className="rounded-full bg-mist px-3.5 py-1.5 text-micro text-purple-deep">{eyebrow}</span>
    <h2 className="text-display">{title}</h2>
    {sub && <p className="max-w-xl text-[15px] text-ink-gray">{sub}</p>}
  </div>
)

export default function Landing() {
  const showcase = ['Moonlit Garden', 'Tiny Planet Pin', 'Blue Hour Tote'].map((n) => {
    const p = productByName(n)
    return { p, f: forecastProduct({ left: p.left, hourly: p.hourly, historyRate: p.historyRate }) }
  })
  return (
    <div className="bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[84px] max-w-[1200px] items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-3"><BrandMark size={42} /><span className="text-h1">Co-Art Booth</span></Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="ส่วนของหน้า">
            {[['ฟีเจอร์', '#features'], ['บทบาท', '#roles'], ['คาดการณ์', '#forecast'], ['ขั้นตอน', '#steps']].map(([l, h]) => <a key={h} href={h} className="text-body font-medium text-ink-gray hover:text-purple-deep">{l}</a>)}
          </nav>
          <div className="flex items-center gap-3"><Button variant="secondary" to="/login/manager" className="hidden sm:inline-flex">เข้าสู่ระบบ</Button><Button to="/login/manager">เริ่มใช้งาน</Button></div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <span className="absolute -right-20 -top-32 h-[700px] w-[700px] rounded-full bg-purple/15 blur-3xl" />
        <span className="absolute -left-40 top-80 h-[560px] w-[560px] rounded-full bg-pink/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 lg:min-h-[660px] lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mist py-[7px] pl-3 pr-3.5 text-micro text-purple-deep"><span className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-purple to-pink" />ระบบจัดการบูธศิลปะสำหรับศิลปินและทีมงาน</span>
            <h1 className="whitespace-pre-line text-[40px] font-bold leading-[1.28] md:text-[52px]">{'จัดการบูธศิลปะ\nขายง่าย แบ่งเงินโปร่งใส'}</h1>
            <span className="h-1.5 w-[88px] rounded-full bg-underline" />
            <p className="max-w-[560px] text-[17px] leading-relaxed text-ink-gray">ขายหน้าบูธด้วย POS และ Pre-order ติดตามสต็อกรายศิลปิน ปิดยอดและแบ่งเงินอัตโนมัติ พร้อมคาดการณ์ว่าสินค้าไหนจะขายดี</p>
            <div className="flex flex-wrap gap-3.5"><Button size="lg" iconRight={ArrowRight} to="/login/manager">เริ่มใช้งาน</Button><Button size="lg" variant="secondary" to="/login/manager">เข้าสู่ระบบ</Button></div>
            <ul className="flex flex-wrap gap-x-[18px] gap-y-2">{['POS + Pre-order', 'Audit trail', 'เข้าด้วย Google / Discord'].map((t) => <li key={t} className="flex items-center gap-1.5 text-body font-medium text-ink-gray"><Check size={16} className="text-ok" strokeWidth={2.5} />{t}</li>)}</ul>
          </div>
          <div className="relative mx-auto h-[500px] w-full max-w-[520px]" aria-hidden="true">
            <div className="absolute left-0 top-[70px] w-[400px] max-w-[78%] rounded-hero border border-line bg-white p-6 shadow-raised">
              <div className="flex items-center justify-between"><span className="text-body font-medium text-ink-gray">ยอดขายวันนี้</span><Pill tone="ok">real-time</Pill></div>
              <div className="mt-2 text-hero text-navy">฿10,830</div>
              <AreaChart values={[0.15, 0.3, 0.25, 0.5, 0.42, 0.7, 0.62, 0.92]} width={350} height={110} />
              <div className="mt-3 grid grid-cols-3 gap-2.5">{[['บิล', '42'], ['Pre-order', '4'], ['สต็อกใกล้หมด', '2']].map(([l, v]) => <div key={l} className="rounded-[14px] border border-line bg-canvas px-3 py-2.5"><div className="text-micro text-ink-gray">{l}</div><div className="text-h1">{v}</div></div>)}</div>
            </div>
            {[{ k: 'planet' as const, n: 'Tiny Planet Pin', p: '฿220', c: 'right-0 top-0 rotate-[7deg]' }, { k: 'moonlit' as const, n: 'Moonlit Garden', p: '฿480', c: 'right-0 top-[270px] -rotate-6' }].map((c) => (
              <div key={c.n} className={cn('absolute w-[156px] rounded-card bg-white p-2 shadow-raised', c.c)}><ProductArt kind={c.k} className="h-[120px] w-full" rounded="rounded-[14px]" /><div className="px-1 pb-1 pt-2"><div className="truncate text-body font-medium">{c.n}</div><div className="text-h2 text-purple-deep">{c.p}</div></div></div>
            ))}
            <div className="absolute bottom-10 left-2 flex items-center gap-2.5 rounded-[18px] border border-line bg-white py-2.5 pl-2.5 pr-4 shadow-raised"><IconChip icon={TrendingUp} tone="green" size={34} /><div><div className="text-micro text-ok-text">คาดว่าขายดี</div><div className="text-body font-medium">Moonlit Garden ↗</div></div></div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto flex max-w-[1200px] flex-col gap-11 px-5 py-[88px]">
        <SectionHead eyebrow="ฟีเจอร์" title="ทุกอย่างที่บูธศิลปะต้องใช้ ในที่เดียว" sub="ตั้งแต่ขายหน้าร้านจนถึงปิดยอดแบ่งเงิน ทุกขั้นตอนตรวจสอบย้อนหลังได้" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className={cn('relative flex min-h-[210px] flex-col gap-3.5 overflow-hidden rounded-3xl p-[26px]', f.hero ? 'bg-brand text-white shadow-glow-purple' : 'border border-line bg-white shadow-card')}>
              <IconChip icon={f.icon} size={52} tone={f.hero ? 'glass' : f.tone} />
              <h3 className="text-h1">{f.title}</h3>
              <p className={cn('leading-relaxed', f.hero ? 'text-white/90' : 'text-ink-gray')}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roles" className="bg-mist">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-11 px-5 py-[88px]">
          <SectionHead eyebrow="เลือกบทบาทของคุณ" title="ทุกคนในบูธ เห็นเฉพาะสิ่งที่ต้องใช้" sub="เลือกบทบาทเพื่อเข้าสู่ระบบ แต่ละบทบาทมีเมนูและสิทธิ์ต่างกัน" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ROLE_LIST.map((r) => (
              <article key={r.key} className="flex flex-col gap-3.5 rounded-3xl border border-line bg-white p-6 shadow-card">
                <IconChip icon={r.icon} tone={r.tone} size={54} glow />
                <h3 className="text-h1">{r.label}</h3>
                <ul className="flex flex-col gap-2.5">{r.bullets.map((b) => <li key={b} className="flex gap-2 text-ink-gray"><Check size={16} className="mt-0.5 shrink-0 text-ok" strokeWidth={2.5} />{b}</li>)}</ul>
                <Button variant="secondary" block iconRight={ArrowRight} to={`/login/${r.key}`} className="mt-auto">เข้าสู่ระบบ</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="forecast" className="mx-auto grid max-w-[1200px] items-center gap-16 px-5 py-24 lg:grid-cols-[480px_1fr]">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-mist px-3.5 py-1.5 text-micro text-purple-deep">Sales forecast</span>
          <h2 className="whitespace-pre-line text-[38px] font-bold leading-[1.3]">{'รู้ก่อนว่าสินค้าไหน\nจะขายดี'}</h2>
          <p className="text-[15px] leading-relaxed text-ink-gray">ระบบวิเคราะห์ความเร็วในการขายและประวัติจากงานก่อนหน้า เพื่อบอกว่าควรเตรียมสินค้าไหนเพิ่ม และสินค้าไหนใกล้หมด</p>
          <ul className="flex flex-col gap-3">{['แนวโน้มยอดขายรายชั่วโมงและรายวัน', 'คาดว่าสต็อกจะหมดเมื่อไหร่', 'เทียบกับงานก่อนหน้าและงานถัดไป', 'บอกระดับความมั่นใจของการคาดการณ์'].map((b) => <li key={b} className="flex items-center gap-2.5 text-body font-medium"><IconChip icon={Check} tone="green" size={22} />{b}</li>)}</ul>
        </div>
        <div className="overflow-hidden rounded-hero border border-line bg-white shadow-raised">
          <div className="flex items-center justify-between px-[26px] pb-3.5 pt-[22px]"><div><h3 className="text-h1">คาดการณ์สินค้าขายดี</h3><p className="text-small text-ink-gray">ช่วง 3 ชั่วโมงถัดไป · อัปเดตจากยอดขายล่าสุด</p></div><Pill tone="ok">real-time</Pill></div>
          <div className="flex flex-col gap-2.5 px-[26px] pb-[26px]">{showcase.map(({ p, f }) => <ForecastRow key={p.id} product={p} forecast={f} />)}</div>
        </div>
      </section>

      <section id="steps" className="bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-11 px-5 py-[88px]">
          <SectionHead eyebrow="ขั้นตอนใช้งาน" title="เริ่มได้ใน 4 ขั้นตอน" />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex flex-col gap-3 rounded-3xl border border-line bg-canvas p-6">
                <span className={cn('grid h-12 w-12 place-items-center rounded-2xl text-h1 text-white shadow-glow-purple', TONE_BG[s.tone])}>{i + 1}</span>
                <h3 className="text-h1">{s.t}</h3><p className="text-ink-gray">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 pb-[88px]">
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-[18px] overflow-hidden rounded-[36px] bg-brand px-8 py-14 text-center text-white shadow-glow-purple">
          <span className="absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full bg-orange/50 blur-3xl" />
          <h2 className="relative text-[40px] font-bold">พร้อมเปิดบูธแล้วหรือยัง?</h2>
          <p className="relative text-[16px] text-white/90">เข้าสู่ระบบด้วยบัญชีของคุณ หรือเลือก Google / Discord</p>
          <Button size="lg" iconRight={ArrowRight} to="/login/manager" className="relative">เข้าสู่ระบบ</Button>
        </div>
      </section>

      <footer className="bg-sidebar text-ink-ondark">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-10">
          <div className="flex items-center gap-3"><BrandMark size={38} /><div><div className="text-h2 text-white">Co-Art Booth</div><div className="text-micro">Bangkok Art Book Fair 2026</div></div></div>
          <p className="text-small">© Co-Art Booth · ระบบจัดการบูธศิลปะ</p>
        </div>
      </footer>
    </div>
  )
}
