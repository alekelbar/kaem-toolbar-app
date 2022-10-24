import { Stack, Grid } from '@mui/material'
import React, { useState } from 'react'
import { Timer } from './Timer'
import { Settings } from './Settings';
import { SettingsButton } from './SettingsButton';
import { ClockProvider } from './context/ClockProvider';


export const PomodoroClock = () => {
  const [settings, setSettings] = useState<Boolean>(false);

  const OnSetting = () => {
    setSettings(e => !e);
  }

  return (
    <ClockProvider>
      <Grid container>
        <Stack margin='50px auto'>
          {
            (settings)
              ? <Settings />
              : <Timer />
          }
          <SettingsButton handleSettings={OnSetting} />
        </Stack>
      </Grid>
    </ClockProvider>
  )
}
