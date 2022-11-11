import React from "react";
import { topicInterface } from "./models/topic";
import { Stack, Typography, Button, Theme, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { subjectInterface } from "../Subjects/models/subject";
import { useSubject } from "./hooks/useSubject";

export const TopicItem = ({
  onDelete,
  data,
}: {
  data: topicInterface;
  onDelete: (id: string) => void;
}) => {
  const { subject, loading, error } = useSubject(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/${data.subjectId}`
  );

  if (loading) {
    return <Skeleton />;
  }

  const handleEdit = () => {
    console.log("preparado para editar");
  };

  const handleDelete = () => {
    console.log("preparado para eliminar");
  };

  return (
    <Stack m={2}>
      <Card sx={{ minWidth: 275, marginTop: 2, maxWidth: "md" }}>
        <CardContent
          sx={{
            backgroundColor: (theme: Theme) => theme.palette.primary.light,
            padding: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Typography variant="h5" color="text.primary" gutterBottom>
            {data.name}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: 14 }}
            component="div"
          >
            {data.descr}
          </Typography>
          <Typography color="text.primary" variant="body2">
            Fecha de entrega:
            {`" ${dayjs(data.deadline).format("DD/MM/YYYY")}"`}
            <br />
            Materia: {subject?.title}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleEdit}
            variant="contained"
            color="success"
            size="small"
          >
            Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="warning"
            size="small"
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};
