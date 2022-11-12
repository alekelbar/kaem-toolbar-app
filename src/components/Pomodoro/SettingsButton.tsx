import { Button, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faGear);
import React from "react";

export const SettingsButton = (props: { handleSettings: () => void }) => {
  const { handleSettings } = props;

  return (
    <Stack width={"50%"} m={"auto"}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleSettings()}
        size="large"
      >
        <FontAwesomeIcon icon={faGear} size={"3x"} />
      </Button>
    </Stack>
  );
};
