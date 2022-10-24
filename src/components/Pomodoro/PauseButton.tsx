import React from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import { Button, Stack } from '@mui/material';

export const PauseButton = (props: { pause: () => void }) => {
  return (
    <Stack width='100%'>
      <Button color='secondary' onClick={props.pause} variant='contained' size='large' sx={{ margin: '10px', borderRadius: '20px' }}>
        <PauseIcon sx={{ fontSize: '2.1em' }} />
      </Button>
    </Stack>
  )
}
