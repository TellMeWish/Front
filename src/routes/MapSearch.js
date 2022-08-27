import Map from "../Components/Map";
import SearchBox from "../Components/SearchBox2";
import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import Searchbar from "../Components/Searchbar";
import React, { useEffect, useState } from "react";
import { key } from "../Key";

function MapSearch() {
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 35.18952, lng: 129.0715 });

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
    setTarget(key);
  };
  const mouseOut = (key) => {
    setTarget(0);
  };

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
        ></GoogleMap>
      </div>
    </div>
  );
}
export default MapSearch;