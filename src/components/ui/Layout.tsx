import React from "react";
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserSessionContext } from "src/context/userSessionContext";
import { sessionModelInterface } from "../../models/sessionModel";

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
    <main>
      <UserSessionContext.Provider value={session as sessionModelInterface}>
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            margin: "0 auto",
            position: "relative",
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
      </UserSessionContext.Provider>
    </main>
  );
};

export default Layout;
