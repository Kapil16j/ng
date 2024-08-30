// Component Imports

import BlankLayout from '../../@layouts/BlankLayout'
import Providers from '../../components/Providers'
const Layout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <BlankLayout>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
