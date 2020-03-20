//import About from "../layouts/Home/About";
import Register from "../layouts/Home/Register";
import Authentification from "../layouts/Home/Login";
//import Dashboard from "./Dashboard.js";

const indexRoutes = [
  { 
    path: "/", 
    component: Authentification,
    exact: true
  },
  { 
    path: "/register", 
    component: Register 
  },
  { 
    path: "/login", 
    component: Authentification 
  }
];

//const dashboardRoutes = Dashboard;

export default indexRoutes;
