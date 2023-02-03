import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FileUploadSingle from "../../components/FileUpload/FileUploadSingle";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@material-ui/icons/Menu";
import { axiosClient, downnLoadExcel } from "../../api/apiAgent";
import "./SubjectExpert.css";
import HomeIcon from '@mui/icons-material/Home';
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import SubjectIcon from '@mui/icons-material/Subject';
import ArticleIcon from '@mui/icons-material/Article';
import MuiDrawer from "@mui/material/Drawer";
import { ThemeProvider, createTheme, styled, Theme, useTheme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../../context/AuthContectProvider";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  SvgIcon,
  Collapse,
  Icon,
} from "@mui/material";

//mounica chages starts
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


const links = [
  { title: "HomePage", path: "/", icon: <HomeIcon /> },
  //{ title: "C#", path: "/Subjects", icon: <UploadFileIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
  
];

const subjectlinks = [
  { title: "React", path: "/subjects", icon: <SubjectIcon /> },
  { title: "C#", path: "/Subjects", icon: <SubjectIcon /> },
  { title: "CosmosDb", path: "/Subjects", icon: <SubjectIcon /> },
  { title: "JavaSript", path: "/Subjects", icon: <SubjectIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
  
];
//mounica changes end

const SubjectExpert = (props: any) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
//mounica chages starts
const [reopen, setReOpen] = useState(false);
const [openList, setOpenList] = React.useState(false);
const theme = useTheme();
const [open, setOpen] = React.useState(false);
const handleDrawerOpen = () => {
  setOpen(true);
};
const handleDrawerClose = () => {
  setOpen(false);
};

//mounica changes end
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const authContext = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const downloadFile = () => {
    downnLoadExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
        document.body.appendChild(link);
        link.click();
      }) 
      .catch((error) => {
        console.error(error);
      });
  };   

//mounica chages starts
return (
  <>
    <Box sx={{ display: "flex" }}>
     
        <>
          <AppBar className="Appbar" position="fixed" open={open}>
            <Toolbar style={{ minHeight: "8vh" }}
        className="tool-bar "
        >
              <IconButton
                color="default"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                id="menu-button"
                className={open ? "menu-icon-open" : "menu-icon-close"}
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Augmento Labs
              </Typography>
              {/* <Typography variant="h6" component="div" sx={{ flexGrow: 0.02 }}> */}
              <Button color="inherit" onClick={authContext.logout}>
               Log out
             </Button>
                {/* LOG OUT */}
              {/* </Typography> */}
            </Toolbar>
          </AppBar>
          {/* <ThemeProvider theme={darkTheme}> */}
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              {/* <List>
                {
                  links.map(({ title, path, icon }) => {
                    return (
                      <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={{
                          color: "inherit",
                          typography: "body1",
                          "&:hover": {
                            color: "grey.500",
                          },
                          "&.active": {
                            color: "text.secondary",
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                   
              </List> */}
        <List className="account-menu-list">
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => {
              navigate("/");
              handleDrawerClose();
            }}
          >
            <ListItemIcon sx={{
                              minWidth: -0.5,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}>
              <SvgIcon component={HomeIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Home Page"}  />
          </ListItemButton>
        </ListItem>
          <ListItemButton className="account-menu-list" 
              
          onClick={() => {
            setOpenList(!openList);
          }}
          
        >
          <ListItemIcon 
          sx={{
                              minWidth: -0.5,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}>
            <Icon component={ArticleIcon} />
          </ListItemIcon>
          <ListItemText primary="Subjects" sx={{ opacity: open ? 1 : 0 }}/>
          {openList ? <ExpandLess /> : <ExpandMore />}
          
        </ListItemButton>
        <Collapse
        //  style={{ marginLeft: "5%" }}
          in={openList}
          timeout="auto"
         unmountOnExit
        >
          <List>
                {
                  subjectlinks.map(({ title, path, icon }) => {
                    return (
                      <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={{
                          color: "inherit",
                          typography: "body1",
                          "&:hover": {
                            color: "grey.500",
                          },
                          "&.active": {
                            color: "text.secondary",
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                   
              </List>
              
              {/* <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/assignments");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <SvgIcon component={StarBorder} inheritViewBox />
              </ListItemIcon>
              <ListItemText primary="Manage User" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/orgDetails");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
              <SvgIcon component={StarBorder} inheritViewBox />
              </ListItemIcon>
              <ListItemText primary="Manage Organization" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/manageCollector");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <SvgIcon component={StarBorder} inheritViewBox />
              </ListItemIcon>
              <ListItemText primary="Manage Collector" />
            </ListItemButton>
          </List> */}
          
        </Collapse>
        </List>
        {/* <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/home");
              handleDrawerClose();
            }}
          ></ListItemButton> */}
              {/* <List>
        {[ 'HomePage','Subjects', 'FileUploading', 'File Download'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <UploadFileIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      </Drawer>
     {/* </ThemeProvider> */}
      </>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
     
      </Box>
  </>
);
//mounica chages ends
};

export default SubjectExpert;
