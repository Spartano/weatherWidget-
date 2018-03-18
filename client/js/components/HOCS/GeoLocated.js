import React, { Component } from 'react';

function getDisplayName(WrappedComponent) {
  return `Geolocated(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
}

export const geolocated = ({
  geolocationProvider = typeof navigator !== 'undefined' && navigator.geolocation
} = {}) => WrappedComponent => {
  let result = class Geolocated extends Component {
    onPositionSuccess = position => {
      this.setState({
        coords: position.coords
      });
    };

    getLocation() {
      if (!geolocationProvider) {
        throw new Error('The provided geolocation provider is invalid');
      }

      geolocationProvider.getCurrentPosition(this.onPositionSuccess);
    }

    componentDidMount() {
      this.getLocation();
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
  result.displayName = getDisplayName(WrappedComponent);
  return result;
};
