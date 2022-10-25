import { Button, Stack } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'


export const SettingsButton = (props: { handleSettings: () => void }) => {

  const { handleSettings } = props;

  return (
    <Stack>
      <Button
        color='info'
        variant='contained'
        onClick={() => handleSettings()}
        size='large'
        sx={{ width: '80%', margin: '10px auto', borderRadius: '20px' }}
      >
        <SettingsIcon />
      </Button>
    </Stack>
  )
}
