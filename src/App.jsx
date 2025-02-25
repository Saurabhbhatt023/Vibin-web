import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;