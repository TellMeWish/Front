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

let Tag = styled.span`
  background: ${(prop) => prop.bg};
  border-radius: 5px;
  padding: 5px;
  maring-right: 5px;
  color: white;
`;
function InfoWindow(props) {
  const navigate = useNavigate();
  const progressColor = ["var(--color-light-green)", "var(--color-green)", "silver"];
  const progress = ["진행 전", "진행 중", "진행 완료"];

  const getCommentSize = (post) => {
    let size = 0;
    post?.commentList?.map((item) => {
      size += 1;
      item.commentList.map(() => {
        size += 1;
      });
    });
    return size;
  };
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
        <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: "10px" }}>
            <Tag bg="var(--color-beige)" style={{ marginRight: "5px" }}>
              {props.post.category}
            </Tag>
            <Tag bg={progressColor[props.post.isProgress]} style={{ marginRight: "5px" }}>
              {progress[props.post.isProgress]}
            </Tag>
            {props.post.isCompleted ? <Tag bg="silver">모잡 완료</Tag> : <Tag bg="var(--color-beige)">모집 중</Tag>}
          </div>
          <div style={{ display: "flex", marginTop: "28px" }}>
            <div>
              <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/unlike.png" /> {props.post.likeCount}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <img style={{ width: "15px", height: "15px" }} src="/img/view.png" /> {props.post.viewCount}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <img style={{ width: "15px", height: "15px" }} src="/img/comment.png" /> {getCommentSize(props.post)}
            </div>
          </div>
          <div style={{ marginTop: "5px", color: "gray" }}>
            <img style={{ width: "15px", height: "15px" }} src="/img/clock.png" /> {new Date(props.post.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
          </div>
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
