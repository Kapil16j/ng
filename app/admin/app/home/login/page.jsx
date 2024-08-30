// Component Imports

import Login from '@/app/admin/views/Login'

// Server Action Imports
import { getServerMode } from '@/app/admin/@core/utils/serverHelpers'

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
