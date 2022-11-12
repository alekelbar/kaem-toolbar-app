import React from "react";
import { topicInterface } from "./models/topic";
import { Grid, Alert } from "@mui/material";
import { AddFloatButton } from "../ui/AddFloatButton";
import { TopicItem } from "./TopicItem";
import { useRouter } from "next/router";
import { useState } from "react";

export const Topics = ({ data }: { data: topicInterface[] }) => {
  const router = useRouter();

  const [topics, setTopics] = useState(data);

  const onDelete = async (id: string) => {
    setTopics(topics.filter((t) => t._id != id));
  };

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
              <TopicItem onDelete={onDelete} data={topic} key={topic._id} />
            </Grid>
          ))
        ) : (
          <Alert severity="info">Ningun pendiente registrado</Alert>
        )}
      </Grid>
      <AddFloatButton
        onClick={() => {
          router.push("/topic/addTopic");
        }}
      />
    </>
  );
};
