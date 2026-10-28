import { BarChart3, Banknote, Check, CheckCircle2, Users, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Metric } from '@/components/ui/Metric'
import { DataTable } from '@/components/ui/DataTable'
import { Avatar } from '@/components/ui/Avatar'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { useToast } from '@/components/ui/Toast'
import { SETTLEMENT } from '@/data/demo'
import { baht } from '@/lib/format'

export default function ManagerSettlement() {
  const toast = useToast()
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE · ผู้จัดการบูธ" title="ปิดยอดและแบ่งเงิน" subtitle="คำนวณยอดจ่ายรายคนพร้อมตรวจ variance"
        actions={<><Button variant="secondary" icon={BarChart3} to="/manager/reports">ไปดูรายงาน</Button><Button icon={Check} onClick={() => toast('บันทึกการจ่ายเงินแล้ว (demo)')}>บันทึกการจ่ายเงิน</Button></>}
      />
      <div className="relative flex items-center gap-4 overflow-hidden rounded-[20px] bg-g-green px-5 py-4 text-white shadow-card">
        <span className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
        <IconChip icon={CheckCircle2} tone="glass" size={44} />
        <div className="relative"><div className="text-h1">พร้อมปิดยอด</div><div className="text-white/90">ยอดเงินกองกลางตรงกับยอดที่ต้องจ่าย · variance ฿0.00</div></div>
      </div>
      <div className="grid gap-[18px] md:grid-cols-3">
        <Metric hero icon={Banknote} label="ยอดขายสุทธิ" value="฿15,060" sub="หักคืนสินค้าแล้ว" spark={[0.2, 0.4, 0.35, 0.6, 0.55, 0.85, 0.95]} />
        <Metric icon={Wallet} tone="green" label="เงินกองกลาง" value="฿10,000" sub="เงินสด + PromptPay" spark={[0.3, 0.5, 0.45, 0.55, 0.6, 0.7]} />
        <Metric icon={Users} tone="orange" label="ต้องจ่ายศิลปิน" value="฿10,000" sub="3 รายการ" spark={[0.5, 0.5, 0.6, 0.55, 0.7, 0.75]} />
      </div>
      <Card title="สรุปยอดรายคน" subtitle="ยอดขาย − ค่าใช้จ่าย + สำรองจ่าย − รับตรง">
        <DataTable
          rowHeight={58}
          columns={[
            { header: 'สมาชิก', width: '250px', cell: (s, i) => <><Avatar initials={s.initials} index={i} /><span className="font-medium">{s.name}</span></> },
            { header: 'ยอดขาย', width: '170px', cell: (s) => <span className="font-medium">{baht(s.sales)}</span> },
            { header: 'ค่าใช้จ่าย', width: '170px', cell: (s) => <span className="text-ink-gray">− {baht(s.expense)}</span> },
            { header: 'รับตรง', width: '170px', cell: (s) => <span className="text-ink-gray">{s.direct ? `− ${baht(s.direct)}` : '฿0'}</span> },
            { header: 'ต้องจ่าย', width: '170px', cell: (s) => <span className="text-h2 text-purple-deep">{baht(s.due)}</span> },
            { header: 'สถานะ', cell: (s) => <Pill tone={s.paid ? 'ok' : 'warn'}>{s.paid ? 'จ่ายแล้ว' : 'รอจ่าย'}</Pill> },
          ]}
          rows={SETTLEMENT}
        />
      </Card>
    </>
  )
}
