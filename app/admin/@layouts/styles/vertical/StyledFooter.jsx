// Third-party Imports
import styled from '@emotion/styled'

// Config Imports
import themeConfig from '@/app/admin/configs/themeConfig'

// Util Imports
import { verticalLayoutClasses } from '../../utils/layoutClasses'

const StyledFooter = styled.footer`
  margin-inline: auto;
  max-inline-size: ${themeConfig.compactContentWidth}px;

  & .${verticalLayoutClasses.footerContentWrapper} {
    padding-block: 15px;
    padding-inline: ${themeConfig.layoutPadding}px;
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledFooter
