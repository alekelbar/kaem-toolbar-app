import React from "react";
import { Button, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPause } from "@fortawesome/free-solid-svg-icons";

library.add(faPause);

export const PauseButton = (props: { pause: () => void }) => {
  return (
    <Stack width="100%">
      <Button
        fullWidth
        color="secondary"
        onClick={props.pause}
        variant="contained"
        size="large"
      >
        <FontAwesomeIcon icon={faPause} size={"lg"} />
      </Button>
    </Stack>
  );
};
