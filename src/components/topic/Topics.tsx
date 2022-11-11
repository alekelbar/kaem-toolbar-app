import React from "react";
import { topicInterface } from "./models/topic";
import { Grid, Alert } from "@mui/material";
import { AddFloatButton } from "../ui/AddFloatButton";
import { TopicItem } from "./TopicItem";

export const Topics = ({ data: topics }: { data: topicInterface[] }) => {
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
        {topics.length > 0 ? (
          topics.map((topic) => (
            <Grid key={topic._id} item sm={"auto"}>
              <TopicItem onDelete={() => {}} data={topic} key={topic._id} />
            </Grid>
          ))
        ) : (
          <Alert severity="info">Ningun pendiente registrado</Alert>
        )}
      </Grid>
      <AddFloatButton
        onClick={() => {
          console.log("recuerda redirigir aca!");
        }}
      />
    </>
  );
};
