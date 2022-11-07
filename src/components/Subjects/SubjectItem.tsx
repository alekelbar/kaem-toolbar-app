import { Stack } from "@mui/system";
import { subjectInterface } from "./models/subject";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import React from "react";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";

export const SubjectItem = ({ data }: { data: subjectInterface }) => {
  return (
    <Stack m={3}>
      <Card sx={{ minWidth: 275, marginTop: 5 }}>
        <CardContent
          sx={{
            backgroundColor: (theme: Theme) => theme.palette.primary.light,
            padding: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Typography variant="h5" color="text.primary" gutterBottom>
            {data.title}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: 14 }}
            component="div"
          >
            {data.descr}
          </Typography>
          <Typography color="text.primary" variant="body2">
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
