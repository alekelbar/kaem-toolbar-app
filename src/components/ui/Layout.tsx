import React from 'react'
import { Skeleton, Stack } from '@mui/material'
import ResponsiveAppBar from './ResponsiveAppBar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type LayoutProps = {
  children: Array<JSX.Element> | JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const {data: session, status} =  useSession();
  const router = useRouter();

  if(status == 'loading') return  <Skeleton variant="rectangular" width={'100%'} height={'100%'} />

  if(status == 'unauthenticated'){
    router.push('/login');
  }

  return (
    <Stack sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#30384b',
      // overflow: 'hidden'
    }}>
      <ResponsiveAppBar image={session?.user?.image ?? 'https://i.imgur.com/b9NyUGm.png'} />
      {children}
    </Stack>
  )
}

export default Layout;