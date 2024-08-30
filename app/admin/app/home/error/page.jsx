// Component Imports
import NotFound from '@/app/admin/views/NotFound'

// Server Action Imports

import { getServerMode } from '@/app/admin/@core/utils/serverHelpers'

const Error = () => {
  // Vars
  const mode = getServerMode()

  return <NotFound mode={mode} />
}

export default Error
