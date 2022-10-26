import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LogoutIcon from '@mui/icons-material/Logout';

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  { name: "บันทึกข้อมูลอุปกรณ์", icon: <BrowserUpdatedIcon />, path: "/equipment/create" },
  { name: "ข้อมูลอุปกรณ์", icon: <WorkHistoryIcon />, path: "/equipment" },
];

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const signOut = () => {
    localStorage.clear()
    window.location.href = "/";
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ระบบข้อมูลอุปกรณ์
          </Typography>
        </Toolbar>
        <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}>
          <List>
            {menu.map((item, index) => (
              <Link
                to={item.path}
                key={item.name}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
            <ListItem button onClick={signOut}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </Box>

  );
}
export default Navbar;