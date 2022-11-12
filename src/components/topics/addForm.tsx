import {
  Alert,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik, FormikValues } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { subjectInterface } from "../Subjects/models/subject";
import { initialTopic, validationTopic } from "./helpers/formikConfig";
import Box from "@mui/material/Box";
import axios from "axios";
import { useContext } from "react";
import { UserSessionContext } from "../../context/userSessionContext";
import dayjs from "dayjs";

interface addTopicArgs {
  data: subjectInterface[];
}

export const AddTopicForm = ({ data: subjects }: addTopicArgs) => {
  const context = useContext(UserSessionContext);

  const handleSubmit = async (values: FormikValues) => {
    const { name, subjectId, descr, important, urgent, deadline } = values;
    Swal.fire({
      title: "Crear un pendiente",
      text: "¿Esta seguro?",
      icon: "question",
      cancelButtonText: "¡NO!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Crealo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respond = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/topics`,
          {
            subjectId,
            user_id: context?.user.id,
            name,
            descr,
            deadline: dayjs(deadline).format("YYYY-MM-DD"),
            important,
            urgent,
          }
        );

        if (respond.statusText !== "Created") {
          Swal.fire("OK!", "Algo ha fallado! :c", "error");
          return;
        }
        await Swal.fire("OK!", "Hemos creado el pendiente", "success");
        router.push("/topic");
      }
    });
  };

  const formik = useFormik({
    initialValues: initialTopic,
    onSubmit: handleSubmit,
    validationSchema: validationTopic,
  });

  const router = useRouter();

  const notSubject = subjects.length === 0;
  if (notSubject) {
    Swal.fire({
      title: "Porfavor cree una asignatura primero",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(() => {
      router.push("/subject");
    });
  }

  return (
    <Stack m={5}>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              label="nombre"
              variant="outlined"
              helperText="¿Cual es el nombre de su materia?"
              fullWidth
            />

            {formik.touched.name && formik.errors.name ? (
              <Alert severity="error">{formik.errors.name}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              name="descr"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descr}
              label="descripción"
              variant="outlined"
              helperText="¿Cual es la descripción de su materia?"
              fullWidth
            />

            {formik.touched.descr && formik.errors.descr ? (
              <Alert severity="error">{formik.errors.descr}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="deadLine">
              <Typography mb={1}>¿Fecha de entrega?</Typography>
            </InputLabel>

            <Input
              fullWidth
              name="deadline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deadline}
              id="deadLine"
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              type="date"
            />
            {formik.touched.deadline && formik.errors.deadline ? (
              <Alert severity="error">{formik.errors.deadline}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="tagImportant">Importancia</InputLabel>
              <Select
                sx={{ "& .MuiInputBase-input": { color: "black" } }}
                id="tagImportant"
                label="Importancia"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.important}
                name="important"
              >
                <MenuItem value={"importante"}>{"Importante"}</MenuItem>
                <MenuItem value={"no importante"}>{"No importante"}</MenuItem>
              </Select>
            </FormControl>

            {formik.touched.important && formik.errors.important ? (
              <Alert severity="error">{formik.errors.important}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="tagUrgent">Urgencia</InputLabel>
              <Select
                sx={{ "& .MuiInputBase-input": { color: "black" } }}
                id="tagUrgent"
                label="Urgencia"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.urgent}
                name="urgent"
              >
                <MenuItem value={"urgente"}>{"Urgente"}</MenuItem>
                <MenuItem value={"no urgente"}>{"No urgente"}</MenuItem>
              </Select>
            </FormControl>

            {formik.touched.urgent && formik.errors.urgent ? (
              <Alert severity="error">{formik.errors.urgent}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="subjectId">Asignatura</InputLabel>
              <Select
                sx={{ "& .MuiInputBase-input": { color: "black" } }}
                id="subjectId"
                label="Asignatura"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subjectId}
                name="subjectId"
              >
                {subjects.map((subject) => {
                  return (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {formik.touched.subjectId && formik.errors.subjectId ? (
              <Alert severity="error">{formik.errors.subjectId}</Alert>
            ) : null}
          </Grid>
          <Grid item xs={12} mt={3}>
            <Button type="submit" variant="contained" color={"success"}>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
