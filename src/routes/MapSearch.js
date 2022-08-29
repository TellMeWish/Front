import Map from "../Components/Map";
import SearchBox from "../Components/SearchBox2";
import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import axios from "axios";
import { url } from "../Url";
import Searchbar from "../Components/Searchbar";
import React, { useEffect, useState } from "react";
import { key } from "../Key";
import { useNavigate } from "react-router-dom";

function MapSearch() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 35.18952, lng: 129.0715 });
  const [markers, setMarkers] = useState([]);

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
    !token && navigate("/login");
  }, []);
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "1000px", height: "600px" }} className="googleMap">
        {apiReady && googlemaps && (
          <div className="searchBar">
            <input style={{ display: "none" }}></input>
            <SearchBox map={map} mapApi={googlemaps} addPlace={addPlace} />
          </div>
        )}
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
          {markers[0] &&
            markers.map((marker) => {
              console.log(marker.id);
              return <Marker key={marker.id} lat={marker.location.latitude} lng={marker.location.longitude} place={marker} target={marker.id === target}></Marker>;
            })}
        </GoogleMap>
      </div>
    </div>
  );
}
export default MapSearch;
