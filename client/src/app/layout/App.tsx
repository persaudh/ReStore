import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import { Outlet } from "react-router-dom";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispacth = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
  const buyerId = getCookie('buyerId');
  if(buyerId){
    agent.Basket.get()
    .then(basket => dispacth(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
  else{
    setLoading(false);
  }
  }, [dispacth])

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
