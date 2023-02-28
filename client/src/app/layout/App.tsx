import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import { Outlet } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
  const buyerId = getCookie('buyerId');
  if(buyerId){
    agent.Basket.get()
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
  else{
    setLoading(false);
  }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const palettType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palettType,
      background: {
        default: palettType === 'light' ? "#eaeaea" : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if(loading) return <LoadingComponents message="Initilizing App..."/>

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
