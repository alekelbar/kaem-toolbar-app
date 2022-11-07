// import { GetServerSideProps, NextPage } from "next";
import { Layout } from "src/components";
import { SubjectItem } from "src/components/Subjects";
import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import { subjectInterface } from "../../src/components/Subjects/models/subject";
import { AddFloatButton } from "src/components/ui/AddFloatButton";
import { useRouter } from "next/router";

const Subject = ({ data }: { data: subjectInterface[] }) => {
  const [subjects, setSubjects] = useState(data);

  const onDelete = (id: string) => {
    setSubjects((subjects) => subjects.filter((e) => e._id !== id));
  };
  const router = useRouter();

  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {subjects.reverse().map((suject) => (
          <Grid key={suject._id} item sm={"auto"}>
            <SubjectItem onDelete={onDelete} data={suject} key={suject._id} />
          </Grid>
        ))}
      </Grid>
      <AddFloatButton onClick={() => router.push("/subject/addSubject")} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`${process.env.API_URL}/subjects`);
  const data: subjectInterface[] = res.data;

  return {
    props: {
      data,
    },
  };
};

export default Subject;
