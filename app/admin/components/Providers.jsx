// Context Imports
import { VerticalNavProvider } from '../@menu/contexts/verticalNavContext'
import { SettingsProvider } from '../@core/contexts/settingsContext'
import ThemeProvider from './theme'

// Component Imports

import UpgradeToProButton from './upgrade-to-pro-button'
// Util Imports
// import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

const Providers = props => {
  // Props
  const { children, direction } = props


  const getMode = () =>{

  }

  
  const getSettingsFromCookie = () =>{
    
  }


  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          {children}
          {/* <UpgradeToProButton /> */}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
