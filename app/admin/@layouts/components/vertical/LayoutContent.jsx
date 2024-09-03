'use client'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '../../utils/layoutClasses'

// Styled Component Imports
import StyledMain from '../../styles/shared/StyledMain'

const LayoutContent = ({ children }) => {
  return (
    <StyledMain
      isContentCompact={true}
      className={classnames(verticalLayoutClasses.content, verticalLayoutClasses.contentCompact, 'flex-auto is-full w-[100%]')}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
