import { post } from "jquery";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

let Post = styled.div`
  background: white;
  zindex: 999;
  width: 200px;
  height: 150px;
  position: absolute;
  bottom: 50px;
  border-radius: 5px;
  cursor: default;
`;
function InfoWindow(props) {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Post>
        <div style={{ fontSize: "18px", fontWeight: "500", color: "#000082", padding: "10px", borderBottom: "1px black solid" }}>
          <div
            style={{ cursor: "grab", overflow: "hidden", textOverflow: " ellipsis", whiteSpace: "nowrap" }}
            onClick={() => {
              navigate(`/detail/${props.post.id}`);
            }}
          >
            {props.post.title}
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <div>작성자 : {props.post.post_user_id.nickname}</div>
          <div>카테고리 : {props.post.category}</div>

          <div>모집여부 : {props.post.isCompleted ? <span>X</span> : <span>O</span>}</div>
        </div>
      </Post>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "0px",
          height: "0px",
          borderTop: "20px white solid",
          borderBottom: "20px transparent solid",
          borderLeft: "20px transparent solid",
          borderRight: "20px transparent solid",
        }}
      ></div>
    </div>
  );
}
export default InfoWindow;
