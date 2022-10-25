import React from 'react'
import { Stack } from '@mui/material'
import ResponsiveAppBar from './ResponsiveAppBar'

type LayoutProps = {
  children: Array<JSX.Element> | JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#30384b',
      // overflow: 'hidden'
    }}>
      <ResponsiveAppBar image={''} />
      {children}
    </Stack>
  )
}


export default Layout;