import { Button, Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { Stack } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

const Login = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      bgcolor="primary.main"
      justifyContent="space-evenly"
      alignContent={"center"}
    >
      <Stack
        component={Paper}
        elevation={24}
        borderRadius={"15px"}
        maxWidth={"md"}
        height="40%"
        bgcolor="white"
        margin="50px auto"
        display={"flex"}
        justifyContent="center"
      >
        <Button
          sx={{ width: "70%", margin: "0 auto" }}
          onClick={() => {
            signIn();
          }}
          variant="contained"
        >
          <Typography variant="overline" color={"white"}>
            Ingresar con redes sociales
          </Typography>
          <GitHubIcon />
          <GoogleIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session: null,
    },
  };
};

export default Login;
