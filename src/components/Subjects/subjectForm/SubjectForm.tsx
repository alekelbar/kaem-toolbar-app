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
import { Box } from "@mui/system";
import axios, { HttpStatusCode } from "axios";
import { useFormik, FormikValues } from "formik";
import { formVal, initialValues } from "./helpers/FormikConfig";
import { useContext, useState } from "react";
import { UserSessionContext } from "../../../context/userSessionContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const SubjectForm = () => {
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
        const respond = await axios.post(`${process.env.API_URL}/subjects`, {
          user_id: userId,
          title: title,
          descr: description,
          startAt: startAt,
          endAt: endAt,
        });

        if (respond.statusText !== "Created") {
          Swal.fire("OK!", "Algo ha fallado! :c", "error");
          return;
        }
        await Swal.fire("OK!", "Hemos creado la asignatura", "success");
        router.push("/subject/subject");
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: formVal,
  });

  return (
    <Stack m={5}>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
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
              variant="filled"
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
              variant="filled"
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
      </Box>
    </Stack>
  );
};
