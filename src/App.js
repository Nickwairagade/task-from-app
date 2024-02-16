import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.js";
// import Edit from "./pages/Edit/Edit.js";
import Profile from "./pages/Profile/Profile.js";
import Register from "./pages/Register/Register.js";
import Headers from "./components/Headers/Headers.js"
import Error from './pages/Error/Error.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route  path='/register' element={<Register/>} />
          {/* <Route path='/edit/:id' element={<Edit />}/> */}
          <Route  path='/userprofile/:id' element={<Profile/>} />
          <Route path='/error' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
