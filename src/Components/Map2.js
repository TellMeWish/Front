import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import Searchbar from "../Components/Searchbar";
import { key } from "../Key";
import React, { useEffect, useState } from "react";
function Map(props) {
  const [position, setPosition] = useState({});
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
  useEffect(() => {
    if (places[0]) setPosition({ lng: places[0].geometry.location.lng(), lat: places[0].geometry.location.lat() });
  }, [places]);
  return (
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
              console.log(place);
              return <Marker place={place} key={place.place_id} text={place.name} lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} />;
            })}
        </GoogleMap>
      </div>
    </div>
  );
}
export default Map;
