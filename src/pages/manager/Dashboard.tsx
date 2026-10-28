import { Banknote, Receipt, Users, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Metric } from '@/components/ui/Metric'
import { Card } from '@/components/ui/Card'
import { TaskRow } from '@/components/ui/TaskRow'
import { Pill } from '@/components/ui/Pill'
import { Avatar } from '@/components/ui/Avatar'
import { Progress } from '@/components/ui/Progress'
import { QuickAction } from '@/components/ui/QuickAction'
import { SETTLEMENT } from '@/data/demo'
import { baht } from '@/lib/format'

export default function ManagerDashboard() {
  const max = Math.max(...SETTLEMENT.map((s) => s.sales))
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้จัดการบูธ" title="ภาพรวมบูธ" subtitle="ติดตามสมาชิก เงินกองกลาง และสถานะปิดยอด" />
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <Metric hero icon={Banknote} label="ยอดขายรวม" value="฿15,060" sub="วันนี้ · 1048 บิล" spark={[0.2, 0.35, 0.3, 0.55, 0.5, 0.8, 0.95]} />
        <Metric icon={Receipt} tone="pink" label="ค่าใช้จ่าย" value="฿4,270" sub="3 รายการรอตรวจ" spark={[0.6, 0.4, 0.5, 0.3, 0.45, 0.35]} />
        <Metric icon={Users} tone="orange" label="สมาชิกในบูธ" value="4 คน" sub="ศิลปิน 3 · ผู้ช่วย 1" spark={[0.4, 0.4, 0.55, 0.55, 0.7, 0.7]} />
        <Metric icon={Wallet} tone="green" label="รอปิดยอด" value="฿10,000" sub="variance ฿0.00" spark={[0.3, 0.45, 0.4, 0.6, 0.75, 0.7]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <Card title="สิ่งที่ต้องจัดการ" subtitle="งานที่ผู้จัดการต้องตรวจสอบก่อนปิดงาน" bodyClassName="flex flex-col gap-3">
          <TaskRow n={1} tone="pink" text="ตรวจสอบค่าใช้จ่ายที่ยังไม่มีหลักฐาน" right={<Pill tone="bad">ขาดหลักฐาน</Pill>} />
          <TaskRow n={2} tone="orange" text="ตรวจสอบยอดขายแยกตามเจ้าของ" right={<Pill tone="warn">รอตรวจ</Pill>} />
          <TaskRow n={3} tone="purple" text="ยืนยันการจ่ายเงินให้สมาชิก" right={<Pill tone="info">รอยืนยัน</Pill>} />
        </Card>
        <Card title="ยอดขายแยกตามเจ้าของ" subtitle="ข้อมูลจากบิลที่ยืนยันแล้ว" bodyClassName="flex flex-col gap-[18px]">
          {SETTLEMENT.map((s, i) => (
            <div key={s.name} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5"><Avatar initials={s.initials} size={32} index={i} /><span className="flex-1 text-body font-medium">{s.name}</span><span className="text-h2 text-purple-deep">{baht(s.sales)}</span></div>
              <Progress value={s.sales / max} tone={i === 0 ? 'purple' : i === 1 ? 'pink' : 'orange'} />
            </div>
          ))}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <QuickAction primary to="/manager/members" icon={Users} label="จัดการสมาชิก" desc="เชิญและเปลี่ยนบทบาท" />
        <QuickAction to="/manager/expenses" icon={Receipt} label="ดูค่าใช้จ่าย" desc="ตรวจหลักฐานและวิธีแบ่ง" />
        <QuickAction to="/manager/settlement" icon={Banknote} label="ไป Settlement" desc="คำนวณยอดจ่ายรายคน" />
      </div>
    </>
  )
}
