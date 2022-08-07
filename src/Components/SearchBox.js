import React from "react";
class SearchBox extends React.Component {
  render() {
    return <input id="pac-input" className="controls" type="text" placeholder="Search Box" ref={(ref) => (this.input = ref)} />;
  }
  onPlacesChanged = ({ map, mapApi, addPlace } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;

    if (!place.geometry) return;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.locatio);
      map.setZoom(15);
    }
    console.log(selected);
    addPlace(selected);
  };
  onZoomChanged = ({ map, mapApi, addPlace } = this.props) => {
    console.log("hi");
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
