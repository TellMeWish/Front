import InfoWindow from "./InfoWindow";
function Marker(props) {
  return (
    <div>
      <div style={{ position: "absolute", bottom: "0px", left: "-20px" }}>
        <img src="/img/marker.png" alt="marker" width="30px" />
      </div>
      {props.target && <InfoWindow post={props.place} />}
    </div>
  );
}
export default Marker;
