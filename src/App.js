import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import MainPageContainer from "./containers/MainPageContainer";
import RegistroContainer from "./containers/RegistroContainer";
import ResetPassContainer from "./containers/ResetPassContainer";
import "./styles/style.css"

function App() {
  return (
    <HashRouter>
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>

        <Routes>
          <Route path="/Registro" element={<RegistroContainer/>} />
          <Route path="/" element={<LoginContainer/>} />
          <Route path="/MainPage" element={<MainPageContainer />} />
          <Route path="/RP/:token" element={<ResetPassContainer/>} />
        </Routes>
    </HashRouter>
  );
}

export default App;
