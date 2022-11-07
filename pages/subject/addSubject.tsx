import { Container, Stack } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Layout } from "src/components";
import { SubjectForm } from "src/components/Subjects";
import { sessionModelInterface } from "../../src/models/sessionModel";

const AddSubject = () => {
  return (
    <Layout>
      <SubjectForm />
    </Layout>
  );
};

export default AddSubject;
