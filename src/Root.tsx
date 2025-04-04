import { Outlet } from 'react-router'

import { AuthProvider } from './context/auth-context'
import { ThemeProvider } from '@/context/theme-context'

import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from './components/app-sidebar'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import Header from './components/header'

const Root = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position='top-right' richColors />
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <div className='p-4'>
                <Outlet />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default Root
