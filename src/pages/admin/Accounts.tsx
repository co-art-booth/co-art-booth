import { KeyRound, Palette, Pencil, Plus, ShieldCheck, ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { useToast } from '@/components/ui/Toast'
import { ACCOUNTS } from '@/data/demo'

const roleChip = (r: string) =>
  r === 'Booth Manager' ? <Chip icon={ShieldCheck}>{r}</Chip>
  : r === 'Artist' ? <Chip tone="pink" icon={Palette}>{r}</Chip>
  : r === 'Sales Assistant' ? <Chip tone="peach" icon={ShoppingCart}>{r}</Chip>
  : <Chip tone="dark" icon={KeyRound}>{r}</Chip>

export default function AdminAccounts() {
  const toast = useToast()
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ผู้ดูแลระบบ" title="บัญชีและสิทธิ์" subtitle="จัดการบัญชีผู้ใช้ บทบาท และสถานะการเข้าถึง"
        actions={<><Button variant="secondary" icon={ShieldCheck} onClick={() => toast('เปิด Role matrix (demo)')}>ตรวจสอบ Role matrix</Button><Button icon={Plus} onClick={() => toast('สร้างบัญชีใหม่แล้ว (demo)')}>สร้างบัญชี</Button></>}
      />
      <Card title="บัญชีผู้ใช้งาน" subtitle="สิทธิ์ระบบตรวจสอบที่ server ทุกครั้ง">
        <DataTable
          columns={[
            { header: 'ผู้ใช้', width: '260px', cell: (a, i) => <><Avatar initials={a.initials} index={i} /><span className="font-medium">{a.name}</span></> },
            { header: 'อีเมล', width: '250px', cell: (a) => <span className="text-ink-gray">{a.email}</span> },
            { header: 'บทบาท', width: '200px', cell: (a) => roleChip(a.role) },
            { header: 'บูธ', width: '130px', cell: (a) => a.booth },
            { header: 'สถานะ', width: '100px', cell: () => <Pill tone="ok">ใช้งาน</Pill> },
            { header: 'การดำเนินการ', cell: (a) => <Button size="sm" variant="ghost" icon={Pencil} onClick={() => toast(`แก้ไข ${a.name} (demo)`)}>แก้ไข</Button> },
          ]}
          rows={ACCOUNTS}
        />
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[['System Admin', 'ทุกบูธ', KeyRound, 'purple'], ['Booth Manager', 'ทุกเมนู', ShieldCheck, 'pink'], ['Artist', 'สินค้า · ยอดขายของตน', Palette, 'orange'], ['Sales Assistant', 'POS · Pre-order', ShoppingCart, 'green']].map(([n, p, Icon, tone]) => (
          <div key={n as string} className="flex items-center gap-3 rounded-[18px] border border-line bg-white p-3.5 shadow-card">
            <IconChip icon={Icon as typeof KeyRound} tone={tone as 'purple'} size={40} />
            <div><div className="text-body font-medium">{n as string}</div><div className="text-small text-ink-gray">{p as string}</div></div>
          </div>
        ))}
      </div>
    </>
  )
}
