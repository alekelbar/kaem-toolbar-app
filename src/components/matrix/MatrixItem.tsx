import React from "react";
import { Card, Typography, Theme, Box, Button, Alert } from "@mui/material";
import { topicWeight } from "./models/topicWeight";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { subjectInterface } from "../Subjects/models/subject";

interface MatrixItemArgs {
  topic: topicWeight;
  subject: subjectInterface;
}

const alerts = [
  "Podría ignorarse",
  "Puede delegarse",
  "Puede atenderse luego",
  "No puede esperar",
];

const MatrixItem = ({ topic, subject }: MatrixItemArgs) => {
  return (
    <Box
      maxWidth={"md"}
      margin={"0 auto"}
      className={"animate__animated animate__flipInX"}
    >
      <Card sx={{ marginTop: 2, maxWidth: "md" }}>
        <CardContent
          sx={{
            backgroundColor: (theme: Theme) => theme.palette.primary.light,
            // padding: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Typography
            maxWidth={"100%"}
            variant="h5"
            color="text.primary"
            gutterBottom
            fontWeight={"bold"}
          >
            {topic.name}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: 12, fontWeight: "bold" }}
            component="p"
            margin={"0 auto"}
            overflow={"auto"}
            width={"90%"}
          >
            {subject.title}
            <Alert sx={{ p: 1, m: 2 }} variant="filled" color="info">
              {alerts.at(topic.weight - 1)}
            </Alert>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MatrixItem;
