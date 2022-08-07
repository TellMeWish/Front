import GoogleMap from "google-map-react";
import Marker from "../Components/Marker";
import Searchbar from "../Components/Searchbar";
import { key } from "../Key";
import React, { useEffect, useState } from "react";
function Map() {
  const [position, setPosition] = useState({});
  const [places, setPlaces] = useState([]);
  const [target, setTarget] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 });
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
        >
          {places.length !== 0 &&
            places.map((place) => {
              return <Marker key={place.id} text={place.name} lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} />;
            })}
        </GoogleMap>
      </div>
    </div>
  );
}
export default Map;
