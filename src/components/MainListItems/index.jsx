import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function MainListItems() {
  const navigateTo = useNavigate();

  return (
    <>
      <ListItemButton onClick={() => navigateTo("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigateTo("/register")}>
        <ListItemIcon>
          <AppRegistrationIcon />
        </ListItemIcon>
        <ListItemText primary="Registros" />
      </ListItemButton>
    </>
  );
}
