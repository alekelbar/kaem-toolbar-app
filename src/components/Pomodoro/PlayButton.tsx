import { Button, Stack } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React from 'react'

export const PlayButton = (props: { pause: () => void }) => {
  return (
    <Stack width='100%'>
      <Button color='secondary' onClick={props.pause} variant='contained' size='large' sx={{ margin: '10px', borderRadius: '20px' }}>
        <PlayCircleOutlineIcon sx={{ fontSize: '2.1em' }} />
      </Button>
    </Stack>
  )
}
