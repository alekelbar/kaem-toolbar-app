import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserSessionContext } from "src/context/userSessionContext";
import { sessionModelInterface } from "../../models/sessionModel";
import { Container } from "@mui/system";

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
    <UserSessionContext.Provider value={session as sessionModelInterface}>
      <ResponsiveAppBar
        image={session?.user?.image ?? "https://i.imgur.com/b9NyUGm.png"}
      />
      <Container>{children}</Container>
    </UserSessionContext.Provider>
  );
};

export default Layout;
