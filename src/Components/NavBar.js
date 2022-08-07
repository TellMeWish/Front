import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
function NavBar() {
  const navigate = useNavigate();
  return (
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
              <NavDropdown.Item href="#action3">여행</NavDropdown.Item>
              <NavDropdown.Item href="#action4">운동</NavDropdown.Item>
              <NavDropdown.Item href="#action5">공부</NavDropdown.Item>
              <NavDropdown.Item href="#action5">음식</NavDropdown.Item>
              <NavDropdown.Item href="#action5">취미</NavDropdown.Item>
              <NavDropdown.Item href="#action5">갖고싶은것</NavDropdown.Item>
              <NavDropdown.Item href="#action5">기타</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              onClick={() => {
                navigate("/createPost");
              }}
            >
              버킷리스트 등록
            </Nav.Link>
            <Nav.Link>지도로 검색</Nav.Link>
          </Nav>
          {!localStorage.getItem("token") ? (
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
          ) : (
            <Nav>
              <Nav.Link
                onClick={() => {
                  navigate("/profile");
                }}
              >
                프로필
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              >
                로그아웃
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
