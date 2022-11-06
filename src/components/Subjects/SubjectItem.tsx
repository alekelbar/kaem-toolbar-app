import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React from "react";
import Typography from "@mui/material/Typography";
import { subjectInterface } from "pages/subject/models/subject";
import dayjs from "dayjs";

export const SubjectItem = ({ data }: { data: subjectInterface }) => {
  return (
    <Stack m={3}>
      <Card sx={{ minWidth: 275, marginTop: 5 }}>
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {data.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} component="div">
            {data.descr}
          </Typography>
          <Typography variant="body2">
            Fecha inicial:
            {`" ${dayjs(data.startAt).format("DD/MM/YYYY")}"`}
            <br />
            Fecha Final:
            {`" ${dayjs(data.endAt).format("DD/MM/YYYY")}"`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success" size="small">
            Editar
          </Button>
          <Button variant="contained" color="warning" size="small">
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};
