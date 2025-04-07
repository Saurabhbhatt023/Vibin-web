import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/Chat";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import RefundPolicy from "./components/RefundPolicy";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;