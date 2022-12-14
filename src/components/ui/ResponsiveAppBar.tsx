import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link as MUILink } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface pagesLabels {
  evaluation: string;
  pomodoro: string;
  matrix: string;
  subject: string;
  topic: string;
  stadistics: string;
}

const pagesNames: pagesLabels = {
  evaluation: "Evaluaciones",
  pomodoro: "Pomodoro",
  matrix: "Prioridad",
  subject: "Asignaturas",
  topic: "Pendientes",
  stadistics: "Rendimiento",
};

const pages = [
  "evaluation",
  "pomodoro",
  "matrix",
  "subject",
  "topic",
  "stadistics",
];
const settings = ["Salir"];
const actions = {
  Logout: "Salir",
};

type ResponsiveAppBarProps = {
  image: string | null | undefined;
};

function ResponsiveAppBar({ image }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const router = useRouter();
  const pathname = router.pathname;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleActions = (action: string) => {
    console.log(action);
    switch (action) {
      case actions.Logout:
        signOut();
        handleCloseNavMenu();
        router.push("/");
        break;
    }
  };

  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{ maxWidth: "lg", margin: "0 auto" }}
    >
      <Container sx={{ width: "100%" }}>
        <Toolbar disableGutters>
          <EventIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "Raleway",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            UNA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                const key = page as keyof pagesLabels;

                return (
                  <MenuItem key={page}>
                    <Typography textAlign="center">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_DEV_URL}/${page}`}
                        passHref
                      >
                        <MUILink
                          sx={{
                            textDecoration: "none",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {pagesNames[key]}
                        </MUILink>
                      </Link>
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <EventIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            UNA
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              width: { sm: "60%" },
              fontWeight: "bold",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
            }}
          >
            {pages.map((page) => {
              const key = page as keyof pagesLabels;

              return (
                <Button
                  key={page}
                  size="small"
                  variant={pathname.includes(page) ? "contained" : "text"}
                  sx={{ py: 1 }}
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_DEV_URL}/${page}`}
                    passHref
                  >
                    <MUILink
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "Raleway",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {pagesNames[key]}
                    </MUILink>
                  </Link>
                </Button>
              );
            })}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {/* Avatar que se muestra en el navbar */}
            <Tooltip title="Opciones de panel">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ ml: { md: 4 } }} alt="Perfil" src={image ?? ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleActions(setting);
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
