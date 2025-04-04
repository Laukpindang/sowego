import { SidebarTrigger } from './ui/sidebar'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <div className='flex grow flex-col items-end'>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
