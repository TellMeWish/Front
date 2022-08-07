import "../css/createPost.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import styled from "styled-components";
import axios from "axios";
import { url } from "../Url";
import Searchbar from "../Components/Searchbar";
import { key } from "../Key";
let Button = styled.button`
  border: none;
  background: var(--color-light-green);
  width: 330px;
  height: 50px;
`;
function CreatePost() {
  let navigate = useNavigate();

  const [isPrivate, setIsPrivate] = useState(0);
  const [isParticipate, setIsParticipate] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 });
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({});
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(null);

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
  const submitPost = async (event) => {
    event.preventDefault();
    const config = {
      method: "post",
      url: `${url}/post`,
      data: {
        userId: 1,
        isPrivate: isPrivate,
        isParticipate: isParticipate,
        category: category,
        title: title,
        content: content,
      },
    };
    await axios(config)
      .then((res) => {
        console.log(res);
        alert("등록 완료");
        navigate("/postList");
      })
      .catch(() => {
        alert("실패");
      });
  };
  useEffect(() => {
    if (places[0]) setPosition({ lng: places[0].geometry.location.lng(), lat: places[0].geometry.location.lat() });
  }, [places]);
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <form className="createForm" onSubmit={submitPost}>
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
        <div>
          {apiReady && googlemaps && <Searchbar map={map} mapApi={googlemaps} addPlace={addPlace} />}
          <div style={{ height: "400px" }} className="googleMap">
            <GoogleMap
              bootstrapURLKeys={{ key: key, libraries: "places" }}
              defaultZoom={0}
              defaultCenter={center}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              onChildClick={markerClicked}
            >
              {places.length !== 0 &&
                places.map((place) => {
                  return <Marker key={place.id} text={place.name} lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} />;
                })}
            </GoogleMap>
          </div>
        </div>
        <div className="buttonBox">
          <Button type="submit">등록하기</Button>
          <Button>초기화하기</Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
