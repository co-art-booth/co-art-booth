import { Palette, ShieldCheck, ShoppingCart, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { useToast } from '@/components/ui/Toast'
import { MEMBERS } from '@/data/demo'

const roleChip = (role: string) =>
  role === 'Booth Manager' ? <Chip icon={ShieldCheck}>{role}</Chip>
  : role === 'Artist' ? <Chip tone="pink" icon={Palette}>{role}</Chip>
  : <Chip tone="peach" icon={ShoppingCart}>{role}</Chip>

export default function ManagerMembers() {
  const toast = useToast()
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ผู้จัดการบูธ" title="สมาชิกและบทบาท" subtitle="กำหนดสิทธิ์ตามหน้าที่ของแต่ละคน"
        actions={<><Button variant="secondary" icon={ShieldCheck} onClick={() => toast('เปิดตารางสิทธิ์ตามบทบาท (demo)')}>จัดการบทบาท</Button><Button icon={UserPlus} onClick={() => toast('ส่งคำเชิญสมาชิกแล้ว (demo)')}>เชิญสมาชิก</Button></>}
      />
      <Card title="สมาชิกในบูธ" subtitle="ผู้จัดการบูธสามารถเชิญและเปลี่ยนบทบาท">
        <DataTable
          columns={[
            { header: 'สมาชิก', width: '250px', cell: (m, i) => <><Avatar initials={m.initials} index={i} /><span className="font-medium">{m.name}</span></> },
            { header: 'อีเมล', width: '230px', cell: (m) => <span className="text-ink-gray">{m.email}</span> },
            { header: 'บทบาท', width: '170px', cell: (m) => roleChip(m.role) },
            { header: 'สิทธิ์', width: '200px', cell: (m) => m.perm },
            { header: 'สถานะ', width: '100px', cell: () => <Pill tone="ok">ใช้งาน</Pill> },
            { header: 'เข้าใช้ล่าสุด', cell: (m) => <span className="text-ink-gray">{m.last}</span> },
          ]}
          rows={MEMBERS}
        />
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[['Booth Manager', 'ทุกเมนู', ShieldCheck, 'purple'], ['Artist', 'สินค้า · ยอดขายของตน', Palette, 'pink'], ['Sales Assistant', 'POS · Pre-order', ShoppingCart, 'orange']].map(([n, p, Icon, tone]) => (
          <div key={n as string} className="flex items-center gap-3.5 rounded-[18px] border border-line bg-white p-4 shadow-card">
            <IconChip icon={Icon as typeof ShieldCheck} tone={tone as 'purple'} size={44} />
            <div><div className="text-h2">{n as string}</div><div className="text-small text-ink-gray">{p as string}</div></div>
          </div>
        ))}
      </div>
    </>
  )
}
