// Component Imports
import UnderMaintenance from '@/app/admin/views/pages/misc/UnderMaintenance'

// Server Action Imports
import { getServerMode } from '@/app/admin/@core/utils/serverHelpers'

const UnderMaintenancePage = () => {
  // Vars
  const mode = getServerMode()

  return <UnderMaintenance mode={mode} />
}

export default UnderMaintenancePage
