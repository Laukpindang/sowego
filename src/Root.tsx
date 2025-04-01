import { Outlet } from 'react-router'

import { AuthProvider } from './context/auth-context'
import { ThemeProvider } from '@/context/theme-context'

import { Toaster } from '@/components/ui/sonner'
import { ModeToggle } from './components/mode-toggle'

const Root = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <ModeToggle />
          <Toaster position='top-right' richColors />
          <Outlet />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default Root
