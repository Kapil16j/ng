// Component Imports
import Register from '@/app/admin/views/Register'

// Server Action Imports
import { getServerMode } from '@/app/admin/@core/utils/serverHelpers'

const RegisterPage = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
