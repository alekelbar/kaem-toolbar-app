import { ButtonGroup, Grid, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { ClockContext } from "./context/ClockContext";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";
import Container from "@mui/material/Container";

export const Timer = () => {
  const clockConfig = useContext(ClockContext);
  const [mode, setMode] = useState("rest");
  const [secondLeft, setsecondLeft] = useState(0);
  const [pause, setPause] = useState(true);

  const secondsLeftRef = useRef(secondLeft);
  const modeRef = useRef(mode);
  const pauseRef = useRef(pause);

  const tick = () => {
    secondsLeftRef.current--;
    setsecondLeft(secondsLeftRef.current);
  };

  const swicthMode = () => {
    const nextMode = modeRef.current == "work" ? "rest" : "work";
    const nextSeconds =
      nextMode == "work"
        ? (clockConfig?.work ?? 1) * 60
        : (clockConfig?.rest ?? 1) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setsecondLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pauseRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return swicthMode();
      }

      tick();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const onPause = () => {
    setPause(!pause);
  };

  let minutes: string | number = Math.floor(secondLeft / 60);
  let seconds: string | number = secondLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;

  return (
    <Container>
      <Typography
        textAlign={"center"}
        variant="h4"
        padding={4}
        color={mode === "work" ? "secondary.main" : "success.main"}
        width={{ md: "500px", xs: "200px" }}
      >
        {`${minutes}:${seconds}`}
      </Typography>
      <Stack sx={{ width: "80%", margin: "0 auto" }}>
        <ButtonGroup>
          {/* buttons */}
          {pause ? (
            <PlayButton
              pause={() => {
                onPause();
                pauseRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              pause={() => {
                onPause();
                pauseRef.current = true;
              }}
            />
          )}
        </ButtonGroup>
      </Stack>
    </Container>
  );
};
