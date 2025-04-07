import * as React from 'react'

import { useSidebar } from '@/components/ui/sidebar'

import { Link } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'

const data = [
  {
    title: 'Manage Destination',
    url: '/'
  },
  {
    title: 'Manage Vacation Plan',
    url: '/vacation'
  },
  {
    title: 'Manage User',
    url: '/user'
  },
  {
    title: 'Manage Booking',
    url: '/booking'
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link to='/' onClick={() => setOpenMobile(false)}>
                <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-white'>
                  <img src='/sowego-icon.svg' alt='SOWEGO' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>SOWEGO</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map(item => (
              <React.Fragment key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} onClick={() => setOpenMobile(false)}>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
