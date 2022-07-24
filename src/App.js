import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import PostWrtie from "./routes/PostWrite";
import PostList from "./routes/PostList";
import { useNavigate } from "react-router-dom";
import "./css/App.css";

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar expand="lg" className="nav_bar" style={{ fontFamily: "1009" }}>
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ fontSize: "50px", cursor: "pointer", margin: "0 20px" }}
          >
            소원을말해봐
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link
                onClick={() => {
                  navigate("/postList");
                }}
              >
                버킷리스트 목록
              </Nav.Link>
              <NavDropdown title="카테고리" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">여행하기</NavDropdown.Item>
                <NavDropdown.Item href="#action4">이것</NavDropdown.Item>
                <NavDropdown.Item href="#action5">저것</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2">지도로 검색</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                회원가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/postList" element={<PostList />} />
        <Route path="/postwrite" element={<PostWrtie />} />
      </Routes>
    </div>
  );
}

export default App;
