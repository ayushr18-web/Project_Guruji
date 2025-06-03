"use client";

import { Typography, AppBar, Toolbar } from "@mui/material";
import { Library } from "lucide-react";

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Library style={{ marginRight: "8px" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Guruji Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
