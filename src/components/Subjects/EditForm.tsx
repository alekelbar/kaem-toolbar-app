import {
  Alert,
  Grid,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { subjectsEditValidation } from "./helpers/FormikConfig";
import { subjectInterface } from "./models/subject";

export const EditSubjectForm = ({ data }: { data: subjectInterface }) => {
  const router = useRouter();

  return (
    <Stack m={5}>
      <Formik
        initialValues={{ ...data }}
        validationSchema={subjectsEditValidation}
        onSubmit={async ({ user_id, title, descr, startAt, endAt, _id }) => {
          const respond = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/subjects/${_id}`,
            {
              user_id: user_id,
              title: title,
              descr: descr,
              startAt: dayjs(startAt),
              endAt: dayjs(endAt),
            }
          );

          console.log(respond.statusText);

          if (respond.statusText !== "OK") {
            Swal.fire("OK!", "Algo ha fallado! :c", "error");
            return;
          }
          await Swal.fire("OK!", "Hemos actualizado la asignatura", "success");
          router.push("/subject");
        }}
        enableReinitialize
      >
        {(props) => {
          //   console.log(props);
          return (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    name="title"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.title}
                    label="Titulo"
                    variant="outlined"
                    helperText="¿Cual es el nombre de su materia?"
                    fullWidth
                  />

                  {props.touched.title && props.errors.title ? (
                    <Alert severity="error">{props.errors.title}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    name="descr"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.descr}
                    label="Descripción"
                    variant="outlined"
                    helperText="Brinde una lígera descripción"
                    fullWidth
                  />
                  {props.touched.descr && props.errors.descr ? (
                    <Alert severity="error">{props.errors.descr}</Alert>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="startDate">
                    <Typography>Inicia</Typography>
                  </InputLabel>

                  <Input
                    fullWidth
                    name="startAt"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={dayjs(props.values.startAt).format("YYYY-MM-DD")}
                    id="startDate"
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    type="date"
                  />
                  {props.touched.startAt && props.errors.startAt ? (
                    <Alert severity="error">{props.errors.startAt}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="endDate">
                    <Typography>Concluye</Typography>
                  </InputLabel>

                  <Input
                    fullWidth
                    name="endAt"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={dayjs(props.values.endAt).format("YYYY-MM-DD")}
                    id="endAt"
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    type="date"
                  />
                  {props.touched.endAt && props.errors.endAt ? (
                    <Alert severity="error">{props.errors.endAt}</Alert>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Button type="submit" variant="contained" color={"success"}>
                  Actualizar
                </Button>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Stack>
  );
};
