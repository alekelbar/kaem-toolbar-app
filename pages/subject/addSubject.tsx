import { Container, Stack } from "@mui/system";
import { NextPage } from "next";
import React from "react";
import { Layout } from "src/components";
import { SubjectForm } from "src/components/Subjects";

const AddSubject: NextPage = () => {
  return (
    <Layout>
      <SubjectForm />
    </Layout>
  );
};

export default AddSubject;
