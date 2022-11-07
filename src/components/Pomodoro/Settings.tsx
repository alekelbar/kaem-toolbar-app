import { Stack } from "@mui/system";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button, Slider } from "@mui/material";
import { useContext } from "react";
import { ClockContext } from "./context/ClockContext";

const PrettoSlider = styled(Slider)({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export const Settings = () => {
  const clockContext = useContext(ClockContext);

  const handleChangeWorking = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      clockContext?.onWork(newValue);
    }
  };

  const handleChangeRest = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      clockContext?.onRest(newValue);
    }
  };

  return (
    <Stack sx={{ margin: "0 auto", width: "100%", color: "white" }}>
      <Typography gutterBottom>
        {clockContext?.work} Minutos de estudio
      </Typography>
      <PrettoSlider
        size={"medium"}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={clockContext?.work}
        value={clockContext?.work}
        onChange={handleChangeWorking}
        step={5}
        min={5}
        max={60}
        color="primary"
      />

      <Typography gutterBottom>
        {clockContext?.rest} Minutos de descanso
      </Typography>
      <PrettoSlider
        size={"medium"}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={clockContext?.rest}
        value={clockContext?.rest}
        step={5}
        onChange={handleChangeRest}
        min={5}
        max={60}
        color="secondary"
      />

      <Button
        onClick={() => {
          clockContext?.reset();
        }}
        variant="contained"
        color="secondary"
        sx={{ margin: "20px auto" }}
      >
        <Typography color={"white"}>Reiniciar</Typography>
      </Button>
    </Stack>
  );
};
