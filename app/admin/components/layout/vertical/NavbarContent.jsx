// Next Imports
import Link from 'next/link'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'

import NavSearch from '../shared/search'
import ModeDropdown from '../shared/ModeDropdown'
import UserDropdown from '../shared/UserDropdown'

// Util Imports

import { verticalLayoutClasses } from '@/app/admin/@layouts/utils/layoutClasses'

const NavbarContent = ({user}) => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full w-[100%]')}>
      <div className='flex items-center gap-2 sm:gap-4'>
        <NavToggle />
        <NavSearch />
      </div>
      <div className='flex items-center'>
       
        {/* <ModeDropdown /> */}
        <IconButton className='text-textPrimary'>
          <i className='ri-notification-2-line' />
        </IconButton>
        <UserDropdown user={user}/>
      </div>
    </div>
  )
}

export default NavbarContent
