import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import IconDrivops from "../../assets/iconDrivops.jpg";
import Chart1 from "../../components/Chart1";
import Chart2 from "../../components/Chart2";
import Chart3 from "../../components/Chart3";
import Chart4 from "../../components/Chart4";
import MainListItems from "../../components/MainListItems";
import SecondMainListItems from "../../components/SecondListItems";
import axios from "../../services/api";
import { getItem } from "../../utils/localStorage";
import { errorMessage } from "../../utils/reactToastify";

const drawerWidth = 180;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const navigateTo = useNavigate();

  const token = getItem("token");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [dataChart1, setDataChart1] = React.useState([" "]);
  const [dataChart2, setDataChart2] = React.useState([" "]);
  const [dataChart3, setDataChart3] = React.useState([" "]);
  const [dataChart4, setDataChart4] = React.useState([" "]);

  const chart01 = async () => {
    try {
      const response = await axios.get("/charts1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataChart1(response.data);
    } catch (error) {
      const dataError = error.response.data;
      if (dataError !== "jwt expired") {
        errorMessage("Oops... Tente mais tarde");
      }
      if (dataError === "jwt expired") {
        errorMessage("Sua seção expirou");
        clearLocalStorage();
        navigateTo("/");
      }
    }
  };

  const chart02 = async () => {
    try {
      const response = await axios.get("/charts2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataChart2(response.data);
    } catch (error) {
      const dataError = error.response.data;
      if (dataError !== "jwt expired") {
        errorMessage("Oops... Tente mais tarde");
      }
      if (dataError === "jwt expired") {
        errorMessage("Sua seção expirou");
        clearLocalStorage();
        navigateTo("/");
      }
    }
  };

  const chart03 = async () => {
    try {
      const response = await axios.get("/charts3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataChart3(response.data);
    } catch (error) {
      const dataError = error.response.data;
      if (dataError !== "jwt expired") {
        errorMessage("Oops... Tente mais tarde");
      }
      if (dataError === "jwt expired") {
        errorMessage("Sua seção expirou");
        clearLocalStorage();
        navigateTo("/");
      }
    }
  };

  const chart04 = async () => {
    try {
      const response = await axios.get("/charts4", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataChart4(response.data);
    } catch (error) {
      const dataError = error.response.data;
      if (dataError !== "jwt expired") {
        errorMessage("Oops... Tente mais tarde");
      }
      if (dataError === "jwt expired") {
        errorMessage("Sua seção expirou");
        clearLocalStorage();
        navigateTo("/");
      }
    }
  };

  React.useEffect(() => {
    chart01();
    chart02();
    chart03();
    chart04();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Avatar
            alt="Remy Sharp"
            src={IconDrivops}
            sx={{ width: 40, height: 40 }}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List component="nav" sx={{ height: "100%", py: 4 }}>
          <Box sx={{ height: "93%" }}>
            <Divider />
            <MainListItems />
            <Divider />
          </Box>
          <Box>
            <Divider />
            <SecondMainListItems />
            <Divider />
          </Box>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart1 dataChart1={dataChart1} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart2 dataChart2={dataChart2} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart3 dataChart3={dataChart3} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart4 dataChart4={dataChart4} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
