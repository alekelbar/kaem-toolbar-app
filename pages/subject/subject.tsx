import React from "react";
import { Layout } from "src/components";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { SubjectItem } from "src/components/Subjects";

const Subject: NextPage = () => {
  return (
    <Layout>
      <SubjectItem />
    </Layout>
  );
};

export default Subject;
