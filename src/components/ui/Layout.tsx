import React from "react";
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type LayoutProps = {
  children: Array<JSX.Element> | JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading")
    return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;

  if (status == "unauthenticated") {
    router.push("/login");
  }

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        margin: "0 auto",
      }}
    >
      <ResponsiveAppBar
        image={session?.user?.image ?? "https://i.imgur.com/b9NyUGm.png"}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Layout;
