import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, TextField, Box } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Weather from './components/Weather';
import fetchWeather from './api/weatherApi';

function Home() {
  return (
    <Card sx={{ margin: 2, maxWidth: 600, mx: "auto" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Información del Clima
        </Typography>
        <Weather />
      </CardContent>
    </Card>
  );
}

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const temps = await fetchWeather(city);
      console.log('Temperaturas:', temps);
    }
    if (city) {
      fetchData();
    }
  }, [city]);

  return (
    <>

      <Box sx={{ margin: 2, maxWidth: 600, mx: "auto" }} style={{ backgroundColor: "white" }}>
        <TextField
          label="Buscar ciudad"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setCity(inputValue)}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </Box>
    </>
  );
}

function HelloWorld() {
  return (
    <Typography variant="h3" component="div">
      Hello, World!
    </Typography>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/search" onClick={toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar" />
          </ListItem>
          <ListItem button component={Link} to="/hello" onClick={toggleDrawer}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Hola mundo" />
          </ListItem>
        </List>
      </Drawer>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hello" element={<HelloWorld />} />
      </Routes>
    </>
  );
}

export default App;
