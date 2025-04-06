import { Helmet } from 'react-helmet'

import { SidebarTrigger } from './ui/sidebar'
import { HeaderUser } from './header-user'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <>
      <Helmet>
        <title>SOWEGO | {title}</title>
      </Helmet>
      <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1' />
          <p>{title}</p>
        </div>
        <div className='flex flex-col items-end'>
          <HeaderUser />
        </div>
      </header>
    </>
  )
}

export default Header
