import { Outlet } from 'react-router'

import { Toaster } from '@/components/ui/sonner'

const Root = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default Root
