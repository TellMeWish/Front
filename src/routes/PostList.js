import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import "../css/PostList.css";
let Post = styled.div`
  width: 800px;
  height: 400px;
  padding: 20px;
  background: var(--color-light-green);
  margin-top: 200px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  img {
    width: 400px;
  }
  div {
    padding: 10px;
  }
`;

function PostList() {
  const [items, setItems] = useState();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`http://13.209.145.95:8081/post/postList?page=${page}&size=4`)
      .then((res) => {
        if (items) {
          setItems((prevState) => [...prevState, ...res.data.content]);
          console.log(page);
        } else {
          setItems([...res.data.content]);
          console.log(page);
        }
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
      setPage(page + 1);
    }
  }, [inView, loading]);

  console.log(items);
  return (
    <div style={{ background: "var(--color-skin)" }}>
      <div className="postList">
        {items?.map((item, i) => {
          if (item)
            return items.length - 1 == i && page <= items.length / 3 ? (
              <Post ref={ref}>
                <img src={item.files[0] ? item.files[0] : process.env.PUBLIC_URL + "/img/noimage.png"}></img>
                <div>제목 : {item.title}</div>
              </Post>
            ) : (
              <Post>
                <img src={item.files[0] ? item.files[0] : process.env.PUBLIC_URL + "/img/noimage.png"}></img>
                <div>제목 : {item.title}</div>
              </Post>
            );
        })}
      </div>
    </div>
  );
}

export default PostList;
