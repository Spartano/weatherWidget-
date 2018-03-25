import React from "react";
import CardFront from "../../components/MeteoWidget/CardFront";
import CardBack from "../../components/MeteoWidget/CardBack";
import { geolocated } from "../../components/HOCS/GeoLocated";

import "./index.css";

class MeteoWidget extends React.Component {
  render() {
    return (
      <div className="card-container">
        <div className="card-body">
          <CardBack {...this.props} />

          <CardFront {...this.props} />
        </div>
      </div>
    );
  }
}

export default geolocated()(MeteoWidget);
