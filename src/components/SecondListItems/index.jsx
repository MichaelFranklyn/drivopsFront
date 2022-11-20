import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { clearLocalStorage } from "../../utils/localStorage";

export default function MainListItems() {
  const navigateTo = useNavigate();

  function exitPlatform() {
    navigateTo("/");
    clearLocalStorage();
  }

  return (
    <>
      <ListItemButton onClick={() => exitPlatform()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton>
    </>
  );
}
