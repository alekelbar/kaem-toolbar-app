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
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import "dayjs/locale/es";

dayjs.locale("es");

export const SubjectItem = ({
  data,
  onDelete,
}: {
  data: subjectInterface;
  onDelete: (id: string) => void;
}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`${process.env.NEXT_PUBLIC_DEV_URL}/subject/${data._id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estas seguro de querer eliminarlo?",
      text: "No podemos deshacer el cambio, y borraras tambien todos su topicos asociados",
      icon: "warning",
      cancelButtonText: "¡No quiero!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, adelante!",
    });
    if (!result.isConfirmed) return;

    const respond = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/${data._id}`
    );

    if (respond.status !== 200) {
      Swal.fire("Ups!", "Algo fallo, y no pudimos eliminarlo :c", "error");
      return;
    }

    Swal.fire(
      "Borrado!",
      "No hay vuelta atras, la asignatura fue eliminada",
      "success"
    );

    onDelete(data._id);
  };

  return (
    <Stack m={2} className={"animate__animated animate__fadeInLeft"}>
      <Card sx={{ marginTop: 2, maxWidth: "md" }}>
        <CardContent
          sx={{
            backgroundColor: (theme: Theme) => theme.palette.primary.light,
            // padding: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            gutterBottom
            fontWeight={"bold"}
          >
            {data.title}
          </Typography>
          <Typography color="text.primary" variant="body2">
            {`${dayjs(data.startAt, "YYYY-MM-DD")
              .format("dddd D, MMMM, YYYY")
              .toUpperCase()} `}
            -
            {` ${dayjs(data.endAt, "YYYY-MM-DD")
              .format("dddd D, MMMM, YYYY")
              .toUpperCase()}`}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: 14 }}
            component="div"
          >
            <br />
            {data.descr}
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
