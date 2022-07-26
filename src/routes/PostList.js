import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import "../css/PostList.css";
import { useNavigate } from "react-router-dom";
let Post = styled.div`
  width: 350px;
  height: 400px;
  padding: 20px;
  background: var(--color-light-green);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s linear;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  img {
    width: 300px;
    height: 200px;
  }
  &:hover {
    transform: translateY(-30px);
  }
  cursor: grab;
`;

function PostList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [ref, inView] = useInView();

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`http://13.209.145.95:8081/post/postList?page=${page}&size=6`)
      .then((res) => {
        if (items) {
          setItems((prevState) => [...prevState, ...res.data.content]);
        } else setItems((prevState) => [...prevState, ...res.data.content]);
      })
      .catch(() => {
        console.log("실패함");
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setIsLoading(true);
      setTimeout(() => {
        setPage((prevState) => prevState + 1);
        setIsLoading(0);
      }, 1500);
    }
  }, [inView]);

  return (
    <div style={{ background: "var(--color-skin)", width: "100%", padding: "50px" }}>
      <div className="postList">
        <button
          className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
          onClick={handleTop} // 버튼 클릭시 함수 호출
        >
          TOP
        </button>
        {items.map((item, i) => {
          if (item) {
            return items.length - 1 == i ? (
              <Post
                ref={ref}
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                <img src={item.files[0] ? item.files[0] : process.env.PUBLIC_URL + "/img/noimage.png"}></img>
                <div className="textBox">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="postTitle">제목 : {item.title}</div>
                  </div>
                  {item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div>}
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <div>❤️ : {item.likeCount}</div>
                    <div style={{ marginLeft: "10px" }}>조회수 : {item.viewCount}</div>
                    <div style={{ marginLeft: "10px" }}></div>
                  </div>
                  <div style={{ marginTop: "5px" }}>시간 : {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</div>
                </div>
              </Post>
            ) : (
              <Post
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                <img src={item.files[0] ? item.files[0] : process.env.PUBLIC_URL + "/img/noimage.png"}></img>
                <div className="textBox">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="postTitle">제목 : {item.title}</div>
                  </div>
                  {item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div>}
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <div>❤️ : {item.likeCount}</div>
                    <div style={{ marginLeft: "10px" }}>조회수 : {item.viewCount}</div>
                    <div style={{ marginLeft: "10px" }}></div>
                  </div>
                  <div style={{ marginTop: "5px" }}>시간 : {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</div>
                </div>
              </Post>
            );
          }
        })}
      </div>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="loading"></button>
        </div>
      ) : null}
    </div>
  );
}
export default PostList;
