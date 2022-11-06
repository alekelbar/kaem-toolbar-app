import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import axios from "axios";
// import { GetServerSideProps } from "next";

export const SubjectItem = () => {
  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Titulo de la asignatura
        </Typography>
        <Typography variant="h5" component="div">
          Descripción de la asignatura
        </Typography>
        <Typography variant="body2">
          Fecha inicial:
          <br />
          {'"A date"'}
          <br />
          Fecha Final:
          <br />
          {'"A date"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" size="small">
          Editar
        </Button>
        <Button variant="contained" color="warning" size="small">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};
