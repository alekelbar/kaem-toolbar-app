// import { GetServerSideProps, NextPage } from "next";
import { Layout } from "src/components";
import { SubjectItem } from "src/components/Subjects";
import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import { subjectInterface } from "../../src/components/Subjects/models/subject";

const Subject = ({ data }: { data: subjectInterface[] }) => {
  return (
    <Layout>
      <Grid container>
        {data.map((suject) => (
          <Grid key={suject._id} item sm={"auto"}>
            <SubjectItem data={suject} key={suject._id} />
          </Grid>
        ))}
      </Grid>
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
