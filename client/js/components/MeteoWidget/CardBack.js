import React from "react";

const google = window.google;

const baseOptions = {
  zoom: 9,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  overviewMapControl: false
};

const styles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: "32"
      },
      {
        lightness: "-3"
      },
      {
        visibility: "on"
      },
      {
        weight: "1.18"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        saturation: "-70"
      },
      {
        lightness: "14"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: "100"
      },
      {
        lightness: "-14"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
      {
        lightness: "12"
      }
    ]
  }
];
export default class CardBack extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.map = null;
    this.markers = [];
  }

  componentDidMount() {
    this.map = this.initMap();
  }

  geocodeCoordinate = (position, map) => {
    this.removeAllMarker();

    map.setCenter(position);

    var marker = new google.maps.Marker({
      map: map,
      position: position
    });

    this.markers.push(marker);
  };

  removeAllMarker = () => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  };

  initMap = (lat = 43.111403, lng = 9.8198202) => {
    //centro italia di default
    let center = new google.maps.LatLng(lat, lng);

    const mapOptions = {
      ...baseOptions,
      center,
      styles: styles
    };
    let map = new google.maps.Map(this.canvas, mapOptions);

    return map;
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.coords) {
      let { latitude: lat, longitude: lng } = nextProps.coords;
      this.geocodeCoordinate({ lat, lng }, this.map);
    }
  }

  render() {
    return (
      <div className="card-side side-back">
        <div
          ref={ref => (this.canvas = ref)}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute"
          }}
        />
      </div>
    );
  }
}
