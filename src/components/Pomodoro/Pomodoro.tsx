import { Stack, Grid } from "@mui/material";
import React, { useState } from "react";
import { Timer } from "./Timer";
import { Settings } from "./Settings";
import { SettingsButton } from "./SettingsButton";
import { ClockProvider } from "./context/ClockProvider";
import Box from "@mui/material/Box";

export const Pomodoro = () => {
  const [settings, setSettings] = useState<Boolean>(false);

  const OnSetting = () => {
    setSettings((e) => !e);
  };

  return (
    <ClockProvider>
      <Stack
        margin={"0 auto"}
        width={"100%"}
        className={"animate__animated animate__lightSpeedInRight"}
      >
        <Stack margin="10px auto">{settings ? <Settings /> : <Timer />}</Stack>
        <SettingsButton handleSettings={OnSetting} />
      </Stack>
    </ClockProvider>
  );
};
