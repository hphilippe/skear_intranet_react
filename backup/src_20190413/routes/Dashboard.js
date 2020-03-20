import App from "../layouts/Dashboard/App";
import Profile from "../layouts/Dashboard/Profile";
import Dashboard from "../layouts/Dashboard/Dashboard";
import About from "../layouts/Dashboard/About";
import PostCreate from "../components/Post/PostCreate";
import PostEdit from "../components/Post/PostEdit";
import Post from "../components/Post";
import PostItem from "../components/Post/PostItem";
import Digital from "../layouts/Dashboard/Digital";
import Games from "../layouts/Dashboard/Games";

const dashboardRoutes = [
  { 
    path: "/app", 
    component: App
  },
  { 
    path: "/about", 
    component: About
  },
  { 
    path: "/post/:slug/:title", 
    component: PostItem
  },
  { 
    path: "/post", 
    component: Post
  },
  { 
    path: "/post/create", 
    component: PostCreate
  },
  { 
    path: "/post/edit/:id", 
    component: PostEdit
  },
  { 
    path: "/dashboard/:id/:title", 
    component: Dashboard
  },
  { 
    path: "/profil", 
    component: Profile
  },
  { 
    path: "/digital", 
    component: Digital
  },
  { 
    path: "/games", 
    component: Games
  }
];

export default dashboardRoutes;
