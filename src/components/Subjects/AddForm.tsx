import {
  Alert,
  Button,
  Grid,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik, FormikValues } from "formik";
import { subjectsAddValidation, initialValues } from "./helpers/FormikConfig";
import { useContext } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { UserSessionContext } from "src/context/userSessionContext";
import dayjs from "dayjs";

export const AddSubjectForm = () => {
  const router = useRouter();
  const userSession = useContext(UserSessionContext);
  const userId = userSession?.user?.id ?? "";

  const handleSubmit = async (values: FormikValues) => {
    const { title, description, startAt, endAt } = values;

    Swal.fire({
      title: "Crear una asignatura",
      text: "¿Esta seguro?",
      icon: "question",
      cancelButtonText: "¡NO!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Creala!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respond = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
          {
            user_id: userId,
            title: title,
            descr: description,
            startAt: dayjs(startAt),
            endAt: dayjs(endAt),
          }
        );

        if (respond.statusText !== "Created") {
          Swal.fire("OK!", "Algo ha fallado! :c", "error");
          return;
        }
        await Swal.fire("OK!", "Hemos creado la asignatura", "success");
        router.push("/subject");
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: subjectsAddValidation,
  });

  return (
    <Stack m={5}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              label="Titulo"
              variant="outlined"
              helperText="¿Cual es el nombre de su materia?"
              fullWidth
            />

            {formik.touched.title && formik.errors.title ? (
              <Alert severity="error">{formik.errors.title}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              label="Descripción"
              variant="outlined"
              helperText="Brinde una lígera descripción"
              fullWidth
            />
            {formik.touched.description && formik.errors.description ? (
              <Alert severity="error">{formik.errors.description}</Alert>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="startDate">
              <Typography>Inicia</Typography>
            </InputLabel>

            <Input
              fullWidth
              name="startAt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startAt}
              id="startDate"
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              type="date"
            />
            {formik.touched.startAt && formik.errors.startAt ? (
              <Alert severity="error">{formik.errors.startAt}</Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="endDate">
              <Typography>Concluye</Typography>
            </InputLabel>

            <Input
              fullWidth
              name="endAt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endAt}
              id="endAt"
              required
              sx={{ "& .MuiInputBase-input": { color: "black" } }}
              type="date"
            />
            {formik.touched.endAt && formik.errors.endAt ? (
              <Alert severity="error">{formik.errors.endAt}</Alert>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Button type="submit" variant="contained" color={"success"}>
            Registrar
          </Button>
        </Grid>
      </form>
    </Stack>
  );
};
