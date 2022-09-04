import Map from "../Components/Map";
import SearchBox from "../Components/SearchBox2";
import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import axios from "axios";
import { url } from "../Url";
import styled from "styled-components";
import Searchbar from "../Components/Searchbar";
import React, { useEffect, useState } from "react";
import { key } from "../Key";
import { useNavigate } from "react-router-dom";
let Loading = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: none;
  border-top: 2px solid #1d9af2;
  border-right: 2px solid transparent;
  border-bottom: none;
  border-left: none;
  animation: spinner5 700ms linear infinite;
  cursor: none;
`;

function MapSearch() {
  const token = localStorage.getItem("token");
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({});
  const [markers, setMarkers] = useState([]);
  const [showmap, setShowmap] = useState(0);

  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          center.lat = position.coords.latitude;
          center.lng = position.coords.longitude;
          setShowmap(1);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
      return;
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps);
    }
  };
  const addPlace = (places) => {
    if (places) {
      setPlaces(places);
    }
  };
  const mouseOver = (key) => {
    setTarget(key * 1);
  };
  const mouseOut = (key) => {
    setTarget(0);
  };

  useEffect(() => {
    if (places[0]) {
      const config = {
        method: "get",
        url: `${url}/post/locations?lat=${places[0].geometry.location.lat()}&lng=${places[0].geometry.location.lng()}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios(config).then((res) => {
        setMarkers([...res.data.postList]);
      });
    }
  }, [places]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
      <div style={{ width: "1000px", height: "600px" }} className="googleMap">
        {apiReady && googlemaps && (
          <div className="searchBar">
            <input style={{ display: "none" }}></input>
            <SearchBox map={map} mapApi={googlemaps} addPlace={addPlace} />
          </div>
        )}
        {showmap ? (
          <GoogleMap
            bootstrapURLKeys={{ key: key, libraries: "places" }}
            defaultZoom={15}
            defaultCenter={center}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            onChildClick={mouseOver}
            onClick={() => {
              mouseOut();
            }}
          >
            {markers[0] &&
              markers.map((marker) => {
                return <Marker key={marker.id} lat={marker.location.latitude} lng={marker.location.longitude} place={marker} target={marker.id === target}></Marker>;
              })}
          </GoogleMap>
        ) : (
          <div style={{ height: "600px", display: "flex", justifyContent: "center", alignItems: "center", background: "" }}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
export default MapSearch;
