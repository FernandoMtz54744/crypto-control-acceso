import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import MainPageContainer from "./containers/MainPageContainer";
import RegistroContainer from "./containers/RegistroContainer";
import "./styles/style.css"

function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>

        <Routes>
          <Route exact path="/Registro" element={<RegistroContainer/>} />
          <Route exact path="/" element={<LoginContainer/>} />
          <Route exact path="/MainPage" element={<MainPageContainer />} />
        </Routes>
    </Router>
  );
}

export default App;
