import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import { Layout } from "src/components";
import { PomodoroClock } from "../../src/components/Pomodoro";

const Pomodoro = () => {
  return (
    <Layout>
      <Stack width={"100%"}>
        <PomodoroClock />
      </Stack>
    </Layout>
  );
};

export default Pomodoro;
