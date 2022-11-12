import { Button, Stack } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);

export const PlayButton = (props: { pause: () => void }) => {
  return (
    <Stack width="100%">
      <Button
        fullWidth
        color="success"
        onClick={props.pause}
        variant="contained"
        size="large"
      >
        <FontAwesomeIcon icon={faPlay} size={"3x"} />
      </Button>
    </Stack>
  );
};
