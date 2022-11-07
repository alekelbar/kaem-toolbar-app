import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddFloatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Fab
      onClick={onClick}
      color="secondary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: { xs: 16 },
        right: 16,
        top: { md: 100 },
      }}
    >
      <AddIcon fontSize={"large"} />
    </Fab>
  );
};
