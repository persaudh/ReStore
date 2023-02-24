import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import { Outlet } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palettType = darkMode ? 'dark' : 'light';
 const theme = createTheme({
  palette:{
    mode: palettType,
    background:{
      default: palettType === 'light' ? "#eaeaea" : '#121212'
    }
  }
 })

 function handleThemeChange(){
  setDarkMode(!darkMode)
 }

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
