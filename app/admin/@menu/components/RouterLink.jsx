'use client'

// React Imports
import { forwardRef } from 'react'

// Next Imports
import Link from 'next/link'

export const RouterLink = forwardRef((props, ref) => {
  // Props
  const { href, className, ...other } = props

  return (
    <Link ref={ref} href={href} className={className} {...other}>
      {props.children}
    </Link>
  )
})
// Setting display name for the component
RouterLink.displayName = 'RouterLink'
