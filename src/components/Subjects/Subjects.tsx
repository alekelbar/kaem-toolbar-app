// import { GetServerSideProps, NextPage } from "next";
import { Layout } from "src/components";
import { SubjectItem } from "src/components/Subjects";
import React, { useState } from "react";
import { Alert, Grid } from "@mui/material";
import { subjectInterface } from "./models/subject";
import { AddFloatButton } from "src/components/ui/AddFloatButton";
import { useRouter } from "next/router";

export const Subjects = ({ data }: { data: subjectInterface[] }) => {
  const [subjects, setSubjects] = useState(data);

  const onDelete = (id: string) => {
    setSubjects((subjects) => subjects.filter((e) => e._id !== id));
  };
  const router = useRouter();

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {subjects.length > 0 ? (
          subjects.map((suject) => (
            <Grid key={suject._id} item sm={"auto"}>
              <SubjectItem onDelete={onDelete} data={suject} key={suject._id} />
            </Grid>
          ))
        ) : (
          <Alert severity="info">Ninguna asignatura registrada</Alert>
        )}
      </Grid>
      <AddFloatButton onClick={() => router.push("/subject/addSubject")} />
    </>
  );
};
