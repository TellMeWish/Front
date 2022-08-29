import React from "react";
class SearchBox extends React.Component {
  render() {
    return <input style={{ width: "600px", marginBottom: "20px" }} id="pac-input" className="controls" type="text" placeholder="장소 검색" ref={(ref) => (this.input = ref)} />;
  }
  onPlacesChanged = ({ map, mapApi, addPlace } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;

    if (!place.geometry) return;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setZoom(14);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(14);
    }
    addPlace(selected);
  };

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.input);

    this.searchBox.addListener("places_changed", this.onPlacesChanged);

    this.searchBox.bindTo("bounds", map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.input);
  }
}

export default SearchBox;
