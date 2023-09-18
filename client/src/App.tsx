import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Redirect } from "./pages/Redirect";
import { Panel } from "./pages/Panel";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personal-panel" element={<Panel />} />
          <Route path="/callback" element={<Redirect />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
