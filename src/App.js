import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Adminpage from "./components/Adminpage";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/admin" element={<Adminpage />} />
            <Route path="/homepage" element={<Homepage />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
