import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isDemo, supabase } from '@/lib/supabase'
import { ROLES, isRole, type Role } from '@/roles'

export interface AppUser { name: string; email: string; initials: string }
export interface SignInOptions { provider?: 'google' | 'discord'; email?: string; password?: string }

interface AuthValue {
  role: Role | null
  user: AppUser | null
  loading: boolean
  demo: boolean
  signIn: (role: Role, opts?: SignInOptions) => Promise<void>
  signOut: () => Promise<void>
}

const AuthCtx = createContext<AuthValue | null>(null)
const KEY = 'coart.demo.role'
const DEMO_USER: AppUser = { name: 'Mew Kanjana', email: 'mew@coart.studio', initials: 'MK' }

const initialsOf = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join('') || '?'

export function AuthProvider({ children }: { children: ReactNode }) {
  const stored = isDemo ? localStorage.getItem(KEY) : null
  const [role, setRole] = useState<Role | null>(isRole(stored ?? undefined) ? (stored as Role) : null)
  const [user, setUser] = useState<AppUser | null>(isDemo && stored ? DEMO_USER : null)
  const [loading, setLoading] = useState(!isDemo)

  // Supabase mode: restore the session and read the role from public.profiles (phase 3).
  useEffect(() => {
    if (isDemo || !supabase) return
    const load = async (uid: string | undefined) => {
      if (!uid) { setRole(null); setUser(null); setLoading(false); return }
      const { data } = await supabase.from('profiles').select('role, full_name, email').eq('id', uid).single()
      if (data && isRole(data.role)) {
        setRole(data.role)
        setUser({ name: data.full_name ?? data.email, email: data.email, initials: initialsOf(data.full_name ?? data.email) })
      }
      setLoading(false)
    }
    supabase.auth.getSession().then(({ data }) => load(data.session?.user.id))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { void load(session?.user.id) })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (next: Role, opts: SignInOptions = {}) => {
    if (isDemo || !supabase) {
      localStorage.setItem(KEY, next)
      setRole(next)
      setUser(DEMO_USER)
      return
    }
    if (opts.provider) {
      await supabase.auth.signInWithOAuth({ provider: opts.provider, options: { redirectTo: window.location.origin + ROLES[next].base } })
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email: opts.email ?? '', password: opts.password ?? '' })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (isDemo || !supabase) localStorage.removeItem(KEY)
    else await supabase.auth.signOut()
    setRole(null)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ role, user, loading, demo: isDemo, signIn, signOut }), [role, user, loading, signIn, signOut])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const v = useContext(AuthCtx)
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>')
  return v
}
