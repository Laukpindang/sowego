import { Outlet } from 'react-router'

import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'

const MainLayout = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default MainLayout
