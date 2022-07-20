import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
let Post = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  padding: 20px;
`;

function PostList() {
  const [items, setItems] = useState();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`http://13.209.145.95:8081/post/postList?page=${page}&size=3`)
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
    <div>
      <div className="postList">
        {items?.map((item, i) => {
          if (item)
            return items.length - 1 == i && page <= items.length / 3 ? (
              <Post ref={ref}>
                <div>제목 : {item.title}</div>
              </Post>
            ) : (
              <Post>
                <div>제목 : {item.title}</div>
              </Post>
            );
        })}
      </div>
    </div>
  );
}

export default PostList;
