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
import { Box, Container } from "@mui/system";
import { useFormik, FormikValues } from "formik";
import { formVal, initialValues } from "./helpers/FormikConfig";

export const SubjectForm = () => {
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
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
