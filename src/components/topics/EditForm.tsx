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
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { subjectInterface } from "../Subjects/models/subject";
import { validationTopic } from "./helpers/formikConfig";
import Box from "@mui/material/Box";
import axios from "axios";
import { topicInterface } from "./models/topic";
import dayjs from "dayjs";

interface editTopicArgs {
  data: topicInterface;
  data_subjects: subjectInterface[];
}

export const EditTopicForm = ({ data, data_subjects }: editTopicArgs) => {
  const router = useRouter();
  const selectedSubject = data_subjects.find((s) => s._id === data.subjectId);
  console.log(data);

  return (
    <Stack m={5}>
      <Formik
        initialValues={data}
        onSubmit={async ({
          _id,
          deadline,
          descr,
          important,
          name,
          subjectId,
          urgent,
        }) => {
          const respond = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/topics/${_id}`,
            {
              subjectId,
              name,
              descr,
              deadline,
              important,
              urgent,
            }
          );

          if (respond.statusText !== "OK") {
            Swal.fire("OK!", "Algo ha fallado! :c", "error");
            return;
          }
          await Swal.fire("OK!", "Hemos actualizado el pendiente", "success");
          router.push("/topic");
        }}
        enableReinitialize
        validationSchema={validationTopic}
      >
        {(props) => {
          return (
            <Box component={"form"} onSubmit={props.handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    name="name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    label="nombre"
                    variant="outlined"
                    helperText="¿Cual es el nombre de su materia?"
                    fullWidth
                  />

                  {props.touched.name && props.errors.name ? (
                    <Alert severity="error">{props.errors.name}</Alert>
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
                    label="descripción"
                    variant="outlined"
                    helperText="¿Cual es la descripción de su materia?"
                    fullWidth
                  />

                  {props.touched.descr && props.errors.descr ? (
                    <Alert severity="error">{props.errors.descr}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="deadLine">
                    <Typography mb={1}>¿Fecha de entrega?</Typography>
                  </InputLabel>

                  <Input
                    fullWidth
                    name="deadline"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={dayjs(props.values.deadline).format("YYYY-MM-DD")}
                    id="deadLine"
                    required
                    sx={{ "& .MuiInputBase-input": { color: "black" } }}
                    type="date"
                  />
                  {props.touched.deadline && props.errors.deadline ? (
                    <Alert severity="error">{props.errors.deadline}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="tagImportant">Importancia</InputLabel>
                    <Select
                      sx={{ "& .MuiInputBase-input": { color: "black" } }}
                      id="tagImportant"
                      label="Importancia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.important}
                      name="important"
                    >
                      <MenuItem value={"importante"}>{"Importante"}</MenuItem>
                      <MenuItem value={"no importante"}>
                        {"No importante"}
                      </MenuItem>
                    </Select>
                  </FormControl>

                  {props.touched.important && props.errors.important ? (
                    <Alert severity="error">{props.errors.important}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="tagUrgent">Urgencia</InputLabel>
                    <Select
                      sx={{ "& .MuiInputBase-input": { color: "black" } }}
                      id="tagUrgent"
                      label="Urgencia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.urgent}
                      name="urgent"
                    >
                      <MenuItem value={"urgente"}>{"Urgente"}</MenuItem>
                      <MenuItem value={"no urgente"}>{"No urgente"}</MenuItem>
                    </Select>
                  </FormControl>

                  {props.touched.urgent && props.errors.urgent ? (
                    <Alert severity="error">{props.errors.urgent}</Alert>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="subjectId">Asignatura</InputLabel>
                    <Select
                      sx={{ "& .MuiInputBase-input": { color: "black" } }}
                      id="subjectId"
                      label="Asignatura"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.subjectId}
                      defaultValue={selectedSubject?._id}
                      name="subject"
                    >
                      {data_subjects.map((subject) => {
                        return (
                          <MenuItem key={subject._id} value={subject._id}>
                            {subject.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  {props.touched.subjectId && props.errors.subjectId ? (
                    <Alert severity="error">{props.errors.subjectId}</Alert>
                  ) : null}
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Button type="submit" variant="contained" color={"success"}>
                    Registrar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      </Formik>
    </Stack>
  );
};
