import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import { url } from "../Url";
import "../css/PostList.css";
import { useNavigate, useParams } from "react-router-dom";
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
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [ref, inView] = useInView();
  const [thumbnail, setThumbnail] = useState([]);

  let { category, keyword } = useParams();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const getItems = useCallback(async () => {
    let config = {};
    let data = new FormData();
    if (category || keyword) {
      console.log(category, keyword);
      data.append("keyword", keyword ?? "");
      data.append("category", category ?? "");
      config = {
        method: "post",
        url: `${url}/post/search`,
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    } else {
      console.log("showall");
      config = {
        method: "get",
        url: `${url}/post/postList?page=${page}&size=9`,

        headers: {
          Authorization: "Bearer " + token,
        },
      };
    }
    setLoading(true);
    await axios(config)
      .then((res) => {
        console.log(res.data);
        if (!category && !keyword) {
          setItems((prevState) => [...prevState, ...res.data.postList]);
        } else {
          setItems(res.data.postList);
        }
        res.data.postList.map((post) => {
          if (post.photoId) {
            const config = {
              method: "get",
              url: `${url}/photo/${post.photoId}`,
              responseType: "blob",
              headers: {
                Authorization: "Bearer " + token,
              },
            };
            axios(config).then((res) => {
              const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
              setThumbnail((prevState) => [...prevState, { url: url, id: post.photoId }]);
            });
          }
        });
      })
      .catch((err) => {
        console.log("실패함");
        console.log(err);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getItems(category, keyword);
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
                {item.photoId ? <img src={thumbnail.find((e) => e.id === item.photoId)?.url} /> : <img src="/img/noimage.png" />}
                <div className="textBox">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="postTitle">제목 : {item.title}</div>
                  </div>
                  {item.isParticipate ? item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div> : <div style={{ height: "19.5px" }}></div>}
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <div>
                      <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/unlike.png" /> {item.likeCount}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <img style={{ width: "15px", height: "15px" }} src="/img/view.png" /> {item.viewCount}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <img style={{ width: "15px", height: "15px" }} src="/img/comment.png" /> {getCommentSize(item)}
                    </div>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <img style={{ width: "15px", height: "15px" }} src="/img/clock.png" /> {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                  </div>
                </div>
              </Post>
            ) : (
              <Post
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                {item.photoId ? <img src={thumbnail.find((e) => e.id === item.photoId)?.url} /> : <img src="/img/noimage.png" />}
                <div className="textBox">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="postTitle">제목 : {item.title}</div>
                  </div>
                  {item.isParticipate ? item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div> : <div style={{ height: "19.5px" }}></div>}
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <div>
                      <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/unlike.png" /> {item.likeCount}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <img style={{ width: "15px", height: "15px" }} src="/img/view.png" /> {item.viewCount}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <img style={{ width: "15px", height: "15px" }} src="/img/comment.png" /> {getCommentSize(item)}
                    </div>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <img style={{ width: "15px", height: "15px" }} src="/img/clock.png" /> {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                  </div>
                </div>
              </Post>
            );
          }
        })}
      </div>
      {!category && !keyword ? (
        isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="loading"></button>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
export default PostList;
