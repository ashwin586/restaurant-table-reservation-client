import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MainRouter from "./routes/MainRouter";

function App() {
  return (
    <>
      <Router>
        <MainRouter />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
