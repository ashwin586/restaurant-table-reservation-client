// import { BrowserRouter as Router } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MainRouter from "./routes/MainRouter";
import UserRouter from "./routes/user/UserRouter";

function App() {
  return (
    <>
      {/* <Router>
        <MainRouter />
      </Router> */}
      {/* <RouterProvider router={UserRouter}/> */}
      <MainRouter />
      <ToastContainer />
    </>
  );
}

export default App;
