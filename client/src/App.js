import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={() => <Navigate to="/posts" />} />
          <Route path="/posts" exact Component={Home} />
          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" Component={PostDetails} />
          <Route
            path="/auth"
            exact
            Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
