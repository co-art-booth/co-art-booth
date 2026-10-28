import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireRole } from '@/auth/RequireRole'
import { CartProvider } from '@/auth/CartContext'
import { AppShell } from '@/components/layout/AppShell'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import ManagerDashboard from '@/pages/manager/Dashboard'
import ManagerMembers from '@/pages/manager/Members'
import ManagerExpenses from '@/pages/manager/Expenses'
import ManagerSettlement from '@/pages/manager/Settlement'
import ManagerReports from '@/pages/manager/Reports'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminAccounts from '@/pages/admin/Accounts'
import AdminAudit from '@/pages/admin/Audit'
import AdminReports from '@/pages/admin/Reports'
import ArtistDashboard from '@/pages/artist/Dashboard'
import ArtistProducts from '@/pages/artist/Products'
import ArtistPreorders from '@/pages/artist/Preorders'
import ArtistEarnings from '@/pages/artist/Earnings'
import AssistantDashboard from '@/pages/assistant/Dashboard'
import AssistantPreorders from '@/pages/assistant/Preorders'
import AssistantPos from '@/pages/assistant/Pos'
import AssistantPayment from '@/pages/assistant/Payment'
import AssistantReturns from '@/pages/assistant/Returns'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/:role" element={<Login />} />

        <Route path="/manager" element={<RequireRole role="manager"><AppShell role="manager" /></RequireRole>}>
          <Route index element={<ManagerDashboard />} />
          <Route path="members" element={<ManagerMembers />} />
          <Route path="expenses" element={<ManagerExpenses />} />
          <Route path="settlement" element={<ManagerSettlement />} />
          <Route path="reports" element={<ManagerReports />} />
        </Route>

        <Route path="/admin" element={<RequireRole role="admin"><AppShell role="admin" /></RequireRole>}>
          <Route index element={<AdminDashboard />} />
          <Route path="accounts" element={<AdminAccounts />} />
          <Route path="audit" element={<AdminAudit />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/artist" element={<RequireRole role="artist"><AppShell role="artist" /></RequireRole>}>
          <Route index element={<ArtistDashboard />} />
          <Route path="products" element={<ArtistProducts />} />
          <Route path="preorders" element={<ArtistPreorders />} />
          <Route path="earnings" element={<ArtistEarnings />} />
        </Route>

        <Route path="/assistant" element={<RequireRole role="assistant"><AppShell role="assistant" /></RequireRole>}>
          <Route index element={<AssistantDashboard />} />
          <Route path="preorders" element={<AssistantPreorders />} />
          <Route path="pos" element={<AssistantPos />} />
          <Route path="payment" element={<AssistantPayment />} />
          <Route path="returns" element={<AssistantReturns />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  )
}
