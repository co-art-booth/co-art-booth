import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { ROLES, type Role } from '@/roles'

/** Route guard. The real enforcement of permissions lives in Supabase RLS (phase 2); this only drives the UI. */
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const auth = useAuth()
  if (auth.loading) return <div className="grid min-h-screen place-items-center text-ink-gray">กำลังโหลด…</div>
  if (!auth.role) return <Navigate to={`/login/${role}`} replace />
  if (auth.role !== role) return <Navigate to={ROLES[auth.role].base} replace />
  return <>{children}</>
}
