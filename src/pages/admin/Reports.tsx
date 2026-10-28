import { Activity, AlertTriangle, Download, KeyRound, ShieldCheck, Users } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Metric } from '@/components/ui/Metric'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { IconChip } from '@/components/ui/IconChip'
import { Pill } from '@/components/ui/Pill'
import { useToast } from '@/components/ui/Toast'
import { SYSTEM_REPORTS } from '@/data/demo'

const ICONS = [Users, ShieldCheck, KeyRound, AlertTriangle]
const TONES = ['purple', 'pink', 'orange', 'red'] as const

export default function AdminReports() {
  const toast = useToast()
  return (
    <>
      <PageHeader eyebrow="WORKSPACE · ผู้ดูแลระบบ" title="รายงานระบบ" subtitle="ตรวจสอบการใช้งานและส่งออกข้อมูลระดับระบบ" actions={<Button icon={Download} onClick={() => toast('ส่งออก Audit CSV แล้ว (demo)')}>ส่งออก Audit CSV</Button>} />
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <Metric hero icon={Users} label="Active users" value="24 ผู้ใช้" sub="วันนี้" spark={[0.3, 0.4, 0.5, 0.55, 0.7, 0.8]} />
        <Metric icon={Activity} label="Audit events" value="186" sub="วันนี้ · events" spark={[0.2, 0.4, 0.35, 0.6, 0.5, 0.85]} />
        <Metric icon={KeyRound} tone="pink" label="Permission changes" value="12" sub="เดือนนี้ · events" spark={[0.5, 0.3, 0.6, 0.4, 0.7, 0.55]} />
        <Metric icon={AlertTriangle} tone="red" label="System errors" value="2" sub="วันนี้ · errors" spark={[0.7, 0.5, 0.55, 0.35, 0.5, 0.6]} />
      </div>
      <Card title="รายงานระบบ" subtitle="ข้อมูลสำหรับตรวจสอบและสนับสนุนทีม">
        <DataTable
          rowHeight={56}
          columns={[
            { header: 'รายงาน', width: '330px', cell: (r, i) => <><IconChip icon={ICONS[i]} tone={TONES[i]} size={36} /><span className="font-medium">{r.name}</span></> },
            { header: 'ช่วงเวลา', width: '200px', cell: (r) => r.period },
            { header: 'รายการ', width: '200px', cell: (r) => <span className="font-medium">{r.count}</span> },
            { header: 'สถานะ', cell: (r) => <Pill tone={r.ok ? 'ok' : 'bad'}>{r.status}</Pill> },
          ]}
          rows={SYSTEM_REPORTS}
        />
      </Card>
    </>
  )
}
