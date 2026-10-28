import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastItem { id: number; message: string }
const ToastCtx = createContext<(message: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setItems((s) => [...s, { id, message }])
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 2800)
  }, [])
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-navy px-4 py-3 text-body font-medium text-white shadow-raised">
            <CheckCircle2 size={16} className="text-ok" /> {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
