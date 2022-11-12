import React from "react";
import { topicInterface } from "./models/topic";
import { Stack, Typography, Button, Theme, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import dayjs from "dayjs";
import { useSubject } from "./hooks/useSubject";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const TopicItem = ({
  onDelete,
  data: topics,
}: {
  data: topicInterface;
  onDelete: (id: string) => void;
}) => {
  const [data, setData] = useState(topics);

  const router = useRouter();
  const { subject, loading } = useSubject(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/one/${data.subjectId}`
  );

  const handleComplete = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/complete/${data._id}`
    );

    setData({ ...data, complete: true });
  };

  const handleIncomplete = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/uncomplete/${data._id}`
    );

    setData({ ...data, complete: false });
  };

  if (loading) {
    return <Skeleton />;
  }

  const handleEdit = () => {
    router.push(`/topic/${data._id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estas seguro de querer eliminarlo?",
      text: "No podemos deshacer el cambio",
      icon: "warning",
      cancelButtonText: "¡No quiero!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, adelante!",
    });
    if (!result.isConfirmed) return;

    const respond = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/${data._id}`
    );

    if (respond.status !== 200) {
      Swal.fire("Ups!", "Algo fallo, y no pudimos eliminarlo :c", "error");
      return;
    }

    Swal.fire(
      "Borrado!",
      "No hay vuelta atras, el pendiente fue eliminado",
      "success"
    );

    onDelete(data._id);
  };

  let hours = dayjs(data.deadline).diff(dayjs(), "hours");
  const days = Math.round(hours / 24);
  hours %= 24;

  const restTime = {
    days,
    hours,
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
          <Typography variant="h4" color="text.primary" gutterBottom>
            {data.name}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: 14, fontWeight: "bold" }}
            component="div"
          >
            {data.descr}
          </Typography>
          <Typography color="text.primary" variant="body2">
            <br />
            {`${dayjs(data.deadline, "YYYY-MM-DD")
              .format("dddd D, MMMM, YYYY")
              .toUpperCase()}`}
            <br />
            Te quedan:
            {`  ${restTime.days} día(s), y ${restTime.hours} hora(s)`} para la
            entrega
            <br />
          </Typography>
          <Typography color="text.primary" variant="body2">
            <br />
            Asignatura: {subject?.title} <br />
            Status: {data.complete ? "Entregado" : "Sin entregar"}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleEdit}
            variant="contained"
            color="info"
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

          {!data.complete ? (
            <Button
              onClick={handleComplete}
              variant="contained"
              color="success"
              size="small"
            >
              Entregado
            </Button>
          ) : (
            <Button
              onClick={handleIncomplete}
              variant="contained"
              color="warning"
              size="small"
            >
              Sin entregar
            </Button>
          )}
        </CardActions>
      </Card>
    </Stack>
  );
};
