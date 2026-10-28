import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { PRODUCTS, productByName, type Product } from '@/data/demo'

export interface CartLine { product: Product; qty: number }
interface CartValue {
  lines: CartLine[]
  discount: number
  count: number
  subtotal: number
  total: number
  add: (p: Product) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartCtx = createContext<CartValue | null>(null)

/** Demo cart starts with the sample bill from the design: 1 x Moonlit Garden + 2 x Tiny Planet Pin, discount 50. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQtyMap] = useState<Record<string, number>>({
    [productByName('Moonlit Garden').id]: 1,
    [productByName('Tiny Planet Pin').id]: 2,
  })
  const [discount, setDiscount] = useState(50)

  const value = useMemo<CartValue>(() => {
    const lines = PRODUCTS.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ product: p, qty: qty[p.id] }))
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    return {
      lines,
      discount: lines.length ? discount : 0,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      total: Math.max(0, subtotal - (lines.length ? discount : 0)),
      add: (p) => setQtyMap((m) => ({ ...m, [p.id]: (m[p.id] ?? 0) + 1 })),
      setQty: (id, n) => setQtyMap((m) => ({ ...m, [id]: Math.max(0, n) })),
      clear: () => { setQtyMap({}); setDiscount(0) },
    }
  }, [qty, discount])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const v = useContext(CartCtx)
  if (!v) throw new Error('useCart must be used inside <CartProvider>')
  return v
}
