import { propTypes } from "react-bootstrap/esm/Image";
import SearchBox from "./SearchBox";
function Searchbar(props) {
  return (
    <div className="searchBar">
      <SearchBox map={props.map} mapApi={props.mapApi} addPlace={props.addPlace} />
    </div>
  );
}
export default Searchbar;
