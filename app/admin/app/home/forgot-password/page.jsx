// Component Imports
import ForgotPassword from '@/app/admin/views/ForgotPassword'

// Server Action Imports

import { getServerMode } from '@/app/admin/@core/utils/serverHelpers'

const ForgotPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
