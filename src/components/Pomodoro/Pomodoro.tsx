import { Stack, Grid } from "@mui/material";
import React, { useState } from "react";
import { Timer } from "./Timer";
import { Settings } from "./Settings";
import { SettingsButton } from "./SettingsButton";
import { ClockProvider } from "./context/ClockProvider";

export const Pomodoro = () => {
  const [settings, setSettings] = useState<Boolean>(false);

  const OnSetting = () => {
    setSettings((e) => !e);
  };

  return (
    <ClockProvider>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Stack margin="50px auto">
            {settings ? <Settings /> : <Timer />}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SettingsButton handleSettings={OnSetting} />
        </Grid>
      </Grid>
    </ClockProvider>
  );
};
