import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { SessionProvider, getSession } from "next-auth/react";
import createEmotionCache from "src/createEmotionCache";
import { createTheme } from "@mui/material";
import { Layout } from "src/components";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { sessionModelInterface } from "../src/models/sessionModel";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
    },
    secondary: {
      main: "#b71c1c",
      light: "#f05545",
      dark: "#7f0000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },
  },
  typography: {
    allVariants: {
      color: "black",
      fontFamily: "Montserrat, Raleway, Roboto",
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: sessionModelInterface;
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter();

  const loginPage = router.pathname.includes("login");

  const {
    session,
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={createTheme(theme)}>
          <CssBaseline />
          {loginPage ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
};
