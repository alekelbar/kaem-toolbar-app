import { Alert, Box, Button, Typography, Stack } from "@mui/material";
import MatrixItem from "./MatrixItem";
import { topicWeight } from "./models/topicWeight";
import { Container } from "@mui/system";
import { subjectInterface } from "../Subjects/models/subject";
import Swal from "sweetalert2";

interface matrixArgs {
  topics: topicWeight[];
  dataSubject: subjectInterface[];
}

export const Matrix = ({ topics, dataSubject }: matrixArgs) => {
  const handleInfo = () => {
    Swal.fire({
      title:
        "Hemos deducido este orden en función de su importancia, y urgencia.",
      icon: "question",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  return (
    <Container>
      <Typography
        maxWidth={"100%"}
        textAlign={"center"}
        color="primary"
        gutterBottom
        fontWeight={"bold"}
        mt={2}
        variant="h5"
      >
        Orden prioritario
      </Typography>
      <Stack maxWidth={"300px"} m={{ xs: "0 auto" }}>
        <Button variant="contained" color="info" onClick={handleInfo}>
          ¿Por qué este orden?
        </Button>
      </Stack>
      {topics.map((t) => (
        <MatrixItem
          key={t._id}
          topic={t}
          subject={
            dataSubject.find((e) => e._id === t.subjectId) as subjectInterface
          }
        />
      ))}
    </Container>
  );
};
