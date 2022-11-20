import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import IconDrivops from "../../assets/iconDrivops.jpg";
import Cars from "../../components/Cars";
import MainListItems from "../../components/MainListItems";
import Sales from "../../components/Sales";
import SecondMainListItems from "../../components/SecondListItems";
import Sellers from "../../components/Sellers";
import axios from "../../services/api";
import { clearLocalStorage, getItem } from "../../utils/localStorage";
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

function RegisterContent() {
  const token = getItem("token");
  const [open, setOpen] = React.useState(true);
  const [listCars, setListCars] = React.useState([" "]);
  const [listSellers, setListSellers] = React.useState([" "]);
  const [listSales, setListSales] = React.useState([" "]);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
  const navigateTo = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const loadCars = async () => {
    try {
      const response = await axios.get("/cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListCars(response.data);
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

  const loadSellers = async () => {
    try {
      const response = await axios.get("/sellers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListSellers(response.data);
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

  const loadSales = async () => {
    try {
      const response = await axios.get("/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListSales(response.data);
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
    loadCars();
    loadSellers();
    loadSales();
  }, []);

  React.useEffect(() => {
    loadCars();
    loadSellers();
    loadSales();
  }, [openModal, openModal2, openModal3]);

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
            Registros
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
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Cars
                  listCars={listCars}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  loadCars={loadCars}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Sellers
                  listSellers={listSellers}
                  openModal2={openModal2}
                  setOpenModal2={setOpenModal2}
                  loadSellers={loadSellers}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Sales
                  listSales={listSales}
                  openModal3={openModal3}
                  setOpenModal3={setOpenModal3}
                  loadSales={loadSales}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <RegisterContent />;
}
