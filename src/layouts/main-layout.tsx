import { Outlet } from 'react-router'

import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'
import { Toaster } from '@/components/ui/sonner'

const MainLayout = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position='top-right' richColors />
          <Outlet />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default MainLayout
