import InfoWindow from "./InfoWindow";
function Marker(props) {
  return (
    <div style={{ position: "relative", right: "30px", bottom: "30px" }}>
      {props.target && <InfoWindow place={props.place} />}
      <img src="/img/marker.png" alt="marker" width="30px" />
    </div>
  );
}
export default Marker;
