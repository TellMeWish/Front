import "../css/createPost.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { url } from "../Url";
import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import Searchbar from "../Components/Searchbar";
import { key } from "../Key";
import Carousel from "react-bootstrap/Carousel";
import Map from "../Components/Map";
let Button = styled.button`
  border: none;
  background: var(--color-light-green);
  width: 330px;
  height: 50px;
`;
function CreatePost() {
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [isPrivate, setIsPrivate] = useState(0);
  const [isParticipate, setIsParticipate] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showMap, setShowMap] = useState(0);
  const [files, setFiles] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 });

  const [imgs, setImg] = useState([]);

  const addPlace = (places) => {
    if (places) {
      setPlaces(places);
    }
  };

  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps);
    }
  };

  const mouseOver = (key) => {
    setTarget(key);
  };
  const mouseOut = (key) => {
    setTarget(0);
  };
  useEffect(() => {
    if (places[0]) {
      setLat(places[0].geometry.location.lat());
      setLng(places[0].geometry.location.lng());
    }
  }, [places]);

  const submitPost = async (event) => {
    event.preventDefault();

    var FormData = require("form-data");
    var data = new FormData();

    let postContent = {
      title: title,
      isPrivate: isPrivate,
      isParticipate: isParticipate,
      category: category,
      content: content,
      location: {
        longitude: lng,
        latitude: lat,
      },
    };
    data.append("dto", new Blob([JSON.stringify(postContent)], { type: "application/json" }));
    //data.append("img", files);
    imgs.map((img) => {
      data.append("img", img);
    });

    // data.append("review", new Blob([JSON.stringify(content)], { type: "application/json" }));

    const config = {
      method: "post",
      url: `${url}/post`,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(files);
        alert("등록 완료");
        navigate("/postList");
      })
      .catch((err) => {
        alert("실패");
        console.log(token);
        console.log(err);
      });
  };

  const addFiles = (e) => {
    e.preventDefault();
    const img = e.target.files;

    const tempArr = [...imgs, img];

    setImg(tempArr);
    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFiles([...files, prevFile]);
    e.target.value = "";
  };
  const deleteFile = (id) => {
    setFiles(files.filter((_, index) => index !== id));
    console.log("delete");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <form id="createForm" onSubmit={submitPost}>
        <div className="checkList">
          <div className="checkList">
            <div style={{ marginRight: "20px" }}>
              비공개{" "}
              <input
                type="checkbox"
                name="isPrivate"
                onChange={(e) => {
                  e.target.checked ? setIsPrivate(1) : setIsPrivate(0);
                }}
              />
            </div>
            <div>
              참여 여부{" "}
              <input
                type="checkbox"
                name="isParticipate"
                onChange={(e) => {
                  e.target.checked ? setIsParticipate(1) : setIsParticipate(0);
                }}
              />
            </div>
          </div>
          <div className="category">
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="" selected>
                ===선택===
              </option>
              <option value="여행">여행</option>
              <option value="운동">운동</option>
              <option value="공부">공부</option>
              <option value="음식">음식</option>
              <option value="취미">취미</option>
              <option value="갖고싶은것">갖고싶은것</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
        <div className="formBox">
          <div>제목</div>
          <input
            className="text"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="formBox" style={{ alignItems: "flex-start" }}>
          <div>내용</div>
          <textarea
            placeholder="여기에 입력하세요"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="formBox">
          <div>사진</div>
          <input type="file" onChange={addFiles}></input>
        </div>
        {files[0] ? (
          <Carousel variant="dark">
            {files.map((img, i) => {
              if (img)
                return (
                  <Carousel.Item id={`item${i}`} style={{ width: "700px", height: "400px", background: "white" }}>
                    <Carousel.Caption>
                      <button
                        style={{
                          position: "relative",
                          border: "1px solid black",
                          background: "white",
                        }}
                        type="button"
                        onClick={() => {
                          deleteFile(i);
                        }}
                      >
                        사진 삭제
                      </button>
                    </Carousel.Caption>
                    <img style={{ height: "100%", objectFit: "contain" }} className="d-block w-100" src={img} />
                  </Carousel.Item>
                );
            })}
          </Carousel>
        ) : null}
        {showMap ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>장소 </div>
            <div>
              {apiReady && googlemaps && <Searchbar map={map} mapApi={googlemaps} addPlace={addPlace} />}
              <div style={{ width: "600px", height: "400px" }} className="googleMap">
                <GoogleMap
                  bootstrapURLKeys={{ key: key, libraries: "places" }}
                  defaultZoom={0}
                  defaultCenter={center}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                  onChildClick={mouseOver}
                  onClick={() => {
                    mouseOut();
                  }}
                >
                  {places.length !== 0 &&
                    places.map((place) => {
                      console.log(place.geometry.location.lat(), place.geometry.location.lng());
                      return <Marker place={place} key={place.place_id} text={place.name} lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} />;
                    })}
                </GoogleMap>
              </div>
            </div>
          </div>
        ) : null}
        <div className="buttonBox">
          <Button
            type="button"
            onClick={(e) => {
              if (e.target.innerText == "위치정보 추가") {
                setShowMap(1);
                e.target.innerText = "위치정보 제거";
              } else {
                setShowMap(0);
                e.target.innerText = "위치정보 추가";
              }
            }}
          >
            위치정보 추가
          </Button>
          <Button>등록하기</Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
