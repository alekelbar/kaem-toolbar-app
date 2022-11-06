import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "src/components";
import { NextPage } from "next";

const Matrix: NextPage = () => {
  return (
    <Layout>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Roboto",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        Matrix incoming...
      </Typography>
    </Layout>
  );
};

export default Matrix;
