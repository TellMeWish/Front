import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import CreatePost from "./routes/CreatePost";
import PostList from "./routes/PostList";
import Detail from "./routes/Detail";
import Profile from "./routes/Profile";
import UpdatePost from "./routes/UpdatePost";
import MapSearch from "./routes/MapSearch";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/postList/:category/:keyword" element={<PostList />} />
        <Route path="/postList//:keyword" element={<PostList />} />
        <Route path="/postList/:category/" element={<PostList />} />
        <Route path="/postList" element={<PostList />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/updatePost/:id" element={<UpdatePost />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mapSearch" element={<MapSearch />} />
      </Routes>
    </div>
  );
}

export default App;
