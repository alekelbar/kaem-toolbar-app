import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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

const pages = ["Asignaturas", "Pomodoro", "Prioridad", "Evaluaciones"];
const settings = ["Salir"];
const actions = {
  Logout: "Salir",
  suject: "Asignaturas",
  pomodoro: "Pomodoro",
  matrix: "Prioridad",
  evaluaciones: "Evaluaciones",
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
        router.push("/login");
        break;
      case actions.evaluaciones:
        router.push("/evaluation/evaluation");
        break;

      case actions.matrix:
        router.push("/matrix/matrix");
        break;

      case actions.pomodoro:
        router.push("/pomodoro/pomodoro");
        break;

      case actions.suject:
        router.push("/subject/subject");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "Raleway",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "primary",
              textDecoration: "none",
            }}
          >
            KAEM
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
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleActions(page);
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
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
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KAEM
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleActions(page);
                  console.log("actions!");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {/* Avatar que se muestra en el navbar */}
            <Tooltip title="Opciones de panel">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Perfil" src={image ?? ""} />
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
